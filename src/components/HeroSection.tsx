import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { Sword, Trophy } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0c0909] via-[#1a1f2ce3] to-[#000000] [image-rendering:pixelated]">
      {/* Pixelated Background Grid */}
      <div className="absolute inset-0 grid grid-cols-16 grid-rows-16 gap-px opacity-20">
        {Array(256).fill(null).map((_, i) => (
          <div 
            key={i}
            className="bg-[#EB0029]/10 border border-[#EB0029]/5"
            style={{
              animation: `pulse ${(i % 3) + 1}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
      

      {/* Retro Game Particles */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-20 left-20 w-5 h-5 bg-[#EB0029] rounded-none animate-bounce [image-rendering:pixelated]" />
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-[#ff0000] rounded-none animate-bounce [image-rendering:pixelated]" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block mb-6 pixel-perfect">
              <img 
                src="/Furia_Esports_logo.png" 
                alt="FURIA Logo"
                className="w-24 h-24 md:w-60 md:h-32 object-contain mx-auto lg:mx-0 transition-transform duration-300 "
                onError={(e) => {
                  e.currentTarget.src = "/Furia_Esports_logo.png";
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight pixel-font">
              Experiência <span className="text-[#EB0029] animate-pulse">Conversacional</span> FURIA
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl pixel-font">
              Conecte-se com a FURIA como nunca antes. Chat em tempo real, informações exclusivas e muito mais para os verdadeiros fãs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-[#EB0029] hover:bg-[#EB0029]/50 text-white text-lg px-8 py-6 rounded-none border-2 border-white transition-all duration-300 [image-rendering:pixelated] pixel-font"
              >
                <Sword className="w-6 h-6" />
                <a href="https://furiaclub.netlify.app/" target="_blank">Furia Club</a>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-[#EB0029] text-[#EB0029] hover:bg-[gray]/50 text-lg px-8 py-6 rounded-none border-2 transition-all duration-300 pixel-font"
              >
                <Trophy className="w-6 h-6" />
                <a href="https://www.furia.gg/" target="_blank">Loja FURIA</a>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-xl border-1 border-white/20 p-2 ">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};
