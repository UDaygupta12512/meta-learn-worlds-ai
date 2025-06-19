
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Brain, Zap, BookOpen, Target } from "lucide-react";
import { toast } from "sonner";

interface WorldGeneratorProps {
  onWorldGenerated: (world: any) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

export const WorldGenerator = ({ onWorldGenerated, isGenerating, setIsGenerating }: WorldGeneratorProps) => {
  const [topic, setTopic] = useState("");
  const [ageGroup, setAgeGroup] = useState("middle-school");
  const [complexity, setComplexity] = useState("intermediate");

  const generateWorld = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic to explore!");
      return;
    }

    setIsGenerating(true);
    
    // Enhanced AI world generation simulation
    setTimeout(() => {
      const generatedWorld = {
        id: Date.now(),
        topic: topic,
        ageGroup: ageGroup,
        complexity: complexity,
        title: `${topic} - Interactive Learning World`,
        description: generateDescription(topic, ageGroup),
        objects: generateEnhancedSceneObjects(topic),
        narration: generateNarration(topic, ageGroup),
        learningObjectives: generateLearningObjectives(topic, ageGroup),
        generatedAt: new Date().toISOString()
      };

      onWorldGenerated(generatedWorld);
      setIsGenerating(false);
      toast.success(`🚀 Generated immersive "${topic}" learning world!`, {
        description: "Ready to explore your personalized 3D environment"
      });
    }, 3500);
  };

  const generateDescription = (topic: string, ageGroup: string) => {
    const ageDescriptions = {
      'elementary': 'a fun and colorful',
      'middle-school': 'an engaging and interactive',
      'high-school': 'a detailed and comprehensive',
      'college': 'an advanced and research-focused'
    };
    
    return `Explore ${topic} through ${ageDescriptions[ageGroup as keyof typeof ageDescriptions]} 3D environment. Navigate through interactive objects, discover key concepts, and deepen your understanding through immersive visualization.`;
  };

  const generateNarration = (topic: string, ageGroup: string) => {
    return `Welcome to your ${topic} learning world! I'm your AI guide, and together we'll explore this fascinating concept step by step. Each object you see has been carefully designed to help you understand the core principles. Let's begin this incredible journey of discovery!`;
  };

  const generateLearningObjectives = (topic: string, ageGroup: string) => {
    const topicLower = topic.toLowerCase();
    const objectives = [];
    
    if (topicLower.includes('solar') || topicLower.includes('planet')) {
      objectives.push(
        "Understand the relative sizes and distances of planets",
        "Learn about gravitational forces and orbital mechanics",
        "Explore the unique characteristics of each celestial body"
      );
    } else if (topicLower.includes('atom') || topicLower.includes('molecular')) {
      objectives.push(
        "Visualize atomic structure and electron behavior",
        "Understanding chemical bonding and molecular formation",
        "Explore quantum mechanical principles"
      );
    } else {
      objectives.push(
        `Master the fundamental concepts of ${topic}`,
        "Apply knowledge through interactive exploration",
        "Connect theoretical understanding to practical applications"
      );
    }
    
    return objectives;
  };

  const generateEnhancedSceneObjects = (topic: string) => {
    const objects = [];
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('solar') || topicLower.includes('planet')) {
      objects.push(
        { 
          type: 'sphere', 
          name: 'Sun', 
          position: [0, 0, 0], 
          color: '#FFA500', 
          scale: 2.5,
          description: 'The massive star at the center of our solar system, providing heat and light through nuclear fusion.'
        },
        { 
          type: 'sphere', 
          name: 'Earth', 
          position: [6, 0, 0], 
          color: '#4A90E2', 
          scale: 1,
          description: 'Our home planet, the only known world with life, featuring oceans, continents, and a protective atmosphere.'
        },
        { 
          type: 'sphere', 
          name: 'Mars', 
          position: [9, 0, 3], 
          color: '#CD5C5C', 
          scale: 0.7,
          description: 'The Red Planet, a cold desert world with the largest volcano in the solar system and evidence of ancient water.'
        },
        { 
          type: 'sphere', 
          name: 'Jupiter', 
          position: [15, 0, -2], 
          color: '#D2691E', 
          scale: 2,
          description: 'The largest planet, a gas giant with a Great Red Spot storm and over 80 moons including the four Galilean moons.'
        }
      );
    } else if (topicLower.includes('atom') || topicLower.includes('molecular')) {
      objects.push(
        { 
          type: 'sphere', 
          name: 'Nucleus', 
          position: [0, 0, 0], 
          color: '#FF4444', 
          scale: 1.2,
          description: 'The dense core of the atom containing protons and neutrons, where 99.9% of the atom\'s mass is concentrated.'
        },
        { 
          type: 'sphere', 
          name: 'Electron Cloud', 
          position: [3, 0, 0], 
          color: '#44FF44', 
          scale: 0.4,
          description: 'Regions of space where electrons are most likely to be found, forming orbitals around the nucleus.'
        },
        { 
          type: 'sphere', 
          name: 'Valence Shell', 
          position: [-3, 0, 0], 
          color: '#4444FF', 
          scale: 0.4,
          description: 'The outermost electron shell that determines chemical bonding and reactivity of the atom.'
        },
        { 
          type: 'sphere', 
          name: 'Ion Formation', 
          position: [0, 3, 0], 
          color: '#FF44FF', 
          scale: 0.6,
          description: 'The process of gaining or losing electrons to form charged particles called ions.'
        }
      );
    } else if (topicLower.includes('dna') || topicLower.includes('genetic')) {
      objects.push(
        { 
          type: 'helix', 
          name: 'Double Helix', 
          position: [0, 0, 0], 
          color: '#00FF88', 
          scale: 1.5,
          description: 'The twisted ladder structure of DNA, consisting of two complementary strands held together by base pairs.'
        },
        { 
          type: 'sphere', 
          name: 'Nucleotide', 
          position: [3, 1, 0], 
          color: '#FF8800', 
          scale: 0.6,
          description: 'Building blocks of DNA consisting of a phosphate group, sugar, and one of four nitrogenous bases.'
        },
        { 
          type: 'sphere', 
          name: 'RNA Polymerase', 
          position: [-2, 2, 1], 
          color: '#8800FF', 
          scale: 0.8,
          description: 'The enzyme responsible for transcribing DNA into RNA during gene expression.'
        }
      );
    } else {
      // Default enhanced abstract representation
      objects.push(
        { 
          type: 'box', 
          name: 'Core Concept', 
          position: [-3, 0, 0], 
          color: '#6366F1', 
          scale: 1.2,
          description: `The fundamental principle underlying ${topic} that connects all related concepts.`
        },
        { 
          type: 'sphere', 
          name: 'Key Process', 
          position: [0, 0, 0], 
          color: '#8B5CF6', 
          scale: 1.4,
          description: `The central mechanism or process that drives ${topic} in real-world applications.`
        },
        { 
          type: 'box', 
          name: 'Application', 
          position: [3, 0, 0], 
          color: '#06B6D4', 
          scale: 1.1,
          description: `Practical applications and real-world examples of ${topic} in action.`
        },
        { 
          type: 'sphere', 
          name: 'Future Impact', 
          position: [0, 3, 0], 
          color: '#10B981', 
          scale: 1,
          description: `Emerging developments and future possibilities in the field of ${topic}.`
        }
      );
    }
    
    return objects;
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="flex items-center text-white text-xl">
          <div className="relative mr-3">
            <Brain className="w-6 h-6 text-cyan-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          AI World Generator
        </CardTitle>
        <p className="text-cyan-100/80 text-sm mt-2">
          Transform any topic into an immersive 3D learning experience powered by advanced AI
        </p>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-3">
          <Label htmlFor="topic" className="text-gray-200 font-medium flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-cyan-400" />
            Learning Topic
          </Label>
          <Input
            id="topic"
            placeholder="e.g., Solar System, Photosynthesis, DNA Structure, Climate Change..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:ring-cyan-400/20 transition-all duration-200"
            disabled={isGenerating}
          />
          <p className="text-xs text-gray-400 flex items-center">
            <Target className="w-3 h-3 mr-1" />
            Be specific for more detailed and accurate 3D worlds
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="text-gray-200 font-medium">Age Group</Label>
            <Select value={ageGroup} onValueChange={setAgeGroup} disabled={isGenerating}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white focus:border-cyan-400/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/20">
                <SelectItem value="elementary">Elementary (K-5)</SelectItem>
                <SelectItem value="middle-school">Middle School (6-8)</SelectItem>
                <SelectItem value="high-school">High School (9-12)</SelectItem>
                <SelectItem value="college">College/Adult</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-200 font-medium">Complexity Level</Label>
            <Select value={complexity} onValueChange={setComplexity} disabled={isGenerating}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white focus:border-cyan-400/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/20">
                <SelectItem value="basic">Basic Overview</SelectItem>
                <SelectItem value="intermediate">Detailed Exploration</SelectItem>
                <SelectItem value="advanced">Advanced Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={generateWorld}
          disabled={isGenerating || !topic.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Generating Your World...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-3" />
              Generate 3D Learning World
            </>
          )}
        </Button>

        {isGenerating && (
          <div className="text-center space-y-4 py-4">
            <div className="flex items-center justify-center space-x-3">
              <Sparkles className="w-5 h-5 animate-pulse text-cyan-400" />
              <span className="text-cyan-100">AI is analyzing your topic and crafting the perfect learning experience...</span>
            </div>
            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 h-2 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs text-gray-400">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                Analyzing Topic
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                Creating Objects
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                Building World
              </div>
            </div>
          </div>
        )}

        {!isGenerating && (
          <div className="bg-black/20 rounded-lg p-4 border border-cyan-500/20">
            <h4 className="text-cyan-300 font-medium mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              What You'll Get:
            </h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                Interactive 3D objects with detailed explanations
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                Age-appropriate content and complexity
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                Immersive learning environment with guided exploration
              </li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
