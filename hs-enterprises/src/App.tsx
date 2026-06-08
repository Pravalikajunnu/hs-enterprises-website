import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Admin } from "@/pages/Admin";

function Home() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <WhyChooseUs />
          <About />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </TooltipProvider>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route component={Home} />
    </Switch>
  );
}

export default App;
