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
    
    if (topicLower.includes('solar') || topicLower.includes('planet') || topicLower.includes('space')) {
      objectives.push(
        "Understand the relative sizes and distances of planets",
        "Learn about gravitational forces and orbital mechanics",
        "Explore the unique characteristics of each celestial body"
      );
    } else if (topicLower.includes('atom') || topicLower.includes('molecular') || topicLower.includes('chemistry')) {
      objectives.push(
        "Visualize atomic structure and electron behavior",
        "Understanding chemical bonding and molecular formation",
        "Explore quantum mechanical principles"
      );
    } else if (topicLower.includes('ocean') || topicLower.includes('sea') || topicLower.includes('marine')) {
      objectives.push(
        "Understand ocean layers and their characteristics",
        "Learn about marine ecosystems and biodiversity",
        "Explore the effects of pressure and light at different depths"
      );
    } else if (topicLower.includes('human') || topicLower.includes('body') || topicLower.includes('anatomy')) {
      objectives.push(
        "Understand the structure and function of body systems",
        "Learn how organs work together",
        "Explore the interconnections between different body parts"
      );
    } else if (topicLower.includes('mountain') || topicLower.includes('geology') || topicLower.includes('earth')) {
      objectives.push(
        "Understand geological formations and processes",
        "Learn about rock layers and mineral composition",
        "Explore tectonic forces and mountain building"
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
    
    // Ocean/Marine topics
    if (topicLower.includes('ocean') || topicLower.includes('sea') || topicLower.includes('marine') || topicLower.includes('depth')) {
      objects.push(
        { 
          type: 'box', 
          name: 'Surface Layer', 
          position: [0, 4, 0], 
          color: '#87CEEB', 
          scale: [8, 0.5, 8],
          description: 'The sunlight zone (0-200m) where most marine life exists and photosynthesis occurs.'
        },
        { 
          type: 'box', 
          name: 'Twilight Zone', 
          position: [0, 2, 0], 
          color: '#4682B4', 
          scale: [8, 1, 8],
          description: 'The mesopelagic zone (200-1000m) where light fades and bioluminescent creatures begin to appear.'
        },
        { 
          type: 'box', 
          name: 'Midnight Zone', 
          position: [0, 0, 0], 
          color: '#191970', 
          scale: [8, 1.5, 8],
          description: 'The bathypelagic zone (1000-4000m) of perpetual darkness with extreme pressure and cold.'
        },
        { 
          type: 'box', 
          name: 'Abyssal Zone', 
          position: [0, -2, 0], 
          color: '#0F0F23', 
          scale: [8, 1, 8],
          description: 'The deepest accessible zone (4000-6000m) with unique life forms adapted to crushing pressure.'
        },
        { 
          type: 'sphere', 
          name: 'Whale', 
          position: [3, 3, 2], 
          color: '#696969', 
          scale: 1.5,
          description: 'Marine mammals that migrate between ocean layers, playing crucial roles in the ecosystem.'
        },
        { 
          type: 'sphere', 
          name: 'Jellyfish', 
          position: [-2, 1.5, -1], 
          color: '#FF69B4', 
          scale: 0.8,
          description: 'Translucent creatures found at various depths, some with bioluminescent capabilities.'
        }
      );
    }
    // Solar System topics
    else if (topicLower.includes('solar') || topicLower.includes('planet') || topicLower.includes('space')) {
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
          description: 'The Red Planet, a cold desert world with the largest volcano in the solar system.'
        },
        { 
          type: 'sphere', 
          name: 'Jupiter', 
          position: [15, 0, -2], 
          color: '#D2691E', 
          scale: 2,
          description: 'The largest planet, a gas giant with a Great Red Spot storm and over 80 moons.'
        }
      );
    }
    // Atomic/Chemistry topics
    else if (topicLower.includes('atom') || topicLower.includes('molecular') || topicLower.includes('chemistry')) {
      objects.push(
        { 
          type: 'sphere', 
          name: 'Nucleus', 
          position: [0, 0, 0], 
          color: '#FF4444', 
          scale: 1.2,
          description: 'The dense core containing protons and neutrons, where 99.9% of the atom\'s mass is concentrated.'
        },
        { 
          type: 'sphere', 
          name: 'Electron Cloud', 
          position: [3, 0, 0], 
          color: '#44FF44', 
          scale: 0.4,
          description: 'Regions where electrons are most likely to be found, forming orbitals around the nucleus.'
        },
        { 
          type: 'sphere', 
          name: 'Valence Shell', 
          position: [-3, 0, 0], 
          color: '#4444FF', 
          scale: 0.4,
          description: 'The outermost electron shell that determines chemical bonding and reactivity.'
        }
      );
    }
    // Human Body/Anatomy topics
    else if (topicLower.includes('human') || topicLower.includes('body') || topicLower.includes('anatomy') || topicLower.includes('heart') || topicLower.includes('brain')) {
      objects.push(
        { 
          type: 'sphere', 
          name: 'Heart', 
          position: [0, 0, 0], 
          color: '#DC143C', 
          scale: 1.2,
          description: 'The muscular organ that pumps blood throughout the circulatory system.'
        },
        { 
          type: 'sphere', 
          name: 'Brain', 
          position: [0, 3, 0], 
          color: '#FFB6C1', 
          scale: 1.5,
          description: 'The control center of the nervous system, processing information and controlling body functions.'
        },
        { 
          type: 'box', 
          name: 'Lungs', 
          position: [2, 0, 0], 
          color: '#FFC0CB', 
          scale: 1,
          description: 'Respiratory organs that exchange oxygen and carbon dioxide with the blood.'
        },
        { 
          type: 'box', 
          name: 'Liver', 
          position: [-2, -1, 0], 
          color: '#8B4513', 
          scale: 1.3,
          description: 'The largest internal organ, responsible for detoxification and metabolism.'
        }
      );
    }
    // Mountain/Geology topics
    else if (topicLower.includes('mountain') || topicLower.includes('geology') || topicLower.includes('rock') || topicLower.includes('volcano')) {
      objects.push(
        { 
          type: 'box', 
          name: 'Peak', 
          position: [0, 3, 0], 
          color: '#FFFFFF', 
          scale: [2, 1, 2],
          description: 'The highest point of the mountain, often covered with snow and ice.'
        },
        { 
          type: 'box', 
          name: 'Alpine Zone', 
          position: [0, 2, 0], 
          color: '#8FBC8F', 
          scale: [3, 0.5, 3],
          description: 'The high-altitude ecosystem with specialized plants adapted to harsh conditions.'
        },
        { 
          type: 'box', 
          name: 'Forest Zone', 
          position: [0, 1, 0], 
          color: '#228B22', 
          scale: [4, 0.8, 4],
          description: 'The mountain slopes covered with dense forests of various tree species.'
        },
        { 
          type: 'box', 
          name: 'Base Layer', 
          position: [0, 0, 0], 
          color: '#8B4513', 
          scale: [5, 0.5, 5],
          description: 'The foundation layer showing sedimentary rock formations and geological history.'
        }
      );
    }
    // Plant/Photosynthesis topics
    else if (topicLower.includes('plant') || topicLower.includes('photosynthesis') || topicLower.includes('leaf') || topicLower.includes('chlorophyll')) {
      objects.push(
        { 
          type: 'sphere', 
          name: 'Chloroplast', 
          position: [0, 0, 0], 
          color: '#32CD32', 
          scale: 1,
          description: 'The organelle where photosynthesis occurs, containing chlorophyll to capture sunlight.'
        },
        { 
          type: 'sphere', 
          name: 'Sunlight', 
          position: [0, 4, 0], 
          color: '#FFD700', 
          scale: 1.5,
          description: 'The energy source that drives photosynthesis, converted into chemical energy.'
        },
        { 
          type: 'sphere', 
          name: 'CO2', 
          position: [-3, 2, 0], 
          color: '#87CEEB', 
          scale: 0.8,
          description: 'Carbon dioxide absorbed from the atmosphere as a raw material for photosynthesis.'
        },
        { 
          type: 'sphere', 
          name: 'Oxygen', 
          position: [3, 2, 0], 
          color: '#00BFFF', 
          scale: 0.8,
          description: 'The oxygen gas released as a byproduct of photosynthesis into the atmosphere.'
        }
      );
    }
    // Default: Generate abstract conceptual objects for any other topic
    else {
      const concepts = [
        'Core Concept', 'Key Process', 'Application', 'Future Impact',
        'Historical Context', 'Modern Usage', 'Scientific Principle', 'Real-world Example'
      ];
      
      concepts.slice(0, 4).forEach((concept, index) => {
        const positions = [[-3, 0, 0], [0, 0, 0], [3, 0, 0], [0, 3, 0]];
        const colors = ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981'];
        
        objects.push({
          type: index % 2 === 0 ? 'box' : 'sphere',
          name: concept,
          position: positions[index],
          color: colors[index],
          scale: 1.2,
          description: `${concept} related to ${topic} - explore this element to understand its role in the broader concept.`
        });
      });
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
            placeholder="e.g., Ocean Depth, Solar System, Human Heart, Mountain Formation, Photosynthesis..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:ring-cyan-400/20 transition-all duration-200"
            disabled={isGenerating}
          />
          <p className="text-xs text-gray-400 flex items-center">
            <Target className="w-3 h-3 mr-1" />
            Try: Ocean Depth, Mountain Layers, Human Body, Plant Cell, Volcano Structure
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
                Topic-specific 3D objects with detailed explanations
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
