// Padrão de azulejo da Supera, a assinatura visual do site. Desenho original da
// IDEVA inspirado no modernismo de Brasília: não reproduz nenhum painel existente.
// Módulo de 96 unidades em 2x2: quarto de círculo, triângulo, faixa e quarto de
// círculo girado. A cor vem de `currentColor`, então o pai decide pela classe.

export function Azulejo({
  id,
  size = 96,
  className,
}: {
  id: string; // único por página, o <pattern> é referenciado pelo id
  size?: number;
  className?: string;
}) {
  return (
    <svg aria-hidden="true" className={className} width="100%" height="100%">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g transform={`scale(${size / 96})`} fill="currentColor">
            <path d="M0 0H48A48 48 0 0 1 0 48Z" />
            <path d="M96 0V48H48Z" />
            <path d="M0 66H48V78H0Z" />
            <path d="M96 96H48A48 48 0 0 1 96 48Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
