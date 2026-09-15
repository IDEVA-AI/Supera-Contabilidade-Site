"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/site.config";

// Medição dos anúncios. Os IDs vêm de `site.tracking` no config (a variável de
// ambiente só serve de reserva). Nada carrega enquanto estiver vazio. Todo clique em
// link de WhatsApp vira evento: é a conversão que interessa, o contato acontece lá.
const GA_ID = site.tracking.ga4 || process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = site.tracking.googleAds || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LABEL = site.tracking.googleAdsWhatsappLabel || process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL;
const PIXEL_ID = site.tracking.metaPixel || process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Origem do visitante, guardada na primeira página da visita. Vai no fim da mensagem
// do WhatsApp ("via Google") pro Danilo saber de onde veio o contato, já que a venda
// fecha na conversa e o anúncio não enxerga isso sozinho.
const ORIGIN_KEY = "supera-origem";

function detectOrigin(params: URLSearchParams): string | null {
  const source = (params.get("utm_source") ?? "").toLowerCase();
  if (params.get("gclid") || params.get("gbraid") || params.get("wbraid") || source === "google") return "Google";
  if (params.get("fbclid") || ["meta", "facebook", "fb", "instagram", "ig"].includes(source)) return "Instagram";
  return null;
}

type Tracker = (...args: unknown[]) => void;

export function Analytics() {
  useEffect(() => {
    const found = detectOrigin(new URLSearchParams(window.location.search));
    if (found) sessionStorage.setItem(ORIGIN_KEY, found);

    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>('a[href*="wa.me/"]');
      if (!link) return;

      const origin = sessionStorage.getItem(ORIGIN_KEY);
      if (origin) {
        const url = new URL(link.href);
        const text = url.searchParams.get("text") ?? "";
        const tag = `(via ${origin})`;
        if (!text.endsWith(tag)) {
          url.searchParams.set("text", `${text} ${tag}`.trim());
          link.href = url.toString();
        }
      }

      const page = window.location.pathname;
      const w = window as unknown as { gtag?: Tracker; fbq?: Tracker };
      w.gtag?.("event", "whatsapp_click", { page });
      if (ADS_ID && ADS_LABEL) w.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_LABEL}` });
      w.fbq?.("track", "Contact", { page });
    }
    // Captura: roda antes do navegador seguir o link, então a mensagem já sai com a origem.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
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
