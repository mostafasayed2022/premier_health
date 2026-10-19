"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import type { CyberSourceCheckoutSession } from "@/lib/api/endpoints";

interface CheckoutInstance {
  mount(target?: string): Promise<string>;
  destroy(): void;
}

interface CyberSourceClient {
  createCheckout(options?: { autoProcessing?: boolean }): Promise<CheckoutInstance>;
  destroy(): void;
}

declare global {
  interface Window {
    VAS?: {
      UnifiedCheckout(sessionJWT: string): Promise<CyberSourceClient>;
    };
  }
}

export type CyberSourcePaymentState = "paid" | "failed" | "pending";

interface Props {
  session: CyberSourceCheckoutSession;
  onComplete: (resultJwt: string) => Promise<CyberSourcePaymentState>;
}

export function CyberSourceCheckout({ session, onComplete }: Props) {
  const [scriptReady, setScriptReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<string | null>(null);
  const [paymentState, setPaymentState] = useState<CyberSourcePaymentState | null>(null);
  const [error, setError] = useState("");

  const verifyResult = useCallback(async (resultJwt: string) => {
    setVerifying(true);
    setError("");
    try {
      const state = await onComplete(resultJwt);
      setPaymentState(state);
      if (state === "pending") {
        setError(
          "The result is still pending. Do not submit another payment; retry verification or contact the clinic.",
        );
      }
    } catch (cause) {
      console.error("CyberSource verification failed:", cause);
      setError(
        "We couldn't verify the payment result. Retry verification before attempting another payment.",
      );
    } finally {
      setVerifying(false);
    }
  }, [onComplete]);

  useEffect(() => {
    if (!scriptReady || !window.VAS) return;

    let disposed = false;
    let client: CyberSourceClient | undefined;
    let checkout: CheckoutInstance | undefined;

    async function mountCheckout() {
      try {
        setLoading(true);
        setError("");
        client = await window.VAS!.UnifiedCheckout(session.capture_context);
        if (disposed) {
          client.destroy();
          return;
        }

        checkout = await client.createCheckout({ autoProcessing: true });
        if (disposed) {
          checkout.destroy();
          client.destroy();
          return;
        }

        const resultJwt = await checkout.mount("#cybersource-checkout");
        if (disposed) return;

        if (typeof resultJwt !== "string" || resultJwt.split(".").length !== 3) {
          throw new Error("CyberSource did not return a completed result JWT.");
        }

        setCheckoutResult(resultJwt);
        await verifyResult(resultJwt);
      } catch (cause) {
        if (!disposed) {
          console.error("CyberSource checkout failed:", cause);
          setError(
            "Checkout could not be completed. Check the payment status before trying again.",
          );
        }
      } finally {
        if (!disposed) setLoading(false);
      }
    }

    void mountCheckout();

    return () => {
      disposed = true;
      checkout?.destroy();
      client?.destroy();
    };
  }, [scriptReady, session.capture_context, verifyResult]);

  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-accent/20 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="mb-2 text-xl font-bold text-primary">
        Secure card payment
      </h2>
      <p className="mb-6 text-sm text-foreground/70">
        Your card details are processed through CyberSource Unified Checkout.
      </p>

      <Script
        src={session.client_library}
        integrity={session.client_library_integrity}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => setError("Could not load the CyberSource checkout library.")}
      />

      <div id="cybersource-checkout" />

      {(loading || verifying) && (
        <p className="mt-4 text-sm text-foreground/70" role="status">
          {verifying ? "Verifying payment…" : "Initializing secure checkout…"}
        </p>
      )}

      {paymentState === "paid" && (
        <p className="mt-4 text-sm text-green-700" role="status">
          Payment verified.
        </p>
      )}

      {error && (
        <div className="mt-4 space-y-3" role="alert">
          <p className="text-sm text-red-700">{error}</p>
          {checkoutResult && !verifying && paymentState !== "paid" && (
            <button
              type="button"
              onClick={() => void verifyResult(checkoutResult)}
              className="rounded-xl border border-accent/30 px-4 py-2 text-sm font-bold text-primary hover:bg-accent/10 disabled:opacity-50"
              disabled={verifying}
            >
              Retry verification
            </button>
          )}
        </div>
      )}
    </section>
  );
}
