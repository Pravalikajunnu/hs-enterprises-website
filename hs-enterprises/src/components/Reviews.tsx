import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, PenLine, X, Loader2 } from "lucide-react";
import { useGetReviews, useCreateReview, getGetReviewsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  service: z.string().min(1, "Please select a service"),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, "Review must be at least 10 characters"),
});
type ReviewForm = z.infer<typeof reviewSchema>;

const sampleReviews = [
  {
    id: -1,
    name: "Venkata Ramana Reddy",
    location: "Kukatpally",
    service: "New Car Loan",
    rating: 5,
    text: "Got my car loan approved in just 2 days! The team at HS Enterprises handled everything smoothly. Best interest rate I found anywhere. Highly recommend!",
    createdAt: new Date().toISOString(),
  },
  {
    id: -2,
    name: "Syed Imran Ali",
    location: "Mehdipatnam",
    service: "Home Loan",
    rating: 5,
    text: "Shiva and Harish personally guided me through the entire home loan process. Minimal documentation and always available on WhatsApp. Excellent service!",
    createdAt: new Date().toISOString(),
  },
  {
    id: -3,
    name: "Lakshmi Prasanna",
    location: "Dilsukhnagar",
    service: "Used Car Loan",
    rating: 5,
    text: "I was worried about getting a loan for a used car but HS Enterprises made it effortless. Very transparent about the rates and zero hidden charges.",
    createdAt: new Date().toISOString(),
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "fill-accent text-accent" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
          data-testid={`star-${i + 1}`}
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              i < (hovered || value) ? "fill-accent text-accent" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Reviews() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const { data: apiReviews = [] } = useGetReviews();
  const { mutate: createReview, isPending } = useCreateReview({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetReviewsQueryKey() });
        setSubmitted(true);
        setShowForm(false);
        form.reset();
        setTimeout(() => setSubmitted(false), 4000);
      },
    },
  });

  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: "", location: "", service: "", rating: 5, text: "" },
  });

  function onSubmit(values: ReviewForm) {
    createReview({ data: values });
  }

  // Merge: real DB reviews first, then sample fallbacks (only if no real ones)
  const displayReviews = apiReviews.length > 0 ? apiReviews : sampleReviews;

  return (
    <section id="reviews" className="py-24 bg-white" data-testid="section-reviews">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between max-w-6xl mx-auto mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">
              What Our Customers Say
            </h2>
            <div className="h-1 w-20 bg-accent rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground max-w-xl">
              Thousands of happy customers across India trust HS Enterprises for their financial needs.
            </p>
          </div>
          <Button
            onClick={() => { setShowForm(true); setSubmitted(false); }}
            className="bg-accent hover:bg-accent/90 text-white gap-2 shrink-0"
            data-testid="button-write-review"
          >
            <PenLine className="w-4 h-4" />
            Write a Review
          </Button>
        </div>

        {/* Success banner */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-6xl mx-auto mb-8 bg-green-50 border border-green-200 text-green-800 rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <Star className="w-5 h-5 fill-green-500 text-green-500 shrink-0" />
              <p className="font-medium">Thank you! Your review has been published.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mb-14">
          {[
            { value: "1,200+", label: "Loans Disbursed" },
            { value: "4.9 / 5", label: "Customer Rating" },
            { value: "10+", label: "Years of Trust" },
            { value: "Pan-India", label: "Service Coverage" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-primary font-serif">{stat.value}</p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.08 }}
              className="bg-[#F5F7FA] rounded-2xl p-6 border border-border hover:border-accent/40 hover:shadow-md transition-all duration-300 flex flex-col"
              data-testid={`card-review-${index}`}
            >
              <Quote className="w-8 h-8 text-accent/30 mb-4 shrink-0" />
              <p className="text-primary/80 leading-relaxed text-sm flex-1 mb-5">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold font-serif">
                    {getInitials(review.name)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-primary text-sm truncate">{review.name}</p>
                  <p className="text-muted-foreground text-xs">{review.location} · {review.service}</p>
                </div>
                <StarRating count={review.rating} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Write a Review modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
              data-testid="modal-review"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="button-close-modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-bold text-primary font-serif mb-1">Share Your Experience</h3>
                <p className="text-muted-foreground text-sm mb-6">Your review helps others make the right choice.</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Rajesh Kumar" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Hyderabad" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Used</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <StarPicker value={field.value} onChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Review</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your experience with HS Enterprises..."
                              className="min-h-[100px] resize-y"
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
                      className="w-full bg-accent hover:bg-accent/90 text-white h-12"
                      data-testid="button-submit-review"
                    >
                      {isPending ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                      ) : (
                        "Submit Review"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
