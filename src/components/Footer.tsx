import { useState } from 'react';
import { Monitor, Mail, Phone, MapPin, X, FileText } from "lucide-react";

interface FooterProps {
  onPolicyClick?: (policy: 'terms' | 'privacy' | 'refund') => void;
}

export const Footer = ({ onPolicyClick }: FooterProps) => {
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyType, setPolicyType] = useState<'terms' | 'privacy' | 'refund'>('terms');

  const handlePolicyClick = (e: React.MouseEvent<HTMLAnchorElement>, policy: 'terms' | 'privacy' | 'refund') => {
    e.preventDefault();
    
    // If parent component provided handler, use it
    if (onPolicyClick) {
      onPolicyClick(policy);
    } else {
      // Otherwise use local modal
      setPolicyType(policy);
      setShowPolicyModal(true);
    }
  };

  const getPolicyContent = () => {
    switch (policyType) {
      case 'terms':
        return {
          title: "Terms & Conditions",
          content: `Last Updated: November 11, 2025

1. ACCEPTANCE OF TERMS
By accessing and using TechFix Repair Agent services, you accept and agree to be bound by these Terms and Conditions.

2. SERVICE DESCRIPTION
TechFix provides AI-powered technical repair services combined with human expert support. Our services include:
- Automated diagnostics and repair
- Remote technical assistance
- Software troubleshooting
- System optimization

3. SERVICE TOKENS
- Tokens are valid for the duration specified in your selected plan
- Tokens are non-transferable
- One token per repair session
- Unused tokens expire at the end of the validity period

4. USER OBLIGATIONS
You agree to:
- Provide accurate information
- Use services only for lawful purposes
- Not attempt to reverse engineer or hack our systems
- Maintain the confidentiality of your service tokens

5. PAYMENT TERMS
- All payments are processed securely through Flutterwave
- Prices are in USD unless otherwise stated
- Payment must be completed before service delivery

6. LIMITATION OF LIABILITY
TechFix Repair Agent is provided "as is" without warranties. We are not liable for:
- Data loss during repair processes
- Hardware failures
- Third-party software issues
- Consequential damages

7. INTELLECTUAL PROPERTY
All content, trademarks, and software are owned by TechFix and protected by intellectual property laws.

8. TERMINATION
We reserve the right to suspend or terminate services for violations of these terms.

9. GOVERNING LAW
These terms are governed by the laws of Nigeria.

10. CONTACT
For questions about these terms:
Email: oladejiolaoluwa46@gmail.com
Phone: +234 9030903109
Address: 21 joseph Alli Street,Ikorodu , Lagos, Nigeria`
        };
      case 'privacy':
        return {
          title: "Privacy Policy",
          content: `Last Updated: November 11, 2025

1. INFORMATION WE COLLECT
- Email addresses for service delivery
- Payment information (processed securely by Flutterwave)
- Technical diagnostic data from your device
- Service usage information

2. HOW WE USE YOUR INFORMATION
- To provide and improve our services
- To communicate about your repair sessions
- To process payments
- To send service-related notifications
- To ensure security and prevent fraud

3. DATA STORAGE AND SECURITY
- All data is encrypted in transit and at rest
- We use industry-standard security measures
- Payment information is handled by Flutterwave (PCI DSS compliant)
- Service tokens are stored securely

4. DATA SHARING
We do not sell your personal information. We may share data with:
- Payment processors (Flutterwave)
- Service providers who assist our operations
- Law enforcement when legally required

5. YOUR RIGHTS
You have the right to:
- Access your personal data
- Request data correction or deletion
- Opt-out of marketing communications
- Request data portability

6. COOKIES AND TRACKING
We use cookies and similar technologies to:
- Remember your preferences
- Analyze usage patterns
- Improve user experience

7. DATA RETENTION
- Account data: Retained while your account is active
- Transaction records: 7 years for legal compliance
- Diagnostic data: 90 days

8. CHILDREN'S PRIVACY
Our services are not intended for users under 18 years of age.

9. INTERNATIONAL USERS
Your data may be transferred to and processed in countries where our servers are located.

10. CHANGES TO POLICY
We may update this policy and will notify users of significant changes.

11. CONTACT US
For privacy concerns:
Email: privacy@techfix.com
Phone: +234 123 456 7890
Address: 123 Tech Street, Lagos, Nigeria`
        };
      case 'refund':
        return {
          title: "Refund Policy",
          content: `Last Updated: November 11, 2025

1. REFUND ELIGIBILITY

1.1 Full Refund (100%)
You are eligible for a full refund if:
- Service was not delivered within 24 hours of token issuance
- Technical issues prevented service delivery (on our end)
- Service was not as described
- Request made within 24 hours of purchase before token use

1.2 Partial Refund (50%)
You may receive a partial refund if:
- Service was partially delivered
- Session was interrupted due to technical issues
- Quality did not meet service standards

1.3 No Refund
Refunds are not available for:
- Services already fully rendered
- User error or misuse
- Change of mind after service delivery
- Expired unused tokens (after validity period)
- Token sharing or security breaches

2. REFUND PROCESS

2.1 How to Request
- Email: oladejiolaoluwa46@gmail.com
- Subject: Refund Request - [Token Number]
- Include: Purchase date, email, reason for refund

2.2 Processing Time
- Request review: 1-2 business days
- Refund approval: 3-5 business days
- Payment processor (Flutterwave): 5-10 business days
- Total time: Up to 15 business days

2.3 Refund Method
- Refunds issued to original payment method
- Processing fees may apply (as per Flutterwave policy)

3. BUNDLE AND SUBSCRIPTION REFUNDS
- Unused sessions in bundles are non-refundable after first use
- Pro plans: Prorated refunds within first 7 days
- No refunds after 50% of validity period has elapsed

4. DISPUTED CHARGES
If you notice an unauthorized charge:
- Contact us immediately at support@techfix.com
- We will investigate and resolve within 48 hours
- Fraudulent charges will be fully refunded

5. SERVICE CREDITS
In lieu of refunds, we may offer:
- Service credits for future use
- Extended validity periods
- Upgraded service packages

6. CHARGEBACK POLICY
Initiating a chargeback will:
- Suspend your account pending investigation
- May result in service termination
- Please contact us first to resolve issues

7. EXCEPTIONS AND SPECIAL CIRCUMSTANCES
We handle exceptions on a case-by-case basis for:
- Force majeure events
- Extended service outages
- Verified technical failures

8. CONTACT FOR REFUNDS
Email: oladejiolaoluwa46@gmail.com
Phone: +234 9030903109
Address: 123 Tech Street, Lagos, Nigeria

Response time: Within 24 hours on business days`
        };
    }
  };

  const policyContent = getPolicyContent();

  return (
    <>
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
                  <span>21 Joseph Alli street, Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href="mailto:oladejiolaoluwa46@gmail.com" className="hover:text-foreground transition-colors">
                    oladejiolaoluwa46@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:+2349030903109" className="hover:text-foreground transition-colors">
                    +2349030903109
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

      {/* POLICY MODAL */}
      {showPolicyModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" 
            onClick={() => setShowPolicyModal(false)}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <div 
              className="relative max-w-3xl w-full pointer-events-auto my-8" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
                <button 
                  onClick={() => setShowPolicyModal(false)} 
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <X className="w-5 h-5 text-white/60 group-hover:text-white" />
                </button>

                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white text-center mb-6">{policyContent.title}</h2>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <pre className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {policyContent.content}
                  </pre>
                </div>

                <button 
                  onClick={() => setShowPolicyModal(false)} 
                  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

























// import { Monitor, Mail, Phone, MapPin, X } from "lucide-react";

// interface FooterProps {
//   onPolicyClick?: (policy: 'terms' | 'privacy' | 'refund') => void;
// }

// export const Footer = ({ onPolicyClick }: FooterProps) => {
//   const handlePolicyClick = (e: React.MouseEvent<HTMLAnchorElement>, policy: 'terms' | 'privacy' | 'refund') => {
//     e.preventDefault();
//     if (onPolicyClick) {
//       onPolicyClick(policy);
//     }
//   };

//   return (
//     <footer className="bg-primary/5 border-t border-border/50 py-12">
//       <div className="container mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           {/* Logo and brand */}
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
//                 <Monitor className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <div className="font-bold text-lg text-foreground">TechFix Repair Agent</div>
//                 <div className="text-sm text-muted-foreground">AI-Powered Tech Repair</div>
//               </div>
//             </div>
//             <p className="text-xs text-muted-foreground leading-relaxed">
//               Advanced AI combined with expert human support for fast, secure, and reliable tech repair services.
//             </p>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <h3 className="font-bold text-sm text-foreground mb-4">Contact Us</h3>
//             <div className="space-y-3">
//               <div className="flex items-start gap-2 text-xs text-muted-foreground">
//                 <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                 <span>123 Tech Street, Lagos, Nigeria</span>
//               </div>
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <a href="mailto:support@techfix.com" className="hover:text-foreground transition-colors">
//                   support@techfix.com
//                 </a>
//               </div>
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <a href="tel:+2341234567890" className="hover:text-foreground transition-colors">
//                   +234 123 456 7890
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Legal Links */}
//           <div>
//             <h3 className="font-bold text-sm text-foreground mb-4">Legal</h3>
//             <div className="space-y-2">
//               <a 
//                 href="#terms" 
//                 onClick={(e) => handlePolicyClick(e, 'terms')}
//                 className="block text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
//               >
//                 Terms & Conditions
//               </a>
//               <a 
//                 href="#privacy" 
//                 onClick={(e) => handlePolicyClick(e, 'privacy')}
//                 className="block text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
//               >
//                 Privacy Policy
//               </a>
//               <a 
//                 href="#refund" 
//                 onClick={(e) => handlePolicyClick(e, 'refund')}
//                 className="block text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
//               >
//                 Refund Policy
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Copyright */}
//         <div className="pt-8 border-t border-border/30 text-center">
//           <p className="text-muted-foreground text-xs">
//             &copy; 2025 TechFix Repair Agent. All rights reserved.
//           </p>
//           <p className="text-muted-foreground text-xs mt-2">
//             🔐 Secure • ⚡ Fast • ✅ Reliable Tech Support
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };










// import { Monitor, Mail, Phone, MapPin } from "lucide-react";

// interface FooterProps {
//   onPolicyClick?: (policy: 'terms' | 'privacy' | 'refund') => void;
// }

// export const Footer = ({ onPolicyClick }: FooterProps) => {
//   const handlePolicyClick = (e: React.MouseEvent<HTMLAnchorElement>, policy: 'terms' | 'privacy' | 'refund') => {
//     e.preventDefault();
//     if (onPolicyClick) {
//       onPolicyClick(policy);
//     }
//   };

//   return (
//     <footer className="bg-primary/5 border-t border-border/50 py-12">
//       <div className="container mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           {/* Logo and brand */}
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
//                 <Monitor className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <div className="font-bold text-lg text-foreground">TechFix Repair Agent</div>
//                 <div className="text-sm text-muted-foreground">AI-Powered Tech Repair</div>
//               </div>
//             </div>
//             <p className="text-xs text-muted-foreground leading-relaxed">
//               Advanced AI combined with expert human support for fast, secure, and reliable tech repair services.
//             </p>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <h3 className="font-bold text-sm text-foreground mb-4">Contact Us</h3>
//             <div className="space-y-3">
//               <div className="flex items-start gap-2 text-xs text-muted-foreground">
//                 <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                 <span>123 Tech Street, Lagos, Nigeria</span>
//               </div>
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <a href="mailto:support@techfix.com" className="hover:text-foreground transition-colors">
//                   support@techfix.com
//                 </a>
//               </div>
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <a href="tel:+2341234567890" className="hover:text-foreground transition-colors">
//                   +234 123 456 7890
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Legal Links */}
//           <div>
//             <h3 className="font-bold text-sm text-foreground mb-4">Legal</h3>
//             <div className="space-y-2">
//               <a 
//                 href="#terms" 
//                 onClick={(e) => handlePolicyClick(e, 'terms')}
//                 className="block text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
//               >
//                 Terms & Conditions
//               </a>
//               <a 
//                 href="#privacy" 
//                 onClick={(e) => handlePolicyClick(e, 'privacy')}
//                 className="block text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
//               >
//                 Privacy Policy
//               </a>
//               <a 
//                 href="#refund" 
//                 onClick={(e) => handlePolicyClick(e, 'refund')}
//                 className="block text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
//               >
//                 Refund Policy
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Copyright */}
//         <div className="pt-8 border-t border-border/30 text-center">
//           <p className="text-muted-foreground text-xs">
//             &copy; 2025 TechFix Repair Agent. All rights reserved.
//           </p>
//           <p className="text-muted-foreground text-xs mt-2">
//             🔐 Secure • ⚡ Fast • ✅ Reliable Tech Support
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };











