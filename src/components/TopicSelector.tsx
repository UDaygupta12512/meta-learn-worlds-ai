
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Atom, Dna, Globe, Zap, Droplets } from "lucide-react";

interface TopicSelectorProps {
  onTopicSelect: (world: any) => void;
}

export const TopicSelector = ({ onTopicSelect }: TopicSelectorProps) => {
  const prebuiltWorlds = [
    {
      id: 1,
      title: "Solar System Tour",
      description: "Journey through planets, moons, and cosmic phenomena",
      icon: Globe,
      topic: "Solar System",
      difficulty: "Beginner",
      color: "from-orange-400 to-red-500",
      objects: [
        { type: 'sphere', name: 'Sun', position: [0, 0, 0], color: '#FFA500', scale: 2 },
        { type: 'sphere', name: 'Earth', position: [5, 0, 0], color: '#4A90E2', scale: 0.8 },
        { type: 'sphere', name: 'Mars', position: [8, 0, 2], color: '#CD5C5C', scale: 0.6 },
        { type: 'sphere', name: 'Jupiter', position: [12, 0, -2], color: '#D2691E', scale: 1.5 }
      ]
    },
    {
      id: 2,
      title: "Atomic Structure",
      description: "Explore electrons, protons, and quantum mechanics",
      icon: Atom,
      topic: "Atomic Physics",
      difficulty: "Intermediate",
      color: "from-blue-400 to-purple-500",
      objects: [
        { type: 'sphere', name: 'Nucleus', position: [0, 0, 0], color: '#FF4444', scale: 1 },
        { type: 'sphere', name: 'Electron Shell 1', position: [2, 0, 0], color: '#44FF44', scale: 0.3 },
        { type: 'sphere', name: 'Electron Shell 2', position: [-2, 0, 0], color: '#44FF44', scale: 0.3 },
        { type: 'sphere', name: 'Electron Shell 3', position: [0, 2, 0], color: '#44FF44', scale: 0.3 }
      ]
    },
    {
      id: 3,
      title: "DNA Replication",
      description: "Watch the miracle of life unfold at molecular level",
      icon: Dna,
      topic: "Molecular Biology",
      difficulty: "Advanced",
      color: "from-green-400 to-teal-500",
      objects: [
        { type: 'helix', name: 'DNA Strand A', position: [-1, 0, 0], color: '#00FF00', scale: 1 },
        { type: 'helix', name: 'DNA Strand B', position: [1, 0, 0], color: '#0088FF', scale: 1 },
        { type: 'sphere', name: 'Enzyme', position: [0, 2, 0], color: '#FF8800', scale: 0.8 }
      ]
    }
  ];

  const selectWorld = (world: any) => {
    const selectedWorld = {
      ...world,
      generatedAt: new Date().toISOString(),
      narration: `Welcome to ${world.title}. ${world.description}. Let's begin exploring!`
    };
    onTopicSelect(selectedWorld);
  };

  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <BookOpen className="w-5 h-5 mr-2 text-green-400" />
          Ready-Made Worlds
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {prebuiltWorlds.map((world) => {
          const IconComponent = world.icon;
          return (
            <div
              key={world.id}
              className="group cursor-pointer"
              onClick={() => selectWorld(world)}
            >
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all duration-200 hover:bg-white/10">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${world.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                      {world.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                      {world.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge 
                        variant="secondary" 
                        className={`bg-gradient-to-r ${world.color} text-white border-0 text-xs`}
                      >
                        {world.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
