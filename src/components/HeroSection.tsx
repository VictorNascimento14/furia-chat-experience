
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";

export const HeroSection = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black to-[#1A1F2C]">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#EB0029]/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Experiência <span className="text-[#EB0029]">Conversacional</span> FURIA
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              Conecte-se com a FURIA como nunca antes. Chat em tempo real, informações exclusivas e muito mais para os verdadeiros fãs.
            </p>
            <Button 
              size="lg"
              className="bg-[#EB0029] hover:bg-[#EB0029]/80 text-white text-lg px-8 py-6"
            >
              Começar Agora
            </Button>
          </div>
          
          <div className="flex-1 w-full max-w-xl transform hover:scale-105 transition-transform duration-300">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};
