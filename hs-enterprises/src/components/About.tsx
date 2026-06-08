import React from "react";
import { motion } from "framer-motion";

const leaders = [
  { name: "Shiva Jakkula", title: "Co-Founder & CEO", initials: "SJ" },
  { name: "Harish Jakkula", title: "Co-Founder & CEO", initials: "HJ" },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white" data-testid="section-about">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">
            Meet Our Leadership
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full mb-6"></div>
        </div>

        {/* Leadership cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto mb-20">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center text-center group"
              data-testid={`card-leader-${index}`}
            >
              {/* Avatar circle with initials */}
              <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center mb-5 shadow-lg border-4 border-white group-hover:border-accent transition-colors duration-300 ring-2 ring-primary/20">
                <span className="text-white text-3xl font-serif font-bold">{leader.initials}</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-1 font-serif">{leader.name}</h3>
              <p className="text-accent font-semibold text-sm uppercase tracking-widest">{leader.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Image + quote split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
              alt="Professional team meeting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-accent text-xs font-bold tracking-widest uppercase">HS Enterprises</span>
              <p className="text-white font-semibold text-lg font-serif leading-snug mt-1">
                Trusted across India since day one
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-[#F5F7FA] p-8 md:p-10 rounded-2xl border border-border shadow-sm"
          >
            <div className="text-accent text-5xl font-serif leading-none mb-4 select-none">"</div>
            <p className="text-xl md:text-2xl text-primary font-serif leading-relaxed italic">
              HS Enterprises is a trusted financial services firm helping
              individuals and businesses across India secure the best loan deals —
              quickly and transparently.
            </p>
            <div className="mt-6 h-1 w-16 bg-accent rounded-full"></div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
