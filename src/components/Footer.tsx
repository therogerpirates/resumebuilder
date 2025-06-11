
import { FileText, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 py-16 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ResumeAI</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transform your career story into a polished resume with AI-powered content generation 
              and professional templates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="#" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Templates</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Examples</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 ResumeAI. All rights reserved. Built with ❤️ for job seekers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
