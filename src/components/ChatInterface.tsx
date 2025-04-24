import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const furiaData = {
  jogadores: [
    { nome: 'KSCERATO', posicao: 'Rifler', nacionalidade: 'Brasil', idade: 24, kd: 1.15 },
    { nome: 'arT', posicao: 'IGL', nacionalidade: 'Brasil', idade: 27, kd: 0.95 },
    { nome: 'yuurih', posicao: 'Rifler', nacionalidade: 'Brasil', idade: 23, kd: 1.10 },
    { nome: 'FalleN', posicao: 'AWPer', nacionalidade: 'Brasil', idade: 32, kd: 1.05 },
    { nome: 'chelo', posicao: 'Rifler', nacionalidade: 'Brasil', idade: 26, kd: 1.00 }
  ],
  conquistas: [
    'ESL Pro League Season 15 - 2º lugar',
    'IEM Katowice 2022 - 3º-4º lugar',
    'ESL Pro League Season 13 - 3º-4º lugar',
    'BLAST Premier: Fall Finals 2020 - 2º lugar',
    'DreamHack Masters Spring 2020 - 2º lugar',
    'ESL One: Cologne 2020 - 3º-4º lugar'
  ],
  historia: 'A FURIA Esports foi fundada em 2017 e rapidamente se tornou uma das principais organizações de esports do Brasil. O time de CS:GO é conhecido por seu estilo agressivo de jogo e por representar o Brasil em competições internacionais. A FURIA é conhecida por seu estilo de jogo único, chamado de "FURIA Style", que combina agressividade com estratégia inovadora.',
  estilo: 'O "FURIA Style" é caracterizado por jogadas agressivas, pressão constante e movimentações inesperadas. O time é conhecido por sua capacidade de adaptação e por surpreender os adversários com estratégias inovadoras.',
  treinador: {
    nome: 'guerri',
    nacionalidade: 'Brasil',
    idade: 32,
    tempoNaFuria: 'Desde 2018'
  },
  sugestoesPerguntas: [
    'Quem são os jogadores da FURIA?',
    'Qual é o estilo de jogo da FURIA?',
    'Quais são as conquistas da FURIA?',
    'Quem é o treinador da FURIA?',
    'Qual é a história da FURIA?',
    'Como está o desempenho dos jogadores?'
  ]
};

const saudações = [
  'Olá!',
  'Oi!',
  'E aí!',
  'Fala aí!',
  'Salve!',
  'Hey!'
];

const respostasPositivas = [
  'Estou ótimo, obrigado por perguntar!',
  'Tudo bem, e você?',
  'Estou muito bem, pronto para falar sobre a FURIA!',
  'Melhor impossível!',
  'Tudo tranquilo por aqui!'
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Eu sou o Panthera a inteligência artificial da FURIA, como posso ajudar?\n\nPosso responder sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo\n- Treinador\n\nO que você gostaria de saber?'
    }
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setShowSuggestions(false);
    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulação de resposta da IA
    const response = generateResponse(input);
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: response
    };

    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);

    setInput('');
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Verifica saudações
    if (lowerQuery.match(/^(oi|olá|ola|e aí|fala|hey|hi|hello|salve|bom dia|boa tarde|boa noite)/i)) {
      const saudação = saudações[Math.floor(Math.random() * saudações.length)];
      return `${saudação} Como posso te ajudar hoje?\n\nPosso responder sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo\n- Treinador`;
    }

    // Verifica perguntas sobre o estado do bot
    if (lowerQuery.match(/(como você está|tudo bem|como vai|como está|está bem)/i)) {
      const resposta = respostasPositivas[Math.floor(Math.random() * respostasPositivas.length)];
      return `${resposta} O que você gostaria de saber sobre a FURIA?\n\nPosso falar sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo\n- Treinador`;
    }
    
    // Verifica perguntas sobre jogadores
    if (lowerQuery.includes('jogador') || lowerQuery.includes('player') || 
        lowerQuery.includes('time') || lowerQuery.includes('equipe') ||
        lowerQuery.includes('quem são os jogadores') || lowerQuery.includes('roster')) {
      return `Os jogadores atuais da FURIA são:\n${furiaData.jogadores.map(j => 
        `${j.nome} - ${j.posicao} (${j.nacionalidade})\nIdade: ${j.idade} | K/D: ${j.kd}`
      ).join('\n\n')}`;
    }
    
    // Verifica perguntas sobre conquistas
    if (lowerQuery.includes('conquista') || lowerQuery.includes('achievement') ||
        lowerQuery.includes('título') || lowerQuery.includes('títulos') ||
        lowerQuery.includes('vitória') || lowerQuery.includes('vitórias')) {
      return `Principais conquistas da FURIA:\n${furiaData.conquistas.join('\n')}`;
    }
    
    // Verifica perguntas sobre história
    if (lowerQuery.includes('história') || lowerQuery.includes('history') ||
        lowerQuery.includes('fundação') || lowerQuery.includes('quando foi criada') ||
        lowerQuery.includes('origem')) {
      return furiaData.historia;
    }

    // Verifica perguntas sobre estilo de jogo
    if (lowerQuery.includes('estilo') || lowerQuery.includes('jogo') ||
        lowerQuery.includes('furia style') || lowerQuery.includes('como joga')) {
      return furiaData.estilo;
    }

    // Verifica perguntas sobre treinador
    if (lowerQuery.includes('treinador') || lowerQuery.includes('coach') ||
        lowerQuery.includes('guerri')) {
      return `O treinador da FURIA é ${furiaData.treinador.nome}.\n\nDetalhes:\n- Nacionalidade: ${furiaData.treinador.nacionalidade}\n- Idade: ${furiaData.treinador.idade}\n- Tempo na FURIA: ${furiaData.treinador.tempoNaFuria}`;
    }

    // Verifica agradecimentos
    if (lowerQuery.match(/(obrigado|obrigada|valeu|vlw|thanks|thank you)/i)) {
      return 'Por nada, tamo junto! Estou aqui para ajudar. Tem mais alguma dúvida sobre a FURIA?\n\nPosso falar sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo\n- Treinador';
    }
    
    return 'Desculpe, não entendi sua pergunta. Você pode perguntar sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo\n- Treinador\n\nOu pode tentar uma dessas perguntas:\n' + furiaData.sugestoesPerguntas.map(p => `- ${p}`).join('\n');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black/80 border-white/30 backdrop-blur-sm">
      <div className="flex flex-col h-[600px]">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#EB0029] animate-pulse" />
            <h3 className="font-bold text-white">FURIA Chat</h3>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4 chat-messages [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/50 [&::-webkit-scrollbar-thumb]:bg-[#EB0029]/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#EB0029]/50">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-2">
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EB0029] flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`rounded-lg p-3 text-white max-w-[80%] ${
                message.role === 'user' 
                  ? 'bg-[#EB0029]/20 ml-auto' 
                  : 'bg-white/10'
              }`}>
                {message.content.split('\n').map((line, i) => (
                  <p key={i} className="mb-1 last:mb-0">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {showSuggestions && (
          <div className="p-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2 mb-4">
              {furiaData.sugestoesPerguntas.slice(0, 3).map((pergunta, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-xs bg-[#EB0029]/10 hover:bg-white/80 text-white border-[#EB0029]/20"
                  onClick={() => {
                    setInput(pergunta);
                    handleSend();
                  }}
                >
                  {pergunta}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..." 
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
            <Button 
              variant="secondary" 
              className="bg-[#EB0029] hover:bg-[#EB0029]/80 text-white"
              onClick={handleSend}
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
