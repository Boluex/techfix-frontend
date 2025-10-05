import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, Shield, Zap, Clock, CheckCircle } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-First Approach",
      description: "Our intelligent AI agent automatically diagnoses and fixes common software issues without human intervention.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Expert Backup",
      description: "If AI can't solve it, connect with our certified technicians via Chrome Remote Desktop for personalized help.",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Every action requires your approval. UAC/sudo prompts ensure complete control over your system.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Most issues resolved in minutes. No waiting in queues or scheduling appointments.",
      color: "text-accent"
    },
    {
      icon: Clock,
      title: "45-Minute Sessions",
      description: "30 minutes of AI repair + 15 minutes of human expert support. Fair pricing at just $5 per session.",
      color: "text-primary"
    },
    {
      icon: CheckCircle,
      title: "No Installation Hassle",
      description: "No need to install Ollama, Python, or any dependencies. Everything works out of the box.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How TechFix AI Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our advanced AI system combined with expert human support provides the most effective 
            tech repair solution available today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="tech-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};