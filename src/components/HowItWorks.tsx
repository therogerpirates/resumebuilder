import { FileText, Upload, MessageSquare, Download, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Choose Template",
    description: "Select from our professional templates or upload your own custom design."
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Input Your Details",
    description: "Tell our AI about your experience, skills, and achievements through simple prompts."
  },
  {
    step: "03",
    icon: Sparkles,
    title: "AI Generation",
    description: "Our AI intelligently generates and formats your content to match your chosen template."
  },
  {
    step: "04",
    icon: Download,
    title: "Export & Download",
    description: "Download your polished resume in your preferred format - PDF, DOCX, JPG, or text."
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to create your perfect resume. No design skills required.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-sm font-bold text-primary mb-2">STEP {step.step}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
