
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-white/10 dark:from-blue-950/20 dark:to-background -z-10"></div>
      
      {/* Animated background shapes */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl -top-20 -right-20 animate-float opacity-70"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-100/20 dark:bg-blue-900/10 blur-3xl -bottom-10 -left-10 animate-float animation-delay-1000 opacity-60"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto animate-slide-down">
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6 animate-pulse-subtle">
          AI 换发型 · 焕新形象
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter mb-6">
          发型改变 <span className="text-primary">瞬间焕新</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          使用我们的AI技术，即时预览各种发型效果，找到最适合你的完美发型。无需实际剪发，提前看到效果。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={onGetStarted} 
            size="lg" 
            className="relative overflow-hidden group btn-primary"
          >
            <span className="relative z-10">开始体验</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="btn-secondary"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            了解更多
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-10 w-10"
          onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={20} />
          <span className="sr-only">向下滚动</span>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
