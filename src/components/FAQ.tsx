import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "Do I need to install Ollama, Python, or other dependencies?",
      answer: "No! Everything is handled securely by our AI agent. You don't need to install any additional software, programming languages, or dependencies. Just download our lightweight agent and run it."
    },
    {
      question: "Is my computer safe during the repair process?",
      answer: "Absolutely. Your security is our top priority. Every action our AI agent wants to perform requires your explicit approval through UAC (Windows) or sudo (Linux) prompts. You maintain complete control over your system at all times."
    },
    {
      question: "When do I need to use AnyDesk?",
      answer: "Only if our AI can't automatically resolve your issue within the 30-minute AI session. In such cases, we'll guide you through opening AnyDesk Remote Desktop so our human experts can provide direct assistance during the remaining minutes."
    },
    {
      question: "What types of issues can TechFix AI resolve?",
      answer: "Our AI specializes in software-related issues including system errors, application crashes, performance problems, configuration issues, driver problems,application issues, and software conflicts. We handle both Windows and Linux systems effectively."
    },
    {
      question: "How does the 45-minute session work?",
      answer: "You get 30 minutes of automated AI repair followed by up to 15 minutes of human expert support if needed. The session timer starts when you launch the agent and enter your token. Most issues are resolved within the first 30 minutes."
    },
    {
      question: "What happens if the issue isn't resolved in 45 minutes?",
      answer: "If we can't resolve your issue within the session time, we'll provide you with detailed diagnostic information and recommendations for next steps. We also offer follow-up sessions at a discounted rate for complex multi-session issues."
    },
    {
      question: "Is my data private and secure?",
      answer: "Yes. We follow strict privacy protocols. No personal data is stored without your explicit consent. Our agent only accesses system diagnostic information necessary for repairs, and all connections are encrypted. You can review and approve all actions."
    },
    {
      question: "Can I use TechFix AI on multiple computers?",
      answer: "Each session token is valid for one computer and one 45-minute session. If you need help with multiple computers, you'll need separate tokens for each system. However, you can use the same email address for multiple sessions."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We stand behind our service. If we can't make meaningful progress on your issue during the session, kindly send us a feedback. Our goal is to solve your tech problems efficiently and effectively."
    },
    {
      question: "Do you support macOS?",
      answer: "Currently, TechFix AI supports Windows and Linux systems. macOS support is in development and will be available in a future update. Subscribe to our newsletter to be notified when macOS support launches."
    }
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Got questions? We've got answers. Here are the most common questions 
            about TechFix AI and how our service works.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="tech-card border-border/50 rounded-xl px-6 hover:border-primary/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
