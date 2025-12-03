import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Monitor, Zap, Shield, Clock, Copy, Check, X, Bell, CreditCard, ArrowRight, FileText } from "lucide-react";

export const Hero = () => {
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "bundle" | "pro" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Modal states
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyType, setPolicyType] = useState<'terms' | 'privacy' | 'refund'>('terms');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notification, setNotification] = useState<{ id: string; title: string; message: string; created_at: string } | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const API_ENDPOINT = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Plan definitions
  const plans = [
    { 
      id: "basic", 
      name: "Save my PC now", 
      price: 29, 
      description: "1 repair • 24 hours",
      features: ["AI-powered diagnostics", "30 min automated repair", "15 min human support"]
    },
    { 
      id: "bundle", 
      name: "3 fixes bundle", 
      price: 59, 
      description: "3 repairs • 7 days",
      features: ["Everything in Basic", "3 repair sessions", "Priority support", "Valid for 7 days"],
      popular: true
    },
    { 
      id: "pro", 
      name: "IT dept kit", 
      price: 99, 
      description: "5 repairs • 30 days",
      features: ["Everything in Bundle", "5 repair sessions", "24/7 priority support", "Valid for 30 days"]
    }
  ];

  // Check if user has accepted terms on mount
  useEffect(() => {
    const accepted = localStorage.getItem('terms_accepted');
    if (!accepted) {
      setShowTermsModal(true);
    } else {
      setTermsAccepted(true);
    }
  }, []);

  // Check for payment success from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const txRef = urlParams.get('reference') || urlParams.get('tx_ref') || urlParams.get('transaction_id');
    // const txRef = urlParams.get('tx_ref') || urlParams.get('transaction_id');
    
    if (status === 'successful' && txRef) {
      console.log("✅ Payment redirect detected, verifying:", txRef);
      window.history.replaceState({}, '', window.location.pathname);
      setShowPaymentModal(true);
      checkPaymentStatus(txRef);
    } else if (status === 'cancelled') {
      console.log("❌ Payment cancelled");
      alert("❌ Payment was cancelled. Please try again.");
    }
  }, []);

  // Check for pending payment on mount - ONLY if we have email and selected plan
  useEffect(() => {
    const pendingTxRef = window.sessionStorage.getItem('pending_tx_ref');
    if (pendingTxRef && email && selectedPlan) {
      console.log("🔄 Found pending payment, verifying:", pendingTxRef);
      setShowPaymentModal(true);
      checkPaymentStatus(pendingTxRef);
    }
  }, []); // Empty dependency array to only run on mount

  // Fetch notification on mount
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/notifications`);
        const data = await response.json();
        
        if (data.id && !localStorage.getItem(`notification_seen_${data.id}`)) {
          setNotification(data);
          setShowNotification(true);
        }
      } catch (error) {
        console.error("Failed to fetch notification:", error);
      }
    };

    fetchNotification();
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem('terms_accepted', 'true');
    setTermsAccepted(true);
    setShowTermsModal(false);
  };

  const handleGetStarted = () => {
    if (!termsAccepted) {
      alert("⚠️ Please accept the Terms & Conditions to continue.");
      setShowTermsModal(true);
      return;
    }
    if (!email || !email.includes("@")) {
      alert("⚠️ Please enter a valid email address first.");
      return;
    }
    setShowPlanModal(true);
  };

  const handlePlanSelect = (planId: "basic" | "bundle" | "pro") => {
    if (!email || !email.includes("@")) {
      alert("⚠️ Please enter a valid email address first.");
      return;
    }
    setSelectedPlan(planId);
    setShowPlanModal(false);
    setShowPaymentModal(true);
  };

  const initializeFlutterwave = async () => {
    if (!selectedPlan || !email) return;

    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    try {
      console.log("🚀 Calling backend:", `${API_ENDPOINT}/create-checkout-session`);
      
      const response = await fetch(`${API_ENDPOINT}/create-checkout-session`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email,
          plan: selectedPlan,
          amount: plan.price,
        }),
      });

      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Backend error:", errorText);
        alert(`❌ Failed to initialize payment: ${response.status}`);
        setShowPaymentModal(false);
        return;
      }

      const data = await response.json();
      console.log("📦 Response data:", data);

      if (data.redirect_url && data.tx_ref) {
        const width = 500;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        const popup = window.open(
          data.redirect_url,
          'flutterwave-payment',
          `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
        );

        if (!popup) {
          alert("⚠️ Please allow popups for payment window");
          setShowPaymentModal(false);
          return;
        }

        window.sessionStorage.setItem('pending_tx_ref', data.tx_ref);
        
        const checkInterval = setInterval(() => {
          if (popup?.closed) {
            clearInterval(checkInterval);
            console.log("💳 Payment popup closed, verifying...");
            setTimeout(() => {
              checkPaymentStatus(data.tx_ref);
            }, 2000);
          }
        }, 1000);
      } else {
        alert(`❌ Failed to initialize payment: Invalid response`);
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.error("💥 Error initializing payment:", error);
      alert("❌ Payment setup failed. Please try again.");
      setShowPaymentModal(false);
    }
  };

  const checkPaymentStatus = async (txRef: string) => {
    try {
      setIsLoading(true);
      setShowPaymentModal(true);
      console.log("🔍 Verifying payment:", txRef);
      
      const response = await fetch(`${API_ENDPOINT}/verify-payment`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ tx_ref: txRef }),
      });

      console.log("📥 Verification response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Verification error:", errorText);
        alert("❌ Could not verify payment. Please contact support with reference: " + txRef);
        setShowPaymentModal(false);
        return;
      }

      const data = await response.json();
      console.log("✅ Verification result:", data);

      if (data.status === "successful" && data.token) {
        console.log("🎉 Payment verified! Token:", data.token);
        setToken(data.token);
        setExpiresAt(data.expires_at);
        setShowPaymentModal(false);
        setShowTokenModal(true);
        window.sessionStorage.removeItem('pending_tx_ref');
      } else if (data.status === "pending") {
        console.log("⏳ Payment still pending");
        alert("⏳ Payment is still processing. Please check your email for confirmation or contact support.");
        setShowPaymentModal(false);
      } else {
        console.log("❌ Payment not successful:", data.status);
        alert("❌ Payment was not completed. Please try again or contact support.");
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.error("💥 Error checking payment status:", error);
      alert("❌ Could not verify payment. Please contact support with your payment confirmation email.");
      setShowPaymentModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showPaymentModal && selectedPlan && email) {
      initializeFlutterwave();
    }
  }, [showPaymentModal, selectedPlan, email]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeTokenModal = () => {
    setShowTokenModal(false);
    setToken("");
    setExpiresAt("");
    setCopied(false);
    setSelectedPlan(null);
    setEmail("");
  };

  const closeNotification = () => {
    if (notification) {
      localStorage.setItem(`notification_seen_${notification.id}`, "true");
    }
    setShowNotification(false);
    setNotification(null);
  };

  const openPolicyModal = (type: 'terms' | 'privacy' | 'refund') => {
    setPolicyType(type);
    setShowPolicyModal(true);
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
Email: codepreneurs12@gmail.com
`
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
Email: codepreneurs12@gmail.com
`
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
- Email: codepreneurs12@gmail.com
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
- Contact us immediately at codepreneurs12@gmail.com
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
Email: codepreneurs12@gmail.com


Response time: Within 24 hours on business days`
        };
    }
  };

  const policyContent = getPolicyContent();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-95"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Monitor className="w-8 h-8 text-cyan-400 animate-pulse" />
              <span className="text-xl font-bold text-white/90 font-mono">TechFix Repair Agent</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI-Powered
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Tech Repair
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Fix software issues instantly with our intelligent AI agent. 
              Get automated repairs + expert human support.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center gap-3 text-white/90">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/90">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">100% Secure</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/90">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">Instant Setup</span>
              </div>
            </div>

            {/* Email input + button */}
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleGetStarted}
                  disabled={isLoading}
                  className="px-6 py-5 text-lg whitespace-nowrap w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-white/60 mt-3 font-medium">
                🔐 Secure payment • 📋 Instant token delivery
              </p>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-white/50">
                <button onClick={() => openPolicyModal('terms')} className="hover:text-white/80 transition-colors underline">
                  Terms & Conditions
                </button>
                <span>•</span>
                <button onClick={() => openPolicyModal('privacy')} className="hover:text-white/80 transition-colors underline">
                  Privacy Policy
                </button>
                <span>•</span>
                <button onClick={() => openPolicyModal('refund')} className="hover:text-white/80 transition-colors underline">
                  Refund Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INITIAL TERMS ACCEPTANCE MODAL */}
      {showTermsModal && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <div className="relative max-w-3xl w-full pointer-events-auto my-8" onClick={(e) => e.stopPropagation()}>
              <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white text-center mb-4">Welcome to TechFix</h2>
                <p className="text-white/70 text-center mb-6">Please review and accept our Terms & Conditions to continue</p>

                <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10 max-h-96 overflow-y-auto">
                  <pre className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {getPolicyContent().content}
                  </pre>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAcceptTerms}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-6"
                  >
                    ✓ I Accept Terms & Conditions
                  </Button>
                </div>

                <p className="text-white/50 text-xs text-center mt-4">
                  By accepting, you agree to our Terms, Privacy Policy, and Refund Policy
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* POLICY MODAL (for footer links) */}
      {showPolicyModal && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={() => setShowPolicyModal(false)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <div className="relative max-w-3xl w-full pointer-events-auto my-8" onClick={(e) => e.stopPropagation()}>
              <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
                <button onClick={() => setShowPolicyModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors group">
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

                <Button 
                  onClick={() => setShowPolicyModal(false)} 
                  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* PLAN SELECTION MODAL */}
      {showPlanModal && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={() => setShowPlanModal(false)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <div className="relative max-w-5xl w-full pointer-events-auto my-8" onClick={(e) => e.stopPropagation()}>
              <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
                <button onClick={() => setShowPlanModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors group">
                  <X className="w-5 h-5 text-white/60 group-hover:text-white" />
                </button>

                <h2 className="text-3xl font-bold text-white text-center mb-3">Choose Your Plan</h2>
                <p className="text-white/70 text-center mb-8">Select the perfect plan for your needs</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative backdrop-blur-sm bg-white/5 rounded-xl p-6 border-2 transition-all cursor-pointer hover:scale-105 ${
                        plan.popular ? 'border-cyan-400' : 'border-white/10 hover:border-white/30'
                      }`}
                      onClick={() => handlePlanSelect(plan.id as any)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          POPULAR
                        </div>
                      )}
                      
                      <h3 className="font-bold text-xl text-white mb-2">{plan.name}</h3>
                      <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                      
                      <div className="mb-6">
                        <span className="text-5xl font-bold text-cyan-400">${plan.price}</span>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                            <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                        Select Plan
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* PAYMENT PROCESSING MODAL */}
      {showPaymentModal && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <div className="relative max-w-md w-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center animate-pulse">
                    <CreditCard className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white text-center mb-4">
                  {isLoading ? "Verifying Payment..." : "Processing Payment"}
                </h2>
                <p className="text-white/70 text-center mb-6">
                  {isLoading 
                    ? "Please wait while we confirm your payment..." 
                    : "Complete your payment in the Flutterwave checkout window"
                  }
                </p>

                <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/30 mb-6">
                  <p className="text-white/80 text-sm text-center">
                    If the payment window doesn't appear, please disable your popup blocker and try again.
                  </p>
                </div>

                <Button 
                  onClick={() => setShowPaymentModal(false)} 
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* TOKEN SUCCESS MODAL */}
      {showTokenModal && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={closeTokenModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="relative max-w-md w-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
                <button onClick={closeTokenModal} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors group">
                  <X className="w-5 h-5 text-white/60 group-hover:text-white" />
                </button>

                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center animate-pulse">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white text-center mb-2">Payment Successful!</h2>
                <p className="text-white/70 text-center mb-6">Your repair session is ready</p>

                <div className="bg-white/5 rounded-xl p-6 mb-6 border border-cyan-500/20">
                  <p className="text-white/60 text-sm mb-3 font-medium">Service Token</p>
                  <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/20">
                    <code className="text-2xl font-mono font-bold text-cyan-400 tracking-widest break-all">{token}</code>
                    <button onClick={copyToClipboard} className="p-2 hover:bg-cyan-500/20 rounded-lg transition-all flex-shrink-0">
                      {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-cyan-400" />}
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Valid Until</p>
                  <p className="text-white font-mono text-sm">{new Date(expiresAt).toLocaleString()}</p>
                </div>

                <div className="bg-cyan-500/10 rounded-xl p-4 mb-6 border border-cyan-500/30">
                  <p className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                    <span>📋</span> Next Steps:
                  </p>
                  <ol className="text-white/80 text-sm space-y-2 list-decimal list-inside">
                    <li>Download the repair agent</li>
                    <li>Run the application on your computer</li>
                    <li>Enter your token to start the session</li>
                  </ol>
                </div>

                <p className="text-white/50 text-xs text-center mt-6">
                  💡 Keep your token safe. Don't share it with anyone.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* NOTIFICATION MODAL */}
      {showNotification && notification && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={closeNotification}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="relative max-w-md w-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <div className="backdrop-blur-md bg-slate-900/95 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
                <button onClick={closeNotification} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors group">
                  <X className="w-5 h-5 text-white/60 group-hover:text-white" />
                </button>

                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center">
                    <Bell className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white text-center mb-4">
                  {notification.title}
                </h2>

                <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
                  <p className="text-white/90 text-base leading-relaxed whitespace-pre-line">
                    {notification.message}
                  </p>
                </div>

                <p className="text-white/50 text-xs text-center mt-4">
                  ✨ New feature • {new Date(notification.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


















