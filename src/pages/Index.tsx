
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { TemplatePromptSection } from "@/components/TemplatePromptSection";
import { CustomPromptSection } from "@/components/CustomPromptSection";
import { Pricing } from "@/components/Pricing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <TemplatePromptSection />
      <CustomPromptSection />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
