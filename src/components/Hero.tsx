import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-tech-repair.jpg";
import { Monitor, Zap, Shield, Clock } from "lucide-react";

export const Hero = () => {
  const handleStartSession = () => {
    // Open Skrill payment link in new tab
    window.open(
      "https://account.skrill.com/wallet/account/rq?key=9c_KtJIyKtruort51rQrINhHD4J",
      "_blank"
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-95"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-glow/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
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

            {/* Payment CTA */}
            <div className="tech-card rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleStartSession}
                className="px-8 py-6 text-lg"
              >
                Start $5 Repair Session
              </Button>
              <p className="text-sm text-white/60 mt-3">
                💳 Pay securely via Skrill • 🔐 No login needed • 📨 We'll email your service token within minutes
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