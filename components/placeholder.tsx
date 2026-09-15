// Dado que ainda não temos do cliente. Sai tracejado pra ninguém confundir com
// texto final. Some sozinho quando o valor é preenchido no conteúdo da página.
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-dashed border-aco bg-nevoa px-1.5 py-0.5 text-sm font-medium text-ardosia [box-decoration-break:clone]">
      A confirmar: {children}
    </span>
  );
}
