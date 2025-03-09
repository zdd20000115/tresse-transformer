
import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import UploadPhoto from "@/components/UploadPhoto";
import HairstyleGallery from "@/components/HairstyleGallery";
import PreviewCanvas from "@/components/PreviewCanvas";
import ActionButtons from "@/components/ActionButtons";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Index = () => {
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
  const [selectedHairstyle, setSelectedHairstyle] = useState<any | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handlePhotoUploaded = (file: File) => {
    setUserPhoto(file);
    const url = URL.createObjectURL(file);
    setUserPhotoUrl(url);
  };

  const handleHairstyleSelect = (hairstyle: any) => {
    setSelectedHairstyle(hairstyle);
    // Scroll to preview section if both photo and hairstyle are selected
    if (userPhoto) {
      setTimeout(() => {
        document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleReset = () => {
    // Clean up object URLs to avoid memory leaks
    if (userPhotoUrl) {
      URL.revokeObjectURL(userPhotoUrl);
    }
    setUserPhoto(null);
    setUserPhotoUrl(null);
    setSelectedHairstyle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle scroll to top button visibility
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <Hero onGetStarted={handleGetStarted} />
      
      <UploadPhoto onPhotoUploaded={handlePhotoUploaded} />
      
      {userPhotoUrl && (
        <HairstyleGallery onHairstyleSelect={handleHairstyleSelect} />
      )}
      
      {userPhotoUrl && selectedHairstyle && (
        <div id="preview">
          <PreviewCanvas 
            userImage={userPhotoUrl} 
            selectedHairstyle={selectedHairstyle} 
          />
          <ActionButtons onReset={handleReset} />
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 mt-20 text-center text-sm text-muted-foreground">
        <p>© 2023 AI发型换换 · 保护隐私不存储照片 · 技术支持</p>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 rounded-full shadow-lg animate-fade-in z-20"
          onClick={scrollToTop}
        >
          <ArrowUp size={18} />
        </Button>
      )}
    </Layout>
  );
};

export default Index;
