import { site, whatsappUrl } from "@/site.config";

// Barra fixa só no celular: fio fino em cima e fundo claro, sem balão flutuando
// por cima do texto. O body reserva o espaço dela com pb-20 no layout.
export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-nevoa bg-branco/95 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-4 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p className="text-sm leading-tight">
          <span className="block font-semibold">{site.name}</span>
          <span className="text-aco">
            {site.contact.hours || `${site.contact.city}, ${site.contact.state}`}
          </span>
        </p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-marinho px-5 py-3 text-sm font-medium text-white"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
