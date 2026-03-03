import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavbarScroll } from "../hooks/useScrollAnimation";

const navLinks = [
  { to: "/", label: "Home", ocid: "nav.home_link" },
  { to: "/portfolio", label: "Portfolio", ocid: "nav.portfolio_link" },
  { to: "/services", label: "Services", ocid: "nav.services_link" },
  { to: "/products", label: "Products", ocid: "nav.products_link" },
  { to: "/about", label: "About", ocid: "nav.about_link" },
  { to: "/contact", label: "Contact", ocid: "nav.contact_link" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const scrolled = useNavbarScroll();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-background/95 backdrop-blur-lg shadow-soft border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl tracking-[0.25em] font-light uppercase text-foreground hover:text-gold transition-colors duration-300"
          data-ocid="nav.home_link"
        >
          MAISON ELARA
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={link.ocid}
              className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300 relative group ${
                isActive(link.to)
                  ? "text-gold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Right: theme toggle + mobile button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            data-ocid="nav.theme_toggle"
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground/70 hover:text-gold hover:bg-gold/10 transition-all duration-300"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            data-ocid="nav.mobile_menu_toggle"
            aria-label="Toggle mobile menu"
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-foreground/70 hover:text-gold hover:bg-gold/10 transition-all duration-300"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-background/98 backdrop-blur-lg ${
          mobileOpen ? "max-h-96 border-b border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col py-4 px-6 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={link.ocid}
              onClick={() => setMobileOpen(false)}
              className={`py-3 text-xs tracking-[0.15em] uppercase font-medium border-b border-border/40 transition-colors duration-200 ${
                isActive(link.to)
                  ? "text-gold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
