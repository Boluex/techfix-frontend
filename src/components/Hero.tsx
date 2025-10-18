import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-tech-repair.jpg";
import { Monitor, Zap, Shield, Clock, Copy, Check, X } from "lucide-react";

export const Hero = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [copied, setCopied] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);

  const handleStartSession = async () => {
    if (!email || !email.includes("@")) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("https://techfixai-backend.onrender.com/generate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          issue: "",
          minutes: 30,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        setExpiresAt(data.expires_at);
        setShowTokenModal(true);
        setEmail("");
      } else {
        alert(`❌ Failed to generate token: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error generating token:", error);
      alert("❌ Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setShowTokenModal(false);
    setToken("");
    setExpiresAt("");
    setCopied(false);
  };

  // Token Modal
  if (showTokenModal) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 hero-gradient opacity-95"></div>

        {/* Modal Overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>

        {/* Modal Content */}
        <div className="relative z-50 container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="tech-card rounded-2xl p-8 backdrop-blur-sm border border-accent/30 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded transition"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center">
                  <Check className="w-8 h-8 text-accent" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                ✅ Token Generated!
              </h2>
              <p className="text-white/70 text-center mb-6">
                Your repair session is ready to begin
              </p>

              {/* Token Display */}
              <div className="bg-white/5 rounded-lg p-6 mb-6 border border-accent/20">
                <p className="text-white/60 text-sm mb-3">Service Token</p>
                <div className="flex items-center justify-between gap-3 bg-white/5 rounded p-4 border border-accent/10">
                  <code className="text-2xl font-mono font-bold text-accent tracking-widest">
                    {token}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-accent/20 rounded transition flex-shrink-0"
                    title="Copy token"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-accent" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expiration */}
              <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                <p className="text-white/60 text-sm mb-1">Valid Until</p>
                <p className="text-white font-mono text-sm">
                  {new Date(expiresAt).toLocaleString()}
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-accent/10 rounded-lg p-4 mb-6 border border-accent/30">
                <p className="text-white text-sm font-medium mb-2">📋 Next Steps:</p>
                <ol className="text-white/80 text-sm space-y-1 list-decimal list-inside">
                  <li>Download the repair agent</li>
                  <li>Run the application</li>
                  <li>Enter your token</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    window.location.href = "https://techfix-frontend-nc49.onrender.com/download";
                  }}
                >
                  📥 Download Repair Agent
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-white border-white/30 hover:bg-white/10"
                  onClick={closeModal}
                >
                  Generate Another Token
                </Button>
              </div>

              {/* Note */}
              <p className="text-white/60 text-xs text-center mt-4">
                💡 Keep your token safe. Don't share it with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original form view
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-95"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-glow/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Monitor className="w-8 h-8 text-accent animate-pulse" />
              <span className="text-xl font-bold text-white/90 font-mono">TechFix AI</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI-Powered
              <br />
              <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                Tech Repair
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              Fix software issues instantly with our intelligent AI agent. 
              Get 30 minutes of automated repairs + 15 minutes of expert human support.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 text-white/90">
                <Zap className="w-5 h-5 text-accent" />
                <span className="font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Shield className="w-5 h-5 text-accent" />
                <span className="font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Clock className="w-5 h-5 text-accent" />
                <span className="font-medium">45 Min Session</span>
              </div>
            </div>

            {/* Email input + button */}
            <div className="tech-card rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleStartSession()}
                  className="flex-1 bg-white/10 text-white placeholder-white/60"
                  disabled={isLoading}
                />
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleStartSession}
                  disabled={isLoading}
                  className="px-6 py-5 text-lg whitespace-nowrap"
                >
                  {isLoading ? "Generating..." : "Get Token"}
                </Button>
              </div>
              <p className="text-sm text-white/60 mt-3">
                🔐 Instant token • 📋 Copy and save
              </p>
            </div>
          </div>

          {/* Right side - Hero Image */}
          <div className="relative">
            <div className="relative">
              <img
                src={heroImage}
                alt="AI Tech Repair Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl animate-float tech-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};















































// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import heroImage from "@/assets/hero-tech-repair.jpg";
// import { Monitor, Zap, Shield, Clock } from "lucide-react";

// export const Hero = () => {
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleStartSession = async () => {
//     if (!email || !email.includes("@")) {
//       alert("⚠️ Please enter a valid email address.");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const response = await fetch("https://techfixai-backend.onrender.com/generate-token", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           issue: "",
//           minutes: 30,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.token) {
//         alert(`✅ An 8-digit token has been sent to your Gmail: ${email}`);
//         setEmail("");
//       } else {
//         alert(`❌ Failed to generate token: ${data.error || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Error generating token:", error);
//       alert("❌ Something went wrong. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 hero-gradient opacity-95"></div>

//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-primary-glow/10 rounded-full blur-3xl animate-float"></div>
//         <div
//           className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
//           style={{ animationDelay: "2s" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-float"
//           style={{ animationDelay: "4s" }}
//         ></div>
//       </div>

//       <div className="container mx-auto px-6 py-20 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left side - Content */}
//           <div className="text-center lg:text-left">
//             <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
//               <Monitor className="w-8 h-8 text-accent animate-pulse" />
//               <span className="text-xl font-bold text-white/90 font-mono">TechFix AI</span>
//             </div>

//             <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//               AI-Powered
//               <br />
//               <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
//                 Tech Repair
//               </span>
//             </h1>

//             <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
//               Fix software issues instantly with our intelligent AI agent. 
//               Get 30 minutes of automated repairs + 15 minutes of expert human support.
//             </p>

//             {/* Features */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//               <div className="flex items-center gap-3 text-white/90">
//                 <Zap className="w-5 h-5 text-accent" />
//                 <span className="font-medium">AI-Powered</span>
//               </div>
//               <div className="flex items-center gap-3 text-white/90">
//                 <Shield className="w-5 h-5 text-accent" />
//                 <span className="font-medium">100% Secure</span>
//               </div>
//               <div className="flex items-center gap-3 text-white/90">
//                 <Clock className="w-5 h-5 text-accent" />
//                 <span className="font-medium">45 Min Session</span>
//               </div>
//             </div>

//             {/* Email input + button */}
//             <div className="tech-card rounded-2xl p-6 backdrop-blur-sm border border-white/10">
//               <div className="flex flex-col sm:flex-row items-center gap-3">
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="flex-1 bg-white/10 text-white placeholder-white/60"
//                 />
//                 <Button
//                   variant="hero"
//                   size="lg"
//                   onClick={handleStartSession}
//                   disabled={isLoading}
//                   className="px-6 py-5 text-lg whitespace-nowrap"
//                 >
//                   {isLoading ? "Processing..." : "Start Free Session"}
//                 </Button>
//               </div>
//               <p className="text-sm text-white/60 mt-3">
//                  🔐 No login needed • 📨 You’ll receive your service token instantly
//               </p>
//             </div>
//           </div>

//           {/* Right side - Hero Image */}
//           <div className="relative">
//             <div className="relative">
//               <img
//                 src={heroImage}
//                 alt="AI Tech Repair Dashboard"
//                 className="w-full h-auto rounded-2xl shadow-2xl animate-float tech-glow"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
