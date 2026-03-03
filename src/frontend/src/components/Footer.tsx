import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl tracking-[0.2em] font-light uppercase mb-4 text-gold-light">
              MAISON ELARA
            </h3>
            <p className="text-background/60 text-sm leading-relaxed max-w-xs mb-6">
              Award-winning interior design studio creating timeless, luxurious
              spaces that tell your unique story.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4 text-background/60">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/services", label: "Services" },
                { to: "/products", label: "Products" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-background/60 hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4 text-background/60">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm text-background/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                <span>
                  42 Rue du Faubourg
                  <br />
                  Paris, 75008, France
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/60">
                <Phone className="w-4 h-4 shrink-0 text-gold" />
                <span>+33 1 42 68 00 00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/60">
                <Mail className="w-4 h-4 shrink-0 text-gold" />
                <span>hello@maisonelara.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-background/40 text-xs">
            © {year}. Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-background/30 text-xs tracking-wide">
            MAISON ELARA — Interior Design Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
