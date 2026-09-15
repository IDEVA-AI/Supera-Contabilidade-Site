"use client";

import Script from "next/script";
import { useEffect } from "react";

// Medição dos anúncios. Nada carrega enquanto os IDs não estiverem nas variáveis
// de ambiente da Vercel (ver .env.example). Todo clique em link de WhatsApp do site
// vira evento: é a conversão que interessa, já que o contato acontece lá.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Tracker = (...args: unknown[]) => void;

export function Analytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      if (!target?.closest('a[href*="wa.me/"]')) return;
      const page = window.location.pathname;
      const w = window as unknown as { gtag?: Tracker; fbq?: Tracker };
      w.gtag?.("event", "whatsapp_click", { page });
      if (ADS_ID && ADS_LABEL) w.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_LABEL}` });
      w.fbq?.("track", "Contact", { page });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const gtagId = GA_ID || ADS_ID;
  const gtagConfig = [GA_ID, ADS_ID]
    .filter(Boolean)
    .map((id) => `gtag('config','${id}');`)
    .join("");

  return (
    <>
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${gtagConfig}`}
          </Script>
        </>
      )}
      {PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
