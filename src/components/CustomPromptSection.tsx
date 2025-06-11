
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, Wand2, Download } from "lucide-react";

export const CustomPromptSection = () => {
  const [uploadedTemplate, setUploadedTemplate] = useState<File | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [templateName, setTemplateName] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedTemplate(file);
      setTemplateName(file.name);
    }
  };

  const handleCustomGenerate = () => {
    console.log("Custom Template:", uploadedTemplate);
    console.log("Custom Prompt:", customPrompt);
    // This will later integrate with LLM and template parsing
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Section 2: Custom Template & Prompt
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload your own template and customize the AI prompt for personalized resume generation
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Template Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Template
              </CardTitle>
              <CardDescription>
                Upload your custom resume template (PDF, DOCX, or image formats)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Choose files or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, JPG, PNG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.jpg,.jpeg,.png"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                {uploadedTemplate && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Upload className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{templateName}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Template Preview/Info */}
          <Card>
            <CardHeader>
              <CardTitle>Template Information</CardTitle>
              <CardDescription>
                AI will analyze and map your template structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedTemplate ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">File:</span>
                      <span className="text-muted-foreground">{uploadedTemplate.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Size:</span>
                      <span className="text-muted-foreground">
                        {(uploadedTemplate.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Type:</span>
                      <span className="text-muted-foreground">{uploadedTemplate.type}</span>
                    </div>
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm text-primary">
                        ✓ Template uploaded successfully! AI will parse the structure and identify fillable fields.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Upload a template to see analysis
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Prompt Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Custom AI Prompt
            </CardTitle>
            <CardDescription>
              Customize how AI should generate and fill your resume content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="customPrompt">AI Generation Prompt</Label>
                <Textarea
                  id="customPrompt"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Example: Create a professional resume for a senior software engineer with 5+ years experience in React and Node.js. Focus on leadership skills, technical achievements, and make it sound impressive for FAANG companies. Use action verbs and quantify achievements where possible..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="p-4">
                  <div className="text-sm font-medium mb-2">Tone Suggestion</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCustomPrompt(prev => prev + " Make it professional and confident.")}
                    className="w-full text-xs"
                  >
                    Professional & Confident
                  </Button>
                </Card>
                <Card className="p-4">
                  <div className="text-sm font-medium mb-2">Focus Area</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCustomPrompt(prev => prev + " Emphasize technical skills and achievements.")}
                    className="w-full text-xs"
                  >
                    Technical Skills
                  </Button>
                </Card>
                <Card className="p-4">
                  <div className="text-sm font-medium mb-2">Industry Style</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCustomPrompt(prev => prev + " Optimize for tech industry standards.")}
                    className="w-full text-xs"
                  >
                    Tech Industry
                  </Button>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            onClick={handleCustomGenerate}
            disabled={!uploadedTemplate || !customPrompt.trim()}
            className="px-8"
          >
            <Wand2 className="mr-2 h-5 w-5" />
            Generate Custom Resume
          </Button>
        </div>
      </div>
    </section>
  );
};
