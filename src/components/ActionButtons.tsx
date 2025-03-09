
import { Button } from "@/components/ui/button";
import { Download, Share2, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  className?: string;
  onReset: () => void;
}

const ActionButtons = ({ className, onReset }: ActionButtonsProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI 换发型',
        text: '看看我用AI换的新发型！',
        url: window.location.href,
      })
      .catch((error) => console.log('分享失败', error));
    } else {
      console.log('Web Share API不支持');
      // Fallback: Copy to clipboard or show a modal with share links
    }
  };

  return (
    <section className={cn("section-container animate-on-scroll", className)}>
      <div className="max-w-md mx-auto glass-panel p-8 rounded-xl text-center">
        <h3 className="text-xl font-medium mb-6">满意你的新发型了吗？</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={onReset}
          >
            <Repeat size={16} />
            重新开始
          </Button>
          
          <Button 
            className="w-full flex items-center justify-center gap-2"
          >
            <Download size={16} />
            保存图片
          </Button>
          
          <Button 
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleShare}
          >
            <Share2 size={16} />
            分享
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActionButtons;
