
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock hairstyle data
const hairstyles = [
  { id: 1, name: "经典短发", category: "短发", imageUrl: "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "自然卷发", category: "卷发", imageUrl: "https://images.unsplash.com/photo-1605980776566-0486c3ac7cb3?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "长直发", category: "长发", imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "韩式波波头", category: "短发", imageUrl: "https://images.unsplash.com/photo-1549236177-92b0a80f9f1e?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "齐肩短发", category: "中发", imageUrl: "https://images.unsplash.com/photo-1567894340315-735d7c361db7?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "层次长发", category: "长发", imageUrl: "https://images.unsplash.com/photo-1485290334039-a3c69043e517?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "简约马尾", category: "长发", imageUrl: "https://images.unsplash.com/photo-1562898616-a46b5724509c?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "复古波浪", category: "卷发", imageUrl: "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?q=80&w=800&auto=format&fit=crop" },
];

interface HairstyleGalleryProps {
  onHairstyleSelect: (hairstyle: any) => void;
}

const HairstyleGallery = ({ onHairstyleSelect }: HairstyleGalleryProps) => {
  const [selectedHairstyle, setSelectedHairstyle] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredHairstyles = hairstyles.filter(
    (hairstyle) =>
      (activeCategory === null || hairstyle.category === activeCategory) &&
      hairstyle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["短发", "中发", "长发", "卷发"];

  const handleHairstyleClick = (id: number) => {
    setSelectedHairstyle(id);
    const hairstyle = hairstyles.find((h) => h.id === id);
    if (hairstyle) {
      onHairstyleSelect(hairstyle);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="section-container animate-on-scroll">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-3">
          第二步
        </span>
        <h2 className="section-title">选择你喜欢的发型</h2>
        <p className="section-subtitle">浏览精选发型，点击选择你想尝试的造型</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="搜索发型..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
              className="whitespace-nowrap"
            >
              全部
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Hairstyle gallery */}
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 rounded-full shadow-lg bg-background"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={18} />
          </Button>
          
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth hide-scrollbar px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredHairstyles.map((hairstyle) => (
              <div
                key={hairstyle.id}
                className={cn(
                  "flex-shrink-0 w-48 subtle-card overflow-hidden transition-all duration-300 cursor-pointer",
                  selectedHairstyle === hairstyle.id
                    ? "ring-2 ring-primary shadow-md scale-[1.02]"
                    : "hover:scale-[1.01]"
                )}
                onClick={() => handleHairstyleClick(hairstyle.id)}
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={hairstyle.imageUrl}
                    alt={hairstyle.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    style={{ 
                      objectPosition: 'top',
                    }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium">{hairstyle.name}</h3>
                  <p className="text-sm text-muted-foreground">{hairstyle.category}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 rounded-full shadow-lg bg-background"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HairstyleGallery;
