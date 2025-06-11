
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap } from "lucide-react";

const plans = [
  {
    name: "Free Trial",
    price: "₹0",
    period: "3 trials",
    description: "Perfect for trying out our platform",
    features: [
      "3 resume generations",
      "5 downloads total",
      "10 editable fields per resume",
      "Basic templates",
      "PDF export"
    ],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Single Resume",
    price: "₹55",
    period: "one-time",
    description: "Ideal for quick resume updates",
    features: [
      "1 resume generation",
      "10 editable fields",
      "5 downloads",
      "All templates",
      "PDF, DOCX, JPG export",
      "AI content optimization"
    ],
    popular: false,
    cta: "Get Started"
  },
  {
    name: "Pro Package",
    price: "₹100",
    period: "one-time",
    description: "Best value for job seekers",
    features: [
      "3 resume generations",
      "20 editable fields per resume",
      "Unlimited downloads",
      "All templates + custom upload",
      "All export formats",
      "Priority AI processing",
      "Resume analysis & tips"
    ],
    popular: true,
    cta: "Go Pro"
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no monthly subscriptions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-card border rounded-lg p-8 ${plan.popular ? 'border-primary shadow-lg' : 'border-border'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Crown className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">/ {plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className={`w-full ${plan.popular ? '' : 'variant-outline'}`}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
