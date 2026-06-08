import React from "react";
import {
  Car,
  RefreshCw,
  Tag,
  CreditCard,
  ArrowRightLeft,
  Repeat,
  CheckCircle,
  User,
  Home,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Car,
    title: "New Car Loan",
    description: "Finance your dream car with competitive rates",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: RefreshCw,
    title: "Used Car Loan",
    description: "Smart financing for pre-owned vehicles",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Tag,
    title: "Sale & Purchase",
    description: "Complete assistance in vehicle transactions",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: CreditCard,
    title: "Refinance",
    description: "Lower your EMI with our refinancing options",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: ArrowRightLeft,
    title: "BT – Balance Transfer",
    description: "Transfer your loan for better terms",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Repeat,
    title: "INT Balance Transfer",
    description: "Reduce interest with internal balance transfer",
    image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: CheckCircle,
    title: "Pre-Approval",
    description: "Get pre-approved before you choose your car",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: User,
    title: "Personal Loans",
    description: "Quick personal loans for any need",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Home,
    title: "Home Loans",
    description: "Turn your dream home into reality",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: Building2,
    title: "Commercial Loans",
    description: "Fuel your business growth with easy credit",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-white"
      data-testid="section-services"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">
            Our Services
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Comprehensive financial solutions tailored to your unique needs. We
            offer a wide range of loan products with transparent terms.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group rounded-xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-accent transition-all duration-300 flex flex-col"
              data-testid={`card-service-${index}`}
            >
              {/* Image thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Navy tint overlay on hover */}
                <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/10 transition-colors duration-300" />
                {/* Icon badge */}
                <div className="absolute bottom-3 left-4 w-10 h-10 rounded-lg bg-white/95 shadow flex items-center justify-center text-primary">
                  <service.icon className="w-5 h-5" />
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-primary mb-1 font-serif">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
