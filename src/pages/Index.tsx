
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-8 gap-1">
          {Array(64).fill(null).map((_, i) => (
            <div 
              key={i} 
              className="bg-[#EB0029]/10 rounded-sm animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10">
        <HeroSection />
      </div>
    </main>
  );
};

export default Index;
