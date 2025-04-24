
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";

export const ChatInterface = () => {
  return (
    <Card className="w-full max-w-md mx-auto bg-black/80 border-white/30 backdrop-blur-sm">
      <div className="flex flex-col h-[450px]">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#EB0029] animate-pulse" />
            <h3 className="font-bold text-white">FURIA Chat</h3>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex gap-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EB0029] flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-white max-w-[80%]">
              Olá! Eu sou o chatbot da FURIA, como posso ajudar?
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Input 
              placeholder="Digite sua mensagem..." 
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
            <Button variant="secondary" className="bg-[#EB0029] hover:bg-[#EB0029]/80 text-white">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
