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



















// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Monitor, Zap, Shield, Clock, Copy, Check, X, Bell, CreditCard, ArrowRight } from "lucide-react";

// export const Hero = () => {
//   const [email, setEmail] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState<"basic" | "bundle" | "pro" | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [token, setToken] = useState("");
//   const [expiresAt, setExpiresAt] = useState("");
//   const [copied, setCopied] = useState(false);
  
//   // Modal states
//   const [showPlanModal, setShowPlanModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showTokenModal, setShowTokenModal] = useState(false);
//   const [notification, setNotification] = useState<{ id: string; title: string; message: string; created_at: string } | null>(null);
//   const [showNotification, setShowNotification] = useState(false);

//   const API_ENDPOINT = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

//   // Plan definitions
//   const plans = [
//     { 
//       id: "basic", 
//       name: "Save my PC now", 
//       price: 29, 
//       description: "1 repair • 24 hours",
//       features: ["AI-powered diagnostics", "30 min automated repair", "15 min human support"]
//     },
//     { 
//       id: "bundle", 
//       name: "3 fixes bundle", 
//       price: 59, 
//       description: "3 repairs • 7 days",
//       features: ["Everything in Basic", "3 repair sessions", "Priority support", "Valid for 7 days"],
//       popular: true
//     },
//     { 
//       id: "pro", 
//       name: "IT dept kit", 
//       price: 99, 
//       description: "5 repairs • 30 days",
//       features: ["Everything in Bundle", "5 repair sessions", "24/7 priority support", "Valid for 30 days"]
//     }
//   ];

//   // Check for payment success from URL on mount
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const status = urlParams.get('status');
//     const txRef = urlParams.get('tx_ref') || urlParams.get('transaction_id');
    
//     if (status === 'successful' && txRef) {
//       console.log("✅ Payment redirect detected, verifying:", txRef);
//       // Clean URL
//       window.history.replaceState({}, '', window.location.pathname);
//       // Verify payment
//       setShowPaymentModal(true);
//       checkPaymentStatus(txRef);
//     } else if (status === 'cancelled') {
//       console.log("❌ Payment cancelled");
//       alert("❌ Payment was cancelled. Please try again.");
//     }
//   }, []);

//   // Check for pending payment on mount (in case user refreshed)
//   useEffect(() => {
//     const pendingTxRef = window.sessionStorage.getItem('pending_tx_ref');
//     if (pendingTxRef) {
//       console.log("🔄 Found pending payment, verifying:", pendingTxRef);
//       setShowPaymentModal(true);
//       checkPaymentStatus(pendingTxRef);
//     }
//   }, []);

//   // Fetch notification on mount
//   useEffect(() => {
//     const fetchNotification = async () => {
//       try {
//         const response = await fetch(`${API_ENDPOINT}/notifications`);
//         const data = await response.json();
        
//         if (data.id && !localStorage.getItem(`notification_seen_${data.id}`)) {
//           setNotification(data);
//           setShowNotification(true);
//         }
//       } catch (error) {
//         console.error("Failed to fetch notification:", error);
//       }
//     };

//     fetchNotification();
//   }, []);

//   const handleGetStarted = () => {
//     setShowPlanModal(true);
//   };

//   const handlePlanSelect = (planId: "basic" | "bundle" | "pro") => {
//     if (!email || !email.includes("@")) {
//       alert("⚠️ Please enter a valid email address first.");
//       return;
//     }
//     setSelectedPlan(planId);
//     setShowPlanModal(false);
//     setShowPaymentModal(true);
//   };

//   const initializeFlutterwave = async () => {
//     if (!selectedPlan || !email) return;

//     const plan = plans.find(p => p.id === selectedPlan);
//     if (!plan) return;

//     try {
//       console.log("🚀 Calling backend:", `${API_ENDPOINT}/create-checkout-session`);
      
//       const response = await fetch(`${API_ENDPOINT}/create-checkout-session`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({
//           email,
//           plan: selectedPlan,
//           amount: plan.price,
//         }),
//       });

//       console.log("📥 Response status:", response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("❌ Backend error:", errorText);
//         alert(`❌ Failed to initialize payment: ${response.status}`);
//         setShowPaymentModal(false);
//         return;
//       }

//       const data = await response.json();
//       console.log("📦 Response data:", data);

//       if (data.redirect_url && data.tx_ref) {
//         // Open Flutterwave hosted checkout in popup
//         const width = 500;
//         const height = 700;
//         const left = (window.innerWidth - width) / 2;
//         const top = (window.innerHeight - height) / 2;
        
//         const popup = window.open(
//           data.redirect_url,
//           'flutterwave-payment',
//           `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
//         );

//         if (!popup) {
//           alert("⚠️ Please allow popups for payment window");
//           setShowPaymentModal(false);
//           return;
//         }

//         // Store tx_ref for verification
//         window.sessionStorage.setItem('pending_tx_ref', data.tx_ref);
        
//         // Poll for payment completion
//         const checkInterval = setInterval(() => {
//           if (popup?.closed) {
//             clearInterval(checkInterval);
//             console.log("💳 Payment popup closed, verifying...");
//             // Small delay to ensure payment processed
//             setTimeout(() => {
//               checkPaymentStatus(data.tx_ref);
//             }, 2000);
//           }
//         }, 1000);
//       } else {
//         alert(`❌ Failed to initialize payment: Invalid response`);
//         setShowPaymentModal(false);
//       }
//     } catch (error) {
//       console.error("💥 Error initializing payment:", error);
//       alert("❌ Payment setup failed. Please try again.");
//       setShowPaymentModal(false);
//     }
//   };

//   const checkPaymentStatus = async (txRef: string) => {
//     try {
//       setIsLoading(true);
//       setShowPaymentModal(true); // Keep modal visible while checking
//       console.log("🔍 Verifying payment:", txRef);
      
//       const response = await fetch(`${API_ENDPOINT}/verify-payment`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ tx_ref: txRef }),
//       });

//       console.log("📥 Verification response status:", response.status);
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("❌ Verification error:", errorText);
//         alert("❌ Could not verify payment. Please contact support with reference: " + txRef);
//         setShowPaymentModal(false);
//         return;
//       }

//       const data = await response.json();
//       console.log("✅ Verification result:", data);

//       if (data.status === "successful" && data.token) {
//         console.log("🎉 Payment verified! Token:", data.token);
//         setToken(data.token);
//         setExpiresAt(data.expires_at);
//         setShowPaymentModal(false);
//         setShowTokenModal(true);
//         // Clear pending reference
//         window.sessionStorage.removeItem('pending_tx_ref');
//       } else if (data.status === "pending") {
//         console.log("⏳ Payment still pending");
//         alert("⏳ Payment is still processing. Please check your email for confirmation or contact support.");
//         setShowPaymentModal(false);
//       } else {
//         console.log("❌ Payment not successful:", data.status);
//         alert("❌ Payment was not completed. Please try again or contact support.");
//         setShowPaymentModal(false);
//       }
//     } catch (error) {
//       console.error("💥 Error checking payment status:", error);
//       alert("❌ Could not verify payment. Please contact support with your payment confirmation email.");
//       setShowPaymentModal(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (showPaymentModal && selectedPlan) {
//       initializeFlutterwave();
//     }
//   }, [showPaymentModal, selectedPlan]);

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(token);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const closeTokenModal = () => {
//     setShowTokenModal(false);
//     setToken("");
//     setExpiresAt("");
//     setCopied(false);
//     setSelectedPlan(null);
//     setEmail("");
//   };

//   const closeNotification = () => {
//     if (notification) {
//       localStorage.setItem(`notification_seen_${notification.id}`, "true");
//     }
//     setShowNotification(false);
//     setNotification(null);
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-95"></div>

//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
//         <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "4s" }}></div>
//       </div>

//       <div className="container mx-auto px-6 py-20 relative z-10">
//         <div className="max-w-4xl mx-auto">
//           {/* Content */}
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-2 mb-6">
//               <Monitor className="w-8 h-8 text-cyan-400 animate-pulse" />
//               <span className="text-xl font-bold text-white/90 font-mono">TechFix Repair Agent</span>
//             </div>

//             <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//               AI-Powered
//               <br />
//               <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
//                 Tech Repair
//               </span>
//             </h1>

//             <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
//               Fix software issues instantly with our intelligent AI agent. 
//               Get automated repairs + expert human support.
//             </p>

//             {/* Features */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//               <div className="flex items-center justify-center gap-3 text-white/90">
//                 <Zap className="w-5 h-5 text-cyan-400" />
//                 <span className="font-medium">AI-Powered</span>
//               </div>
//               <div className="flex items-center justify-center gap-3 text-white/90">
//                 <Shield className="w-5 h-5 text-cyan-400" />
//                 <span className="font-medium">100% Secure</span>
//               </div>
//               <div className="flex items-center justify-center gap-3 text-white/90">
//                 <Clock className="w-5 h-5 text-cyan-400" />
//                 <span className="font-medium">Instant Setup</span>
//               </div>
//             </div>

//             {/* Email input + button */}
//             <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 max-w-xl mx-auto">
//               <div className="flex flex-col sm:flex-row items-center gap-3">
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
//                   disabled={isLoading}
//                 />
//                 <Button
//                   onClick={handleGetStarted}
//                   disabled={isLoading}
//                   className="px-6 py-5 text-lg whitespace-nowrap w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
//                 >
//                   Get Started <ArrowRight className="w-5 h-5 ml-2" />
//                 </Button>
//               </div>
//               <p className="text-sm text-white/60 mt-3 font-medium">
//                 🔐 Secure payment • 📋 Instant token delivery
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PLAN SELECTION MODAL */}
//       {showPlanModal && (
//         <>
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={() => setShowPlanModal(false)}></div>
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
//             <div className="relative max-w-5xl w-full pointer-events-auto my-8" onClick={(e) => e.stopPropagation()}>
//               <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
//                 <button onClick={() => setShowPlanModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors group">
//                   <X className="w-5 h-5 text-white/60 group-hover:text-white" />
//                 </button>

//                 <h2 className="text-3xl font-bold text-white text-center mb-3">Choose Your Plan</h2>
//                 <p className="text-white/70 text-center mb-8">Select the perfect plan for your needs</p>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {plans.map((plan) => (
//                     <div
//                       key={plan.id}
//                       className={`relative backdrop-blur-sm bg-white/5 rounded-xl p-6 border-2 transition-all cursor-pointer hover:scale-105 ${
//                         plan.popular ? 'border-cyan-400' : 'border-white/10 hover:border-white/30'
//                       }`}
//                       onClick={() => handlePlanSelect(plan.id as any)}
//                     >
//                       {plan.popular && (
//                         <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                           POPULAR
//                         </div>
//                       )}
                      
//                       <h3 className="font-bold text-xl text-white mb-2">{plan.name}</h3>
//                       <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                      
//                       <div className="mb-6">
//                         <span className="text-5xl font-bold text-cyan-400">${plan.price}</span>
//                       </div>

//                       <ul className="space-y-3 mb-6">
//                         {plan.features.map((feature, idx) => (
//                           <li key={idx} className="flex items-center gap-2 text-white/80 text-sm">
//                             <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
//                             <span>{feature}</span>
//                           </li>
//                         ))}
//                       </ul>

//                       <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
//                         Select Plan
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* PAYMENT PROCESSING MODAL */}
//       {showPaymentModal && (
//         <>
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"></div>
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//             <div className="relative max-w-md w-full pointer-events-auto">
//               <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
//                 <div className="flex justify-center mb-6">
//                   <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center animate-pulse">
//                     <CreditCard className="w-8 h-8 text-cyan-400" />
//                   </div>
//                 </div>

//                 <h2 className="text-2xl font-bold text-white text-center mb-4">
//                   {isLoading ? "Verifying Payment..." : "Processing Payment"}
//                 </h2>
//                 <p className="text-white/70 text-center mb-6">
//                   {isLoading 
//                     ? "Please wait while we confirm your payment..." 
//                     : "Complete your payment in the Flutterwave checkout window"
//                   }
//                 </p>

//                 <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/30 mb-6">
//                   <p className="text-white/80 text-sm text-center">
//                     If the payment window doesn't appear, please disable your popup blocker and try again.
//                   </p>
//                 </div>

//                 <Button 
//                   onClick={() => setShowPaymentModal(false)} 
//                   variant="outline"
//                   className="w-full border-white/20 text-white hover:bg-white/10"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* TOKEN SUCCESS MODAL */}
//       {showTokenModal && (
//         <>
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={closeTokenModal}></div>
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//             <div className="relative max-w-md w-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
//               <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
//                 <button onClick={closeTokenModal} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors group">
//                   <X className="w-5 h-5 text-white/60 group-hover:text-white" />
//                 </button>

//                 <div className="flex justify-center mb-6">
//                   <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center animate-pulse">
//                     <Check className="w-8 h-8 text-green-400" />
//                   </div>
//                 </div>

//                 <h2 className="text-3xl font-bold text-white text-center mb-2">Payment Successful!</h2>
//                 <p className="text-white/70 text-center mb-6">Your repair session is ready</p>

//                 <div className="bg-white/5 rounded-xl p-6 mb-6 border border-cyan-500/20">
//                   <p className="text-white/60 text-sm mb-3 font-medium">Service Token</p>
//                   <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/20">
//                     <code className="text-2xl font-mono font-bold text-cyan-400 tracking-widest break-all">{token}</code>
//                     <button onClick={copyToClipboard} className="p-2 hover:bg-cyan-500/20 rounded-lg transition-all flex-shrink-0">
//                       {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-cyan-400" />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
//                   <p className="text-white/60 text-sm mb-1">Valid Until</p>
//                   <p className="text-white font-mono text-sm">{new Date(expiresAt).toLocaleString()}</p>
//                 </div>

//                 <div className="bg-cyan-500/10 rounded-xl p-4 mb-6 border border-cyan-500/30">
//                   <p className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
//                     <span>📋</span> Next Steps:
//                   </p>
//                   <ol className="text-white/80 text-sm space-y-2 list-decimal list-inside">
//                     <li>Download the repair agent</li>
//                     <li>Run the application on your computer</li>
//                     <li>Enter your token to start the session</li>
//                   </ol>
//                 </div>

//                 <p className="text-white/50 text-xs text-center mt-6">
//                   💡 Keep your token safe. Don't share it with anyone.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* NOTIFICATION MODAL */}
//       {showNotification && notification && (
//         <>
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={closeNotification}></div>
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//             <div className="relative max-w-md w-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
//               <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
//                 <button onClick={closeNotification} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors group">
//                   <X className="w-5 h-5 text-white/60 group-hover:text-white" />
//                 </button>

//                 <div className="flex justify-center mb-6">
//                   <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center">
//                     <Bell className="w-8 h-8 text-cyan-400" />
//                   </div>
//                 </div>

//                 <h2 className="text-3xl font-bold text-white text-center mb-4">
//                   {notification.title}
//                 </h2>

//                 <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
//                   <p className="text-white/90 text-base leading-relaxed whitespace-pre-line">
//                     {notification.message}
//                   </p>
//                 </div>

//                 <p className="text-white/50 text-xs text-center mt-4">
//                   ✨ New feature • {new Date(notification.created_at).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };



























