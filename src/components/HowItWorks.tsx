import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Download, Terminal, Bot, Users } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: CreditCard,
      step: "01",
      title: "Pay & Get Token",
      description: "Enter your email and pay to generate your unique 8-digit service token (e.g., ABCD-EFGH). Valid for 45 minutes.",
      color: "bg-gradient-to-br from-primary/20 to-primary/10"
    },
    {
      icon: Download,
      step: "02", 
      title: "Download Agent",
      description: "Download our lightweight agent for Linux (.AppImage) or Windows (.exe). No installation required - just double-click to run.",
      color: "bg-gradient-to-br from-accent/20 to-accent/10"
    },
    {
      icon: Terminal,
      step: "03",
      title: "Run & Authenticate",
      description: "Launch the agent and enter your service token, email, and describe your tech issue. The AI will start analyzing immediately.",
      color: "bg-gradient-to-br from-primary/20 to-primary/10"
    },
    {
      icon: Bot,
      step: "04",
      title: "AI Repair Process",
      description: "Our AI automatically detects and fixes common issues. Every action requires your approval via UAC/sudo prompts for maximum security.",
      color: "bg-gradient-to-br from-accent/20 to-accent/10"
    },
    {
      icon: Users,
      step: "05",
      title: "Human Expert (If Needed)",
      description: "If the AI can't resolve the issue, we'll guide you to open AnyDesk Remote Desktop for direct expert assistance.",
      color: "bg-gradient-to-br from-primary/20 to-primary/10"
    }
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple 5-Step Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From payment to solution in minutes. Our streamlined process ensures 
            you get help fast without any complexity.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="tech-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group relative">
              {/* Step connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/50 to-accent/50 z-10"></div>
              )}
              
              <CardHeader className="pb-4 text-center">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-2">STEP {step.step}</div>
                <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
