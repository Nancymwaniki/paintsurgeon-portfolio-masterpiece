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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-8xl text-center text-foreground mb-16"
          >
            GET IN <span className="text-gradient">TOUCH</span>
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-3xl text-foreground mb-6">CONTACT INFO</h2>
                <div className="space-y-4">
                  <a href="tel:+254704459870" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-body">
                    <Phone size={20} className="text-primary" />
                    +254 704 459 870
                  </a>
                  <a href="https://wa.me/254704459870" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-secondary transition-colors font-body">
                    <MessageCircle size={20} className="text-secondary" />
                    WhatsApp Us
                  </a>
                  <a href="mailto:nancymwa087@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors font-body">
                    <Mail size={20} className="text-accent" />
                    njorogekush@gmail.com
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground font-body">
                    <MapPin size={20} className="text-primary" />
                    Nairobi, Kenya
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6 border border-border">
                <h3 className="font-display text-2xl text-foreground mb-2">PREFER WHATSAPP?</h3>
                <p className="text-muted-foreground font-body text-sm mb-4">
                  Chat with us directly for quick quotes and inquiries.
                </p>
                <Button asChild className="font-body bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-primary-foreground">
                  <a href="https://wa.me/254704459870" target="_blank" rel="noopener noreferrer">
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
              className="bg-card border border-border rounded-lg p-8 space-y-5"
            >
              <h2 className="font-display text-3xl text-foreground mb-2">SEND A MESSAGE</h2>
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="font-body bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="font-body bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
              <Input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="font-body bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
              <Textarea
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="font-body bg-muted border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
              <Button type="submit" size="lg" className="w-full font-body bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="mr-2" size={18} />
                Send Message
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
