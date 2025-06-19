import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Maximize, Volume2, Globe, Info } from "lucide-react";
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
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with enhanced visuals
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.Fog(0x0a0a1a, 50, 200);
    sceneRef.current = scene;

    // Enhanced camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 15);
    cameraRef.current = camera;

    // Enhanced renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404080, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(20, 20, 20);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 100;
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -20;
    scene.add(mainLight);

    // Add rim lighting
    const rimLight = new THREE.DirectionalLight(0x00ffff, 1);
    rimLight.position.set(-10, 5, -10);
    scene.add(rimLight);

    // Enhanced starfield with multiple layers
    const createStarfield = (count: number, size: number, distance: number) => {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ 
        color: 0xffffff, 
        size: size,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      const starVertices = [];
      for (let i = 0; i < count; i++) {
        starVertices.push(
          (Math.random() - 0.5) * distance,
          (Math.random() - 0.5) * distance,
          (Math.random() - 0.5) * distance
        );
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      return new THREE.Points(starGeometry, starMaterial);
    };

    const stars1 = createStarfield(800, 0.8, 300);
    const stars2 = createStarfield(400, 1.2, 200);
    const stars3 = createStarfield(200, 2.0, 150);
    scene.add(stars1, stars2, stars3);

    // Animation loop with enhanced effects
    const animate = () => {
      if (!isPlaying) return;
      
      frameRef.current = requestAnimationFrame(animate);
      
      // Smooth camera movement
      const time = Date.now() * 0.0003;
      const radius = 18;
      camera.position.x = Math.cos(time) * radius;
      camera.position.z = Math.sin(time) * radius;
      camera.position.y = 5 + Math.sin(time * 0.5) * 2;
      camera.lookAt(0, 0, 0);

      // Animate starfields at different speeds
      stars1.rotation.y += 0.0005;
      stars2.rotation.y -= 0.0008;
      stars3.rotation.y += 0.001;
      stars1.rotation.x += 0.0002;

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    // Add enhanced world objects
    if (world.objects) {
      world.objects.forEach((obj: any, index: number) => {
        let geometry;
        
        switch (obj.type) {
          case 'sphere':
            geometry = new THREE.SphereGeometry(obj.scale || 1, 64, 64);
            break;
          case 'box':
            geometry = new THREE.BoxGeometry(obj.scale || 1, obj.scale || 1, obj.scale || 1);
            break;
          case 'helix':
            // Enhanced DNA helix representation
            geometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 16);
            break;
          default:
            geometry = new THREE.SphereGeometry(obj.scale || 1, 32, 32);
        }

        const material = new THREE.MeshPhysicalMaterial({ 
          color: obj.color || '#ffffff',
          transparent: true,
          opacity: 0.9,
          roughness: 0.2,
          metalness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.0
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        const position = obj.position || [0, 0, 0];
        mesh.position.set(position[0], position[1], position[2]);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { 
          isWorldObject: true, 
          name: obj.name,
          originalColor: obj.color || '#ffffff',
          description: obj.description || `Learn about ${obj.name}`
        };
        
        // Enhanced glow effect
        const glowGeometry = geometry.clone();
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: obj.color || '#ffffff',
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.scale.multiplyScalar(1.2);
        mesh.add(glow);

        // Add orbit trails for planets
        if (obj.type === 'sphere' && obj.name !== 'Sun') {
          const orbitRadius = Math.sqrt(position[0] ** 2 + position[2] ** 2);
          const orbitGeometry = new THREE.RingGeometry(orbitRadius - 0.1, orbitRadius + 0.1, 64);
          const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
          });
          const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
          orbit.rotation.x = -Math.PI / 2;
          orbit.userData = { isWorldObject: true };
          sceneRef.current?.add(orbit);
        }

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
      cameraRef.current.position.set(0, 8, 15);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-purple-900/90 border border-cyan-500/30 backdrop-blur-xl h-[700px] flex flex-col shadow-2xl">
      <CardHeader className="pb-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-xl">
            <Globe className="w-6 h-6 mr-3 text-cyan-400 animate-pulse" />
            {world ? world.title : "3D Learning World"}
            {world && (
              <Badge className="ml-3 bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-300 border-green-400/30 shadow-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Active
              </Badge>
            )}
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
              className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200"
            >
              <Info className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetCamera}
              className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {world && (
          <div className="mt-3">
            <p className="text-cyan-100 text-sm leading-relaxed">
              {world.description || "Explore this interactive 3D learning environment"}
            </p>
            {showInfo && world.objects && (
              <div className="mt-4 p-4 bg-black/30 rounded-lg border border-cyan-500/20">
                <h4 className="text-cyan-300 font-medium mb-2">Learning Objectives:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {world.objects.map((obj: any, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                      Understand the role and properties of {obj.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 p-0 relative overflow-hidden">
        <div 
          ref={mountRef} 
          className="w-full h-full rounded-lg relative bg-gradient-to-b from-slate-900 to-purple-900"
          style={{ minHeight: '500px' }}
        >
          {isGenerating && (
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-purple-900/80 backdrop-blur-md flex items-center justify-center z-10">
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-6"></div>
                  <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400/20 border-r-purple-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
                </div>
                <h3 className="text-2xl text-white font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Generating 3D World
                </h3>
                <p className="text-gray-300 text-lg mb-2">AI is crafting your learning experience</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-cyan-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {!world && !isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto px-6">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-400/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/10">
                    <Globe className="w-16 h-16 text-cyan-400 animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-3xl text-white font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ready to Explore
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Generate a world or select a pre-made topic to begin your immersive 3D learning journey. 
                  Experience education like never before!
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-cyan-300">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Interactive 3D Objects
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    AI Narration
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    Adaptive Learning
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {world && world.objects && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-r from-black/70 via-slate-900/70 to-black/70 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/20 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-cyan-300 font-semibold flex items-center">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                  Interactive Objects
                </h4>
                <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                  {world.objects.length} Objects
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {world.objects.map((obj: any, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gradient-to-r from-white/10 to-cyan-500/10 text-gray-200 hover:from-cyan-500/20 hover:to-purple-500/20 cursor-pointer transition-all duration-300 border border-white/20 hover:border-cyan-400/40 hover:scale-105"
                    onClick={() => setSelectedObject(obj.name)}
                  >
                    <div 
                      className="w-2 h-2 rounded-full mr-2" 
                      style={{ backgroundColor: obj.color || '#ffffff' }}
                    ></div>
                    {obj.name}
                  </Badge>
                ))}
              </div>
              {selectedObject && (
                <div className="mt-3 p-3 bg-black/40 rounded-lg border border-cyan-500/30">
                  <p className="text-cyan-100 text-sm">
                    <span className="font-medium text-cyan-300">{selectedObject}:</span> 
                    {" "}Click and explore this object to learn about its properties and role in the concept.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
