import React from "react";
import { ArrowUp, MapPin, Clock, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-blue-100 py-12 border-t border-white/10" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand + Logo */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <a href="#home" className="flex items-center gap-2 mb-4 group" data-testid="link-footer-logo">
              <div className="flex items-center justify-center w-10 h-10 bg-primary border-2 border-accent rounded-sm">
                <span className="font-serif font-bold text-accent text-xl leading-none">HS</span>
              </div>
              <span className="font-serif font-semibold text-xl text-white tracking-wide">Enterprises</span>
            </a>
            <p className="text-blue-200/80 text-sm leading-relaxed max-w-xs">
              Loans Made Simple. Your trusted financial partner for fast approvals and the best rates across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'Services', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-blue-200/80 hover:text-accent transition-colors"
                    data-testid={`link-footer-${link.toLowerCase()}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-5">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:9010114804" className="text-blue-200/80 hover:text-accent transition-colors">+91 90101 14804</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:6301595104" className="text-blue-200/80 hover:text-accent transition-colors">+91 63015 95104</a>
              </li>
              <li>
                <a href="mailto:shivajakkula59@gmail.com" className="text-blue-200/80 hover:text-accent transition-colors break-all">
                  shivajakkula59@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/916301595104"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  Chat on WhatsApp →
                </a>
              </li>
            </ul>
          </div>

          {/* Address + Hours */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-5">Visit Us</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-blue-200/80 leading-relaxed">
                  #11-1-624/6/1, Chilkaguda,<br />
                  Seethaphalmandi, Circle 29,<br />
                  Hyderabad – 500061
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-blue-200/80 leading-relaxed">
                  Mon – Sat<br />
                  <span className="text-accent font-semibold">9:00 AM – 6:00 PM</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-xs text-blue-200/50 mb-4 md:mb-0">
            &copy; 2025 HS Enterprises. All rights reserved.
          </p>
          <a
            href="#home"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Back to top"
            data-testid="button-back-to-top"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
