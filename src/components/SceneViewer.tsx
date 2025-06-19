
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Maximize, Volume2, Globe } from "lucide-react";
import * as THREE from "three";

interface SceneViewerProps {
  world: any;
  isGenerating: boolean;
}

export const SceneViewer = ({ world, isGenerating }: SceneViewerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000510);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add starfield
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      );
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation loop
    const animate = () => {
      if (!isPlaying) return;
      
      frameRef.current = requestAnimationFrame(animate);
      
      // Rotate camera around the scene
      const time = Date.now() * 0.0005;
      camera.position.x = Math.cos(time) * 15;
      camera.position.z = Math.sin(time) * 15;
      camera.lookAt(0, 0, 0);

      // Rotate stars
      stars.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!world || !sceneRef.current) return;

    // Clear existing objects (except lights and stars)
    const objectsToRemove = sceneRef.current.children.filter(
      child => child.userData.isWorldObject
    );
    objectsToRemove.forEach(obj => sceneRef.current?.remove(obj));

    // Add world objects
    if (world.objects) {
      world.objects.forEach((obj: any, index: number) => {
        let geometry;
        
        switch (obj.type) {
          case 'sphere':
            geometry = new THREE.SphereGeometry(obj.scale || 1, 32, 32);
            break;
          case 'box':
            geometry = new THREE.BoxGeometry(obj.scale || 1, obj.scale || 1, obj.scale || 1);
            break;
          case 'helix':
            // Simple representation of DNA helix
            geometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 8);
            break;
          default:
            geometry = new THREE.SphereGeometry(obj.scale || 1, 16, 16);
        }

        const material = new THREE.MeshPhongMaterial({ 
          color: obj.color || '#ffffff',
          transparent: true,
          opacity: 0.9
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...(obj.position || [0, 0, 0]));
        mesh.userData = { 
          isWorldObject: true, 
          name: obj.name,
          originalColor: obj.color || '#ffffff'
        };
        
        // Add glow effect
        const glowGeometry = geometry.clone();
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: obj.color || '#ffffff',
          transparent: true,
          opacity: 0.2,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.scale.multiplyScalar(1.1);
        mesh.add(glow);

        sceneRef.current?.add(mesh);
      });
    }
  }, [world]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const animate = () => {
        if (!isPlaying) return;
        frameRef.current = requestAnimationFrame(animate);
        rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
      };
      animate();
    }
  };

  const resetCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 5, 10);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-lg h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            {world ? world.title : "3D Learning World"}
            {world && (
              <Badge className="ml-3 bg-green-500/20 text-green-400 border-green-500/30">
                Active
              </Badge>
            )}
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="text-gray-300 hover:text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetCamera}
              className="text-gray-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {world && (
          <p className="text-gray-400 text-sm">
            {world.description || "Explore this interactive 3D learning environment"}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 p-0 relative">
        <div 
          ref={mountRef} 
          className="w-full h-full rounded-lg overflow-hidden relative"
          style={{ minHeight: '400px' }}
        >
          {isGenerating && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-lg font-medium">Generating 3D World...</p>
                <p className="text-gray-400 text-sm">AI is crafting your learning experience</p>
              </div>
            </div>
          )}
          
          {!world && !isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-12 h-12 text-cyan-400" />
                </div>
                <h3 className="text-xl text-white font-medium mb-2">Ready to Explore</h3>
                <p className="text-gray-400">Generate a world or select a pre-made topic to begin your 3D learning journey</p>
              </div>
            </div>
          )}
        </div>
        
        {world && world.objects && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/60 backdrop-blur-lg rounded-lg p-3 border border-white/20">
              <p className="text-white text-sm font-medium mb-2">Scene Objects:</p>
              <div className="flex flex-wrap gap-2">
                {world.objects.map((obj: any, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-white/10 text-gray-300 hover:bg-white/20 cursor-pointer transition-colors"
                    onClick={() => setSelectedObject(obj.name)}
                  >
                    {obj.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
