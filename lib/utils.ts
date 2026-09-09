// Junta classes ignorando falsy. Suficiente enquanto não entrar shadcn/ui.
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
