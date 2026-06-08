import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { PhoneCall, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
      data-testid="section-hero"
    >
      {/* Real photo background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury car on open road"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Light gradient overlay — lets the photo breathe */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/75 via-primary/55 to-primary/30" />

      {/* Subtle diamond pattern */}
      <div className="absolute inset-0 z-10 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-serif drop-shadow-md">
              Your Trusted Loan Partner
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow"
          >
            Fast approvals, best rates, and complete financial solutions — from
            car loans to home loans, we make financing simple and stress-free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto text-lg h-14 px-8 rounded-md group shadow-lg"
              data-testid="button-hero-quote"
            >
              <a href="#contact">
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white bg-white/10 hover:bg-white/20 w-full sm:w-auto text-lg h-14 px-8 rounded-md group shadow-lg"
              data-testid="button-hero-call"
            >
              <a href="tel:6301595104">
                <PhoneCall className="mr-2 h-5 w-5" />
                Call Us Now
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
