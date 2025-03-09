
import { useEffect } from "react";
import { setupScrollAnimation } from "@/lib/animations";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    setupScrollAnimation();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full max-w-[1920px] mx-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
