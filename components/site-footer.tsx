import { site } from "@/site.config";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-2">
          <p className="text-base font-semibold">{site.name}</p>
          <p className="text-sm text-muted">{site.tagline}</p>
        </div>

        <div className="space-y-2 text-sm text-muted">
          {site.contact.email && (
            <p>
              <a
                className="hover:text-foreground"
                href={`mailto:${site.contact.email}`}
              >
                {site.contact.email}
              </a>
            </p>
          )}
          {site.contact.phoneLabel && (
            <p>
              <a
                className="hover:text-foreground"
                href={`tel:${site.contact.phone}`}
              >
                {site.contact.phoneLabel}
              </a>
            </p>
          )}
          {site.contact.city && (
            <p>
              {site.contact.city}
              {site.contact.state ? ` — ${site.contact.state}` : ""}
            </p>
          )}
          {site.contact.hours && <p>{site.contact.hours}</p>}
        </div>
      </Container>

      <Container className="border-t border-border py-6">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. Todos os direitos
          reservados.
        </p>
      </Container>
    </footer>
  );
}
