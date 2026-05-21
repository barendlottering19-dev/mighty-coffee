"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { BUSINESS } from "@/lib/constants";
import { contactSchema } from "@/lib/security";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (res.ok) {
        toast.success("Message sent! We will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        const data = await res.json();
        toast.error(data.error || "Something went wrong.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-espresso to-espresso-light text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Get in Touch
            </motion.h1>
            <motion.p variants={fadeIn} className="text-cream/70 text-lg max-w-xl mx-auto">
              Have a question, craving, or want to book an event? We would love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream dark:bg-matte-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeIn} className="text-2xl font-bold text-espresso dark:text-cream mb-6">
                Send Us a Message
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="What is this about?" />
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Your message..." />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                </div>

                <Button type="submit" disabled={submitting} className="w-full h-12">
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8">
              <motion.div variants={fadeIn}>
                <h2 className="text-2xl font-bold text-espresso dark:text-cream mb-6">Visit Us</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-caramel mt-1" />
                    <div>
                      <p className="font-medium text-espresso dark:text-cream">Address</p>
                      <p className="text-muted-foreground text-sm">{BUSINESS.address.full}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-caramel mt-1" />
                    <div>
                      <p className="font-medium text-espresso dark:text-cream">Phone</p>
                      <a href={`tel:${BUSINESS.phone}`} className="text-muted-foreground text-sm hover:text-caramel transition-colors">{BUSINESS.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-caramel mt-1" />
                    <div>
                      <p className="font-medium text-espresso dark:text-cream">Email</p>
                      <a href={`mailto:${BUSINESS.email}`} className="text-muted-foreground text-sm hover:text-caramel transition-colors">{BUSINESS.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-caramel mt-1" />
                    <div>
                      <p className="font-medium text-espresso dark:text-cream mb-2">Hours</p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {BUSINESS.hours.map((h) => (
                          <p key={h.day} className="flex justify-between max-w-[200px]">
                            <span>{h.day}</span>
                            <span>{h.open} - {h.close}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="rounded-xl overflow-hidden shadow-lg h-[300px]">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580!2d${BUSINESS.coordinates.lng}!3d${BUSINESS.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e945b1ba36f0a25%3A0xfd43be65027abd79!2sMighty+Coffee!5e0!3m2!1sen!2sza!4v1`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mighty Coffee location"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
