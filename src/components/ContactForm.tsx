import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateSubmission } from "@/hooks/useSubmissions";
import { FormField } from "@/components/FormField";
import { validateContactForm, getFieldError } from "@/utils/validation";
import { showSuccessToast, showErrorToast } from "@/utils/errorHandler";

export const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const createSubmission = useCreateSubmission();

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    
    // Validate on blur for real-time feedback
    const validation = validateContactForm(form);
    setErrors(validation.errors);
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    
    // Clear error for this field when user starts typing
    if (touched[field]) {
      const validation = validateContactForm({ ...form, [field]: value });
      setErrors(validation.errors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true, message: true });
    
    // Validate form
    const validation = validateContactForm(form);
    setErrors(validation.errors);
    
    if (!validation.isValid) {
      showErrorToast('Please fix the errors in the form');
      return;
    }
    
    createSubmission.mutate(form, {
      onSuccess: () => {
        setForm({ name: "", email: "", phone: "", message: "" });
        setErrors([]);
        setTouched({});
        showSuccessToast('Message sent successfully! We\'ll get back to you soon.');
      },
      onError: (error) => {
        showErrorToast(error);
      },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto relative">
      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Contact Details Card */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 sm:p-8 border border-primary/20 shadow-xl backdrop-blur-sm">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-6">Contact Info</h2>
          <div className="space-y-5">
            <a 
              href="tel:+254704459870" 
              className="flex items-center gap-4 p-4 rounded-xl bg-card/50 hover:bg-card border border-border hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-ui">Phone</p>
                <p className="font-body text-foreground">+254 704 459 870</p>
              </div>
            </a>

            <a 
              href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20information." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-4 p-4 rounded-xl bg-card/50 hover:bg-card border border-border hover:border-[hsl(142,70%,45%)]/50 transition-all hover:scale-105 hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-full bg-[hsl(142,70%,45%)]/10 flex items-center justify-center group-hover:bg-[hsl(142,70%,45%)]/20 transition-colors">
                <MessageCircle size={20} className="text-[hsl(142,70%,45%)]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-ui">WhatsApp</p>
                <p className="font-body text-foreground">Chat with us</p>
              </div>
            </a>

            <a 
              href="mailto:njorogekush@gmail.com" 
              className="flex items-center gap-4 p-4 rounded-xl bg-card/50 hover:bg-card border border-border hover:border-accent/50 transition-all hover:scale-105 hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail size={20} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-ui">Email</p>
                <p className="font-body text-foreground truncate">njorogekush@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <MapPin size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-ui">Location</p>
                <p className="font-body text-foreground">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[hsl(142,70%,45%)]/20 via-[hsl(142,70%,45%)]/10 to-transparent rounded-2xl p-6 sm:p-8 border border-[hsl(142,70%,45%)]/30 shadow-xl backdrop-blur-sm"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-[hsl(142,70%,45%)]/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={24} className="text-[hsl(142,70%,45%)]" />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-2">Prefer WhatsApp?</h3>
              <p className="text-muted-foreground font-body text-sm">
                Get instant responses and quick quotes through WhatsApp chat.
              </p>
            </div>
          </div>
          <Button asChild className="w-full font-ui bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <a href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20information." target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2" size={18} />
              Start WhatsApp Chat
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-card via-card to-card/50 border border-border rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl backdrop-blur-sm"
      >
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-2">Send a Message</h2>
          <p className="text-muted-foreground font-body text-sm">Fill out the form below and we'll get back to you shortly.</p>
        </div>
        
        <FormField
          label="Your Name"
          name="name"
          value={form.name}
          onChange={(value) => handleChange('name', value)}
          onBlur={() => handleBlur('name')}
          error={touched.name ? getFieldError(errors, 'name') : undefined}
          required
          placeholder="John Doe"
        />

        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={(value) => handleChange('email', value)}
          onBlur={() => handleBlur('email')}
          error={touched.email ? getFieldError(errors, 'email') : undefined}
          required
          placeholder="john@example.com"
        />

        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(value) => handleChange('phone', value)}
          onBlur={() => handleBlur('phone')}
          error={touched.phone ? getFieldError(errors, 'phone') : undefined}
          placeholder="+254 700 000 000"
        />

        <FormField
          label="Message"
          name="message"
          type="textarea"
          value={form.message}
          onChange={(value) => handleChange('message', value)}
          onBlur={() => handleBlur('message')}
          error={touched.message ? getFieldError(errors, 'message') : undefined}
          required
          placeholder="Tell us about your project..."
          rows={5}
          maxLength={5000}
          showCharCount
        />

        <Button 
          type="submit" 
          size="lg" 
          className="w-full font-ui bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105" 
          disabled={createSubmission.isPending}
        >
          <Send className="mr-2" size={18} />
          {createSubmission.isPending ? "Sending..." : "Send Message"}
        </Button>
      </motion.form>
    </div>
  );
};
