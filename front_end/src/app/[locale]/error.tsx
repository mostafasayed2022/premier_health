"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-[#f7f2ea] text-[#385366] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-white border border-[#998675]/20 p-8 md:p-12 rounded-3xl shadow-md text-center flex flex-col items-center gap-6"
      >
        {/* Luxury Brand Label */}
        <span className="text-[10px] tracking-[0.3em] text-[#998675] uppercase font-bold">
          Premier Care | Clinic Support
        </span>

        {/* Error Title */}
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-3xl md:text-4xl text-[#385366]">
            Something went wrong
          </h1>
          <h2 className="font-serif text-xl text-[#998675]">
            عذراً، حدث خطأ غير متوقع
          </h2>
        </div>

        {/* Error Description */}
        <div className="text-sm text-gray-600 max-w-md leading-relaxed flex flex-col gap-2">
          <p>
            An unexpected error occurred during your luxury wellness experience.
            We apologize for the inconvenience and are working to resolve the issue.
          </p>
          <p className="border-t border-gray-150 pt-2 font-sans">
            لقد حدث خطأ غير متوقع أثناء تصفحك لخدماتنا الفاخرة. نحن نعتذر عن هذا الخلل ونعمل على حله في أسرع وقت.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
          <button
            onClick={() => reset()}
            className="rounded-full bg-[#385366] text-white hover:bg-[#385366]/90 px-8 py-3 font-semibold transition-all duration-300 shadow-md hover:scale-102 cursor-pointer"
          >
            Try Again / أعد المحاولة
          </button>
          
          <Link
            href="/"
            className="rounded-full border-2 border-[#998675]/40 text-[#385366] hover:bg-[#998675]/10 px-8 py-3 font-semibold transition-all duration-300 text-center"
          >
            Go Home / الرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
