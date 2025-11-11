import { Monitor, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  onPolicyClick?: (policy: 'terms' | 'privacy' | 'refund') => void;
}

export const Footer = ({ onPolicyClick }: FooterProps) => {
  const handlePolicyClick = (e: React.MouseEvent<HTMLAnchorElement>, policy: 'terms' | 'privacy' | 'refund') => {
    e.preventDefault();
    if (onPolicyClick) {
      onPolicyClick(policy);
    }
  };

  return (
    <footer className="bg-primary/5 border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">TechFix Repair Agent</div>
                <div className="text-sm text-muted-foreground">AI-Powered Tech Repair</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Advanced AI combined with expert human support for fast, secure, and reliable tech repair services.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-sm text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>123 Tech Street, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:support@techfix.com" className="hover:text-foreground transition-colors">
                  support@techfix.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+2341234567890" className="hover:text-foreground transition-colors">
                  +234 123 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-sm text-foreground mb-4">Legal</h3>
            <div className="space-y-2">
              <a 
                href="#terms" 
                onClick={(e) => handlePolicyClick(e, 'terms')}
                className="block text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Terms & Conditions
              </a>
              <a 
                href="#privacy" 
                onClick={(e) => handlePolicyClick(e, 'privacy')}
                className="block text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <a 
                href="#refund" 
                onClick={(e) => handlePolicyClick(e, 'refund')}
                className="block text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-xs">
            &copy; 2025 TechFix Repair Agent. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            🔐 Secure • ⚡ Fast • ✅ Reliable Tech Support
          </p>
        </div>
      </div>
    </footer>
  );
};











// import { Monitor } from "lucide-react";

// export const Footer = () => {
//   return (
//     <footer className="bg-primary/5 border-t border-border/50 py-12">
//       <div className="container mx-auto px-6">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//           {/* Logo and brand */}
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
//               <Monitor className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <div className="font-bold text-lg text-foreground">TechFix Repair Agent</div>
//               <div className="text-sm text-muted-foreground">AI-Powered Tech Repair</div>
//             </div>
//           </div>

//           {/* Copyright */}
//           <div className="text-center md:text-right">
//             <p className="text-muted-foreground text-sm">
//               &copy; 2025 TechFix repair agent
//             </p>
//             <p className="text-muted-foreground text-xs mt-1">
//               Secure • Fast • Reliable Tech Support
//             </p>
//           </div>
//         </div>

//         {/* Additional info */}
//         <div className="mt-8 pt-8 border-t border-border/30 text-center">
//           <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//             TechFix AI uses advanced artificial intelligence combined with expert human support 
//             to provide fast, secure, and reliable tech repair services. Your privacy and security 
//             are our top priorities.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };
