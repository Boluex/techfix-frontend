import { Monitor } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">TechFix AI</div>
              <div className="text-sm text-muted-foreground">AI-Powered Tech Repair</div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 TechFix AI. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Secure • Fast • Reliable Tech Support
            </p>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TechFix AI uses advanced artificial intelligence combined with expert human support 
            to provide fast, secure, and reliable tech repair services. Your privacy and security 
            are our top priorities.
          </p>
        </div>
      </div>
    </footer>
  );
};