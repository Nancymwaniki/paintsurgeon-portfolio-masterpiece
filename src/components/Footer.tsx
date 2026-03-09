import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-display text-3xl text-gradient mb-4">PAINTSURGEON</h3>
        <p className="text-muted-foreground font-body text-sm leading-relaxed">
          Professional painting services and creative design solutions based in Kenya.
        </p>
      </div>
      <div>
        <h4 className="font-display text-xl text-foreground mb-4">QUICK LINKS</h4>
        <div className="flex flex-col gap-2">
          {["About", "Services", "Portfolio", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display text-xl text-foreground mb-4">CONTACT</h4>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground font-body">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-primary" />
            <span>+254 704 459 870</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-secondary" />
            <span>njorogekush@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-accent" />
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border text-center">
      <p className="text-muted-foreground text-xs font-body">
        © {new Date().getFullYear()} Paintsurgeon Painting Services. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
