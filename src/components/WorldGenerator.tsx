
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Brain, Zap } from "lucide-react";
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
    
    // Simulate AI world generation
    setTimeout(() => {
      const generatedWorld = {
        id: Date.now(),
        topic: topic,
        ageGroup: ageGroup,
        complexity: complexity,
        title: `${topic} - 3D Learning World`,
        description: `Explore ${topic} through an immersive 3D environment tailored for ${ageGroup} learners.`,
        objects: generateSceneObjects(topic),
        narration: `Welcome to your ${topic} learning world. Let's explore this concept step by step...`,
        generatedAt: new Date().toISOString()
      };

      onWorldGenerated(generatedWorld);
      setIsGenerating(false);
      toast.success(`Generated "${topic}" learning world!`);
    }, 3000);
  };

  const generateSceneObjects = (topic: string) => {
    // Simple procedural object generation based on topic keywords
    const objects = [];
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('solar') || topicLower.includes('planet')) {
      objects.push(
        { type: 'sphere', name: 'Sun', position: [0, 0, 0], color: '#FFA500', scale: 2 },
        { type: 'sphere', name: 'Earth', position: [5, 0, 0], color: '#4A90E2', scale: 0.8 },
        { type: 'sphere', name: 'Mars', position: [8, 0, 2], color: '#CD5C5C', scale: 0.6 }
      );
    } else if (topicLower.includes('atom') || topicLower.includes('molecular')) {
      objects.push(
        { type: 'sphere', name: 'Nucleus', position: [0, 0, 0], color: '#FF4444', scale: 1 },
        { type: 'sphere', name: 'Electron 1', position: [2, 0, 0], color: '#44FF44', scale: 0.3 },
        { type: 'sphere', name: 'Electron 2', position: [-2, 0, 0], color: '#44FF44', scale: 0.3 }
      );
    } else {
      // Default abstract representation
      objects.push(
        { type: 'box', name: 'Concept A', position: [-2, 0, 0], color: '#6366F1', scale: 1 },
        { type: 'sphere', name: 'Concept B', position: [0, 0, 0], color: '#8B5CF6', scale: 1.2 },
        { type: 'box', name: 'Concept C', position: [2, 0, 0], color: '#06B6D4', scale: 1 }
      );
    }
    
    return objects;
  };

  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Brain className="w-5 h-5 mr-2 text-cyan-400" />
          AI World Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-gray-300">Learning Topic</Label>
          <Input
            id="topic"
            placeholder="e.g., Solar System, Photosynthesis, DNA Structure..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            disabled={isGenerating}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Age Group</Label>
            <Select value={ageGroup} onValueChange={setAgeGroup} disabled={isGenerating}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="elementary">Elementary (K-5)</SelectItem>
                <SelectItem value="middle-school">Middle School (6-8)</SelectItem>
                <SelectItem value="high-school">High School (9-12)</SelectItem>
                <SelectItem value="college">College/Adult</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Complexity</Label>
            <Select value={complexity} onValueChange={setComplexity} disabled={isGenerating}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={generateWorld}
          disabled={isGenerating || !topic.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating World...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Generate 3D World
            </>
          )}
        </Button>

        {isGenerating && (
          <div className="text-center text-sm text-gray-400">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 animate-pulse text-cyan-400" />
              <span>AI is crafting your learning experience...</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
