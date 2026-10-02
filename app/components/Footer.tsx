import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-cream py-12 px-6 border-t border-divider">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <nav className="flex flex-wrap gap-6 text-sm font-medium text-ink">
          <Link href="/#services" className="hover:text-gold transition-colors">
            Services
          </Link>
          <Link href="/#about" className="hover:text-gold transition-colors">
            About
          </Link>
          <Link href="/vichar" className="hover:text-gold transition-colors">
            Vichar
          </Link>
          <Link href="/#contact" className="hover:text-gold transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex gap-6 text-sm">
          <a
            href="#whatsapp"
            className="text-ink hover:text-gold transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="mailto:contact@example.com"
            className="text-ink hover:text-gold transition-colors"
          >
            Email
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-divider pt-8 text-center md:text-left">
        <p className="text-xs text-muted">
          Astrology offers guidance. It is not a substitute for medical, legal
          or financial advice.
        </p>
      </div>
    </footer>
  );
}
