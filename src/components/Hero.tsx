
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Sparkles className="h-4 w-4 mr-2" />
          AI-Powered Resume Generation
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Create Professional Resumes
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            in Minutes with AI
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transform your career story into a polished resume. Use our smart templates or upload your own. 
          Our AI does the heavy lifting while you focus on landing your dream job.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="px-8">
            Start Building for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            Watch Demo
          </Button>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-border">
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted/60 rounded w-full"></div>
                    <div className="h-3 bg-muted/60 rounded w-5/6"></div>
                    <div className="h-3 bg-muted/60 rounded w-4/5"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-primary/20 rounded w-2/3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted/60 rounded w-full"></div>
                    <div className="h-3 bg-muted/60 rounded w-3/4"></div>
                  </div>
                  <div className="h-4 bg-primary/20 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted/60 rounded w-5/6"></div>
                    <div className="h-3 bg-muted/60 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};
