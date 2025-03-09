
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Maximize2, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

interface PreviewCanvasProps {
  userImage: string | null;
  selectedHairstyle: any | null;
}

const PreviewCanvas = ({ userImage, selectedHairstyle }: PreviewCanvasProps) => {
  const [zoom, setZoom] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!userImage || !selectedHairstyle) return null;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section className="section-container animate-on-scroll">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-3">
          第三步
        </span>
        <h2 className="section-title">预览效果</h2>
        <p className="section-subtitle">调整参数获得最自然的融合效果</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Comparison view */}
          <div className="space-y-4">
            <div className="relative glass-panel overflow-hidden rounded-xl aspect-[3/4] flex items-center justify-center">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${userImage})`,
                  filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                  transform: `scale(${zoom / 100})`,
                }}
              ></div>
              
              {/* Original photo label */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm text-white p-2 text-sm text-center">
                原始照片
              </div>
            </div>
            <Button 
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {}}
            >
              <RefreshCw size={16} />
              重新上传照片
            </Button>
          </div>

          {/* Result view */}
          <div className="space-y-4">
            <div className="relative glass-panel overflow-hidden rounded-xl aspect-[3/4] flex items-center justify-center">
              {/* This would be replaced with actual AI rendering */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${userImage})`,
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    transform: `scale(${zoom / 100})`,
                  }}
                ></div>
                <div 
                  className="absolute top-0 left-0 w-full h-[40%] bg-cover bg-top"
                  style={{ 
                    backgroundImage: `url(${selectedHairstyle.imageUrl})`,
                    opacity: 0.85,
                    mixBlendMode: 'screen',
                  }}
                ></div>
              </div>
              
              <Button 
                size="icon"
                variant="secondary"
                className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white hover:bg-black/30"
                onClick={toggleFullscreen}
              >
                <Maximize2 size={16} />
              </Button>
              
              {/* Result label */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm text-white p-2 text-sm text-center">
                变换效果: {selectedHairstyle.name}
              </div>
            </div>
            <Button 
              className="w-full flex items-center justify-center gap-2"
            >
              保存结果
            </Button>
          </div>
        </div>

        {/* Adjustment tools */}
        <div className="mt-12 glass-panel p-6 rounded-xl">
          <Tabs defaultValue="basic">
            <TabsList className="mb-6">
              <TabsTrigger value="basic">基础调整</TabsTrigger>
              <TabsTrigger value="advanced">高级调整</TabsTrigger>
              <TabsTrigger value="color">颜色调整</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <ZoomIn size={16} /> 缩放
                  </label>
                  <span className="text-sm text-muted-foreground">{zoom}%</span>
                </div>
                <Slider
                  min={50}
                  max={150}
                  step={1}
                  value={[zoom]}
                  onValueChange={(value) => setZoom(value[0])}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">亮度</label>
                  <span className="text-sm text-muted-foreground">{brightness}%</span>
                </div>
                <Slider
                  min={50}
                  max={150}
                  step={1}
                  value={[brightness]}
                  onValueChange={(value) => setBrightness(value[0])}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">对比度</label>
                  <span className="text-sm text-muted-foreground">{contrast}%</span>
                </div>
                <Slider
                  min={50}
                  max={150}
                  step={1}
                  value={[contrast]}
                  onValueChange={(value) => setContrast(value[0])}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="advanced">
              <div className="p-8 text-center text-muted-foreground">
                高级调整功能将在未来版本推出
              </div>
            </TabsContent>
            
            <TabsContent value="color">
              <div className="p-8 text-center text-muted-foreground">
                发色调整功能将在未来版本推出
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Fullscreen preview modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden">
            <img
              src={userImage}
              alt="预览效果"
              className="w-full h-full object-contain"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-3 right-3 text-white hover:bg-black/30 bg-black/20 backdrop-blur-sm"
              onClick={toggleFullscreen}
            >
              <Maximize2 size={16} />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PreviewCanvas;
