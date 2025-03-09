
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Image as ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadPhotoProps {
  onPhotoUploaded: (file: File) => void;
}

const UploadPhoto = ({ onPhotoUploaded }: UploadPhotoProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match("image.*")) {
      alert("请上传图片文件");
      return;
    }

    // Create a preview URL for the image
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onPhotoUploaded(file);
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const resetUpload = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section 
      id="upload"
      className="section-container animate-on-scroll"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-3">
          第一步
        </span>
        <h2 className="section-title">上传你的照片</h2>
        <p className="section-subtitle">选择或拖放一张清晰的正面照片，我们的AI将自动识别你的面部特征</p>
      </div>

      <div className="max-w-xl mx-auto">
        {previewUrl ? (
          <div className="relative rounded-2xl overflow-hidden shadow-lg animate-zoom-in">
            <img 
              src={previewUrl} 
              alt="已上传的照片" 
              className="w-full h-auto max-h-[500px] object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end justify-center p-4">
              <Button 
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 rounded-full"
                onClick={resetUpload}
              >
                <X size={18} />
              </Button>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={triggerFileInput} 
                  variant="secondary"
                >
                  更换照片
                </Button>
                <Button>
                  继续
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 glass-panel",
              dragActive ? "border-primary border-solid bg-primary/5" : "border-border"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              id="file-upload"
              onChange={handleChange}
              accept="image/*"
              className="hidden"
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ImageIcon size={32} className="text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-medium">拖放照片或点击上传</h3>
              <p className="text-muted-foreground mb-6">支持JPG、PNG格式（最大10MB）</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={triggerFileInput}
                  className="btn-primary flex items-center gap-2"
                >
                  <Upload size={18} />
                  选择照片
                </Button>
                <Button
                  variant="outline"
                  className="btn-secondary flex items-center gap-2"
                >
                  <Camera size={18} />
                  使用相机
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadPhoto;
