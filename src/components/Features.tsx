
import { FileText, Upload, Download, Sparkles, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Content",
    description: "Our advanced AI analyzes your input and generates professional, tailored content that highlights your strengths and achievements."
  },
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from our curated library of modern, ATS-friendly resume templates designed by professional designers."
  },
  {
    icon: Upload,
    title: "Upload Custom Templates",
    description: "Bring your own design! Upload custom templates and let our AI intelligently populate them with your content."
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description: "Download your resume in PDF, DOCX, JPG, or get a plain text summary. Perfect for any application requirement."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate a complete professional resume in under 2 minutes. No more spending hours on formatting and content."
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description: "Your data is secure and private. We don't store your personal information longer than necessary."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose ResumeAI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining cutting-edge AI technology with beautiful design to create resumes that get you noticed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
