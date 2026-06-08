import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useCreateLead } from "@workspace/api-client-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^[0-9]{10}$/, { message: "Must be a valid 10-digit phone number." }),
  loanType: z.string().min(1, { message: "Please select a service." }),
  message: z.string().optional(),
});

const services = [
  "New Car Loan",
  "Used Car Loan",
  "Sale & Purchase",
  "Refinance",
  "BT – Balance Transfer",
  "INT Balance Transfer",
  "Pre-Approval",
  "Personal Loans",
  "Home Loans",
  "Commercial Loans",
];

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate: createLead, isPending } = useCreateLead();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", loanType: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createLead({
      data: {
        name: values.name,
        phone: values.phone,
        loanType: values.loanType,
        message: values.message ?? "",
      },
    });

    setIsSubmitted(true);
    form.reset();
    setTimeout(() => setIsSubmitted(false), 6000);

    const text = [
      `Hello HS Enterprises! I would like to enquire about a loan.`,
      ``,
      `*Name:* ${values.name}`,
      `*Phone:* ${values.phone}`,
      `*Service Required:* ${values.loanType}`,
      values.message ? `*Message:* ${values.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    setTimeout(() => window.open(`https://wa.me/916301595104?text=${encodeURIComponent(text)}`, "_blank"), 800);
  }

  return (
    <section id="contact" className="bg-[#F0F4F8] text-primary" data-testid="section-contact">
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">Get In Touch</h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Ready to take the next step? Contact us — our experts are here to find you the perfect loan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2 font-serif">Phone & WhatsApp</h3>
              <div className="flex flex-col gap-1 text-sm">
                <a href="tel:9010114804" className="text-muted-foreground hover:text-primary transition-colors">+91 90101 14804</a>
                <a href="tel:6301595104" className="text-muted-foreground hover:text-primary transition-colors">+91 63015 95104</a>
                <a href="https://wa.me/916301595104" target="_blank" rel="noreferrer" className="text-accent hover:text-accent/80 transition-colors font-medium mt-1">
                  WhatsApp us →
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2 font-serif">Email Us</h3>
              <a href="mailto:shivajakkula59@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm break-all">
                shivajakkula59@gmail.com
              </a>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2 font-serif">Our Office</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                #11-1-624/6/1, Chilkaguda,<br />
                Seethaphalmandi, Circle 29,<br />
                Hyderabad – 500061
              </p>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2 font-serif">Business Hours</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Monday – Saturday<br />
                <span className="text-accent font-semibold">9:00 AM – 6:00 PM</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
            <h3 className="text-2xl font-bold font-serif text-primary mb-6">Send us a message</h3>

            {isSubmitted && (
              <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>Message Sent!</AlertTitle>
                <AlertDescription>
                  Opening WhatsApp with your details — we'll get back to you within 24 hours.
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-secondary border-border focus-visible:ring-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" {...field} className="bg-secondary border-border focus-visible:ring-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loanType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Required</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary border-border focus-visible:ring-accent">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>{service}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your requirements..."
                          className="min-h-[100px] bg-secondary border-border focus-visible:ring-accent resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-accent hover:bg-accent/90 text-white text-lg h-12"
                  data-testid="button-submit-contact"
                >
                  {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Submit Request"}
                </Button>
                <p className="text-center text-muted-foreground text-sm">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
