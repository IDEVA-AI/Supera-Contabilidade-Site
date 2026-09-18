import Image from "next/image";
import { site } from "@/site.config";

// Logo horizontal oficial (entregue em 2026-09-18). Fundo transparente, feito pra fundo claro:
// no rodapé escuro o "Supera" marinho some, por isso lá continua o nome em texto.
export function Logo() {
  return (
    <Image
      src="/img/logo/supera-horizontal.png"
      alt={site.name}
      width={840}
      height={275}
      priority
      className="h-11 w-auto md:h-12"
    />
  );
}
