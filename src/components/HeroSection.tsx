
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";

export const HeroSection = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black to-[#1A1F2C]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#EB0029]/20 via-transparent to-transparent" />
      
      {/* FURIA Logo Background - More Prominent */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-pulse">
          {/* Updated with a more reliable logo source */}
          <img 
            src="https://i.imgur.com/8NuBFHt.png" 
            alt="FURIA Logo"
            className="w-full h-full object-contain hover:grayscale-0 transition-all duration-500"
            onError={(e) => {
              e.currentTarget.src = "https://i.imgur.com/8NuBFHt.png"; // Fallback to another source
              e.currentTarget.onerror = null; // Prevent infinite error loop
            }}
          />
        </div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#EB0029]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#EB0029]/10 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block animate-bounce mb-6">
              {/* Updated the logo in the header too */}
              <img 
                src="https://i.imgur.com/8NuBFHt.png" 
                alt="FURIA Logo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto lg:mx-0 hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = "https://i.imgur.com/8NuBFHt.png"; // Fallback
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Experiência <span className="text-[#EB0029] animate-pulse">Conversacional</span> FURIA
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              Conecte-se com a FURIA como nunca antes. Chat em tempo real, informações exclusivas e muito mais para os verdadeiros fãs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-[#EB0029] hover:bg-[#EB0029]/80 text-white text-lg px-8 py-6 transform hover:scale-105 transition-transform duration-300"
              >
                Começar Agora
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-[#EB0029] text-[#EB0029] hover:bg-[#EB0029]/10 text-lg px-8 py-6"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-xl transform hover:scale-105 transition-transform duration-300">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};
