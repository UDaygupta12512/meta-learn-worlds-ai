
import { useState } from "react";
import { WorldGenerator } from "@/components/WorldGenerator";
import { SceneViewer } from "@/components/SceneViewer";
import { TopicSelector } from "@/components/TopicSelector";
import { NavigationHeader } from "@/components/NavigationHeader";

const Index = () => {
  const [currentWorld, setCurrentWorld] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      
      <NavigationHeader />
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            MetaClassroom
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform any topic into an immersive 3D learning experience. 
            Explore concepts through AI-generated worlds that adapt to your learning level.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* World Generation Panel */}
          <div className="lg:col-span-1">
            <WorldGenerator 
              onWorldGenerated={setCurrentWorld}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
            <div className="mt-6">
              <TopicSelector onTopicSelect={setCurrentWorld} />
            </div>
          </div>

          {/* 3D Scene Viewer */}
          <div className="lg:col-span-2">
            <SceneViewer 
              world={currentWorld}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
