import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white text-primary shadow-md"
          : "bg-white/90 backdrop-blur-sm text-primary shadow-sm"
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3 group" data-testid="link-logo">
            <div className="flex items-center justify-center w-10 h-10 bg-primary border-2 border-accent rounded-sm shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-accent text-xl leading-none">HS</span>
            </div>
            <span className="font-serif font-semibold text-xl tracking-wide text-primary">Enterprises</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-primary/80 hover:text-accent transition-colors"
                  data-testid={`link-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-white border-0 font-medium px-6"
              data-testid="button-nav-cta"
            >
              <a href="#contact">Get a Quote</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-primary hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-xl absolute top-20 left-0 w-full">
          <div className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium py-2 border-b border-border text-primary hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-white w-full mt-2"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="button-mobile-nav-cta"
            >
              <a href="#contact">Get a Quote</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
