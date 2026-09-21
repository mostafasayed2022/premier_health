import Script from "next/script";

const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

/**
 * Injects the Snap Pixel base code into <head>.
 * Fires PAGE_VIEW automatically on load.
 * Mount once in [locale]/layout.tsx inside <head>.
 */
export function SnapPixelScript() {
  if (process.env.NEXT_PUBLIC_TRACKING_ENABLED !== "true" || process.env.NEXT_PUBLIC_PIXEL_MODE !== "direct" || !SNAP_PIXEL_ID || !/^[a-zA-Z0-9-]+$/.test(SNAP_PIXEL_ID)) return null;

  return (
    <Script
      id="snap-pixel-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
{a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
a.queue=[];var s='script',r=t.createElement(s);r.async=!0;
r.src=n;var u=t.getElementsByTagName(s)[0];
u.parentNode.insertBefore(r,u);})(window,document,
'https://sc-static.net/scevent.min.js');

snaptr('init', '${SNAP_PIXEL_ID}', {});

`,
      }}
    />
  );
}
