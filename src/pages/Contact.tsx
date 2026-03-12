import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          subject: "New Contact Form Submission from Paintsurgeon Website",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({ 
          title: "Message sent!", 
          description: "We'll get back to you soon." 
        });
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to send message. Please try WhatsApp instead.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl md:text-8xl text-center text-foreground mb-10 sm:mb-16"
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-4 sm:mb-6">Contact Info</h2>
                <div className="space-y-3 sm:space-y-4">
                  <a href="tel:+254704459870" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body text-sm sm:text-base">
                    <Phone size={18} className="sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    +254 704 459 870
                  </a>
                  <a href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20information." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-secondary transition-colors font-body text-sm sm:text-base">
                    <MessageCircle size={18} className="sm:w-5 sm:h-5 text-secondary flex-shrink-0" />
                    WhatsApp Us
                  </a>
                  <a href="mailto:nancymwa087@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors font-body text-sm sm:text-base break-all">
                    <Mail size={18} className="sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                    njorogekush@gmail.com
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground font-body text-sm sm:text-base">
                    <MapPin size={18} className="sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    Nairobi, Kenya
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 sm:p-6 border border-border">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-2">Prefer WhatsApp?</h3>
                <p className="text-muted-foreground font-body text-xs sm:text-sm mb-4">
                  Chat with us directly for quick quotes and inquiries.
                </p>
                <Button asChild className="font-ui bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-primary-foreground">
                  <a href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20information." target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2" size={18} />
                    Open WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-lg p-5 sm:p-8 space-y-4 sm:space-y-5"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-2">Send a Message</h2>
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="font-body text-sm sm:text-base bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="font-body text-sm sm:text-base bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
              <Input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="font-body text-sm sm:text-base bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
              <Textarea
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="font-body text-sm sm:text-base bg-muted border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
              <Button type="submit" size="lg" className="w-full font-ui bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
                <Send className="mr-2" size={18} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
