import Image from "next/image";
import type { Visual } from "@/site.config";
import { cn } from "@/lib/utils";

// Imagem com legenda. A legenda é o que humaniza: ela diz de quem ou de onde é a
// imagem e amarra ela no que a seção fala ao lado, em vez de deixar a foto solta
// como enfeite. Enquanto a foto real do cliente não chega, o `visual` resolvido é
// a imagem de arquitetura com a legenda dela, que não finge ser a sala nem a equipe.
export function Foto({
  visual,
  sizes,
  priority,
  className,
}: {
  visual: Visual;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("relative overflow-hidden", className)}>
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      {visual.caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-marinho/90 via-marinho/50 to-transparent px-5 pb-4 pt-12 text-xs font-semibold uppercase tracking-wider text-prata">
          {visual.caption}
        </figcaption>
      )}
    </figure>
  );
}
