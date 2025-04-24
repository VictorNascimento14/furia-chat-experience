import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-black">
      {/* Pixelated Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-16 gap-px">
          {Array(256).fill(null).map((_, i) => (
            <div 
              key={i} 
              className="bg-[#EB0029]/10 border border-[#EB0029]/5"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <HeroSection />
      </div>
    </main>
  );
};

export default Index;
