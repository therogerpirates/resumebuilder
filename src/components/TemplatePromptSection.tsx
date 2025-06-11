
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Briefcase, GraduationCap, User } from "lucide-react";

const templates = [
  { id: "modern", name: "Modern Professional", icon: FileText, description: "Clean and contemporary design" },
  { id: "classic", name: "Classic Executive", icon: Briefcase, description: "Traditional corporate style" },
  { id: "creative", name: "Creative Designer", icon: User, description: "Bold and artistic layout" },
  { id: "academic", name: "Academic Scholar", icon: GraduationCap, description: "Research-focused format" }
];

export const TemplatePromptSection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    education: "",
    skills: "",
    achievements: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    console.log("Template:", selectedTemplate);
    console.log("Form Data:", formData);
    // This will later integrate with LLM
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Section 1: Template Selection & Details
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose a template and provide your details for AI-powered resume generation
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Choose Template
              </CardTitle>
              <CardDescription>
                Select from our professional resume templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center gap-2">
                        <template.icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-muted-foreground">{template.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Personal Details Form */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Provide your basic contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experience and Details */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
            <CardDescription>
              Describe your experience, education, and skills for AI processing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="experience">Work Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="Describe your work experience, roles, responsibilities, and achievements..."
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                placeholder="Your educational background, degrees, certifications..."
                className="min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                placeholder="Technical skills, soft skills, programming languages, tools..."
                className="min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="achievements">Key Achievements</Label>
              <Textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) => handleInputChange("achievements", e.target.value)}
                placeholder="Awards, recognitions, notable projects, metrics..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            onClick={handleGenerate}
            disabled={!selectedTemplate || !formData.fullName}
            className="px-8"
          >
            Generate Resume with AI
          </Button>
        </div>
      </div>
    </section>
  );
};
