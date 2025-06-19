
import { Button } from "@/components/ui/button";
import { Sparkles, Globe, Users, Settings } from "lucide-react";

export const NavigationHeader = () => {
  return (
    <header className="relative z-20 border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">MetaClassroom</h2>
            <p className="text-xs text-gray-400">AI Learning Worlds</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <Globe className="w-4 h-4 mr-2" />
            Explore
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <Users className="w-4 h-4 mr-2" />
            Collaborate
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </nav>
      </div>
    </header>
  );
};
