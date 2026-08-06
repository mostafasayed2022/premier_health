"use client";

import React from "react";

function WhatsappIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.333 5.002L2 22l5.176-1.334a9.98 9.98 0 004.834 1.251h.004c5.505 0 9.988-4.478 9.989-9.985.001-2.666-1.033-5.174-2.915-7.057A9.914 9.914 0 0012.012 2zm5.82 14.28c-.247.694-1.226 1.293-1.985 1.345-.518.035-1.196.177-3.906-.948-3.468-1.439-5.702-4.965-5.874-5.195-.172-.23-1.405-1.874-1.405-3.57 0-1.696.883-2.53 1.198-2.875.315-.345.69-.431.918-.431.23 0 .46.002.66.012.213.01.496-.081.776.592.287.69.976 2.385 1.062 2.557.086.172.144.373.029.604-.115.23-.172.373-.344.575-.172.201-.363.449-.517.603-.172.172-.352.36-.151.705.201.345.897 1.48 1.923 2.395 1.32 1.176 2.433 1.54 2.778 1.712.345.172.546.144.747-.086.201-.23.862-1.005 1.091-1.35.23-.345.46-.287.776-.172.316.115 2.01.948 2.355 1.12.345.172.574.259.66.402.086.144.086.833-.161 1.527z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ThreadsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.186 24.007c-3.328 0-6.104-1.127-8.252-3.35C1.802 18.448.74 15.485.78 11.857.822 8.016 2.012 4.957 4.316 2.766 6.574.62 9.612-.27 13.376-.08c3.55.18 6.442 1.38 8.59 3.56 2.083 2.11 3.197 5.01 3.31 8.62.115 3.73-.89 6.84-2.99 9.24-2.07 2.37-4.99 3.66-8.67 3.66zm-.05-2.22c2.97 0 5.3-1.02 6.93-3.02 1.6-1.96 2.38-4.52 2.3-7.62-.08-2.98-.98-5.35-2.67-7.06-1.74-1.76-4.09-2.74-7.01-2.9-3.06-.15-5.52.57-7.32 2.14-1.84 1.6-2.8 3.99-2.85 7.1-.03 2.97.8 5.38 2.47 7.17 1.7 1.83 3.96 2.76 6.7 2.76z" />
    </svg>
  );
}

function TiktokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.29-2.61.74-5.26 2.69-7.01 1.68-1.52 3.98-2.26 6.24-1.95v4.27c-1.15-.22-2.37.03-3.33.68-.96.65-1.55 1.74-1.58 2.9-.06 1.34.61 2.65 1.75 3.32 1.13.67 2.58.64 3.67-.08.82-.54 1.33-1.44 1.4-2.42.06-2.15.02-4.31.03-6.46V.02z" />
    </svg>
  );
}

function SnapchatIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.028 1.525c-4.14 0-6.907 2.92-6.907 6.467 0 1.05.28 2.06.77 2.93.07.13.06.29-.02.4-.33.45-1.18 1.14-2.24 1.25-.39.04-.63.43-.48.79.46 1.12 1.63 1.83 2.76 1.83.27 0 .54-.04.81-.13.19-.06.39.02.48.2.53 1.04 1.94 1.77 4.83 1.77 2.89 0 4.3-1.04 4.83-1.77.09-.18.29-.26.48-.2.27.09.54.13.81.13 1.13 0 2.3-.71 2.76-1.83.15-.36-.09-.75-.48-.79-1.06-.11-1.91-.8-2.24-1.25-.08-.11-.09-.27-.02-.4.49-.87.77-1.88.77-2.93 0-3.547-2.767-6.467-6.907-6.467z" />
    </svg>
  );
}

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.987 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}

export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
      <p suppressHydrationWarning>© {currentYear} Premier Health Clinic. All rights reserved.</p>
      <div className="flex gap-3 flex-wrap">
        <a
          href="https://wa.me/201200644663"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/10 text-white hover:text-accent"
          title="WhatsApp"
          aria-label="WhatsApp"
        >
          <WhatsappIcon className="w-4 h-4 fill-current" />
        </a>
        <a
          href="https://www.instagram.com/premierhealth.clinics"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/10 text-white hover:text-accent"
          title="Instagram"
          aria-label="Instagram"
        >
          <InstagramIcon className="w-4 h-4 fill-current" />
        </a>
        <a
          href="https://www.facebook.com/premierecareclinics"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/10 text-white hover:text-accent"
          title="Facebook"
          aria-label="Facebook"
        >
          <FacebookIcon className="w-4 h-4 fill-current" />
        </a>
        <a
          href="https://www.threads.net/@premierhealth.clinics"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/10 text-white hover:text-accent"
          title="Threads"
          aria-label="Threads"
        >
          <ThreadsIcon className="w-4 h-4 fill-current" />
        </a>
        <a
          href="https://www.tiktok.com/@premierhealthclinics"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/10 text-white hover:text-accent"
          title="TikTok"
          aria-label="TikTok"
        >
          <TiktokIcon className="w-4 h-4 fill-current" />
        </a>
        <a
          href="https://www.snapchat.com/@premier.health?share_id=inVm7XArR_w&locale=en-GB"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/10 text-white hover:text-accent"
          title="Snapchat"
          aria-label="Snapchat"
        >
          <SnapchatIcon className="w-4 h-4 fill-current" />
        </a>
        <a
          href="https://www.google.com/search?client=safari&hl=en-eg&sxsrf=ALiCzsYe7w__J5YT0kbjpTX0pf9lCL6qpw:1656257145699&q=Premier+Care&ludocid=16492088125003417627&gsas=1&client=safari&lsig=AB86z5VbyTY4DN7nfpzAGrbJfjP1&kgs=09e54351cf095e2e&shndl=-1&source=sh/x/kp/local/3&entrypoint=sh/x/kp/local"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/10 text-white hover:text-accent"
          title="Google Listing"
          aria-label="Google Listing"
        >
          <GoogleIcon className="w-4 h-4 fill-current" />
        </a>
        <a
          href="https://linktr.ee/premierhealthclinic"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center border border-white/10 text-white hover:text-accent font-bold text-xs"
          title="Linktree Portal"
          aria-label="Linktree Portal"
        >
          LT
        </a>
      </div>
    </div>
  );
}
