
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-16 text-center border border-border">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Ready to Transform Your Career?
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Building Your Perfect Resume Today
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs with AI-powered resumes. 
            Try it free - no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              See Example Resumes
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            3 free resume generations • No credit card required • Instant access
          </p>
        </div>
      </div>
    </section>
  );
};
