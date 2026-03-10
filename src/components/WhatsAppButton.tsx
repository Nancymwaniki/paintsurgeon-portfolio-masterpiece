import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20information."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse"
    aria-label="Chat on WhatsApp"
  >
    <FontAwesomeIcon icon={faWhatsapp} className="text-white text-3xl" />
    {/* Pulsing ring effect */}
    <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,45%)] animate-ping opacity-75"></span>
  </a>
);

export default WhatsAppButton;
