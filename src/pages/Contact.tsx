import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ContactForm } from "@/components/ContactForm";
import { SubmissionsManagement } from "@/components/admin/SubmissionsManagement";

const Contact = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen pt-16 sm:pt-20 relative overflow-hidden">
      {/* Decorative background elements */}
      {!isAuthenticated && (
        <>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </>
      )}

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-foreground mb-4 sm:mb-6">
              {isAuthenticated ? (
                <>
                  Contact <span className="text-gradient">Submissions</span>
                </>
              ) : (
                <>
                  Get In <span className="text-gradient">Touch</span>
                </>
              )}
            </h1>
            {!isAuthenticated && (
              <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            )}
          </motion.div>

          {/* Conditional rendering based on authentication */}
          {isAuthenticated ? (
            <SubmissionsManagement />
          ) : (
            <ContactForm />
          )}
        </div>
      </section>

      {/* CTA Section - Only for public view */}
      {!isAuthenticated && (
        <section className="py-12 sm:py-16 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-8 sm:p-12 text-center border border-border/50 backdrop-blur-sm"
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Ready to Transform Your Space?
              </h2>
              <p className="font-body text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's bring your vision to life with professional painting services that exceed expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20information."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white rounded-lg font-ui font-medium transition-all hover:scale-105 shadow-lg"
                >
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+254704459870"
                  className="inline-flex items-center justify-center px-8 py-3 bg-card hover:bg-muted text-foreground rounded-lg font-ui font-medium transition-all hover:scale-105 border border-border shadow-lg"
                >
                  Call Us Now
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Contact;
