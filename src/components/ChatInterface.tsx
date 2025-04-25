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
    { nome: 'KZMOLODOY', posicao: 'Rifler', nacionalidade: 'BR', idade: 25, kd: 1.18 },
    { nome: 'YEKINDAR', posicao: 'Rifler', nacionalidade: 'BR', idade: 24, kd: 1.12 },
    { nome: 'FalleN', posicao: 'AWPer', nacionalidade: 'BR', idade: 33, kd: 1.08 },
    { nome: 'KSCERATO', posicao: 'Rifler', nacionalidade: 'BR', idade: 25, kd: 1.18 },
    { nome: 'yuurih', posicao: 'Rifler', nacionalidade: 'BR', idade: 24, kd: 1.12 }
  ],
  reservas: [
    { nome: 'skullz', posicao: 'Rifler', nacionalidade: 'BR', idade: 22, kd: 1.05 },
    { nome: 'chelo', posicao: 'Rifler', nacionalidade: 'BR', idade: 27, kd: 1.02 }
  ],
  conquistas: [
    'ESL Pro League Season 19 - 3º-4º lugar',
    'BLAST Premier: Spring Groups 2024 - 2º lugar',
    'ESL Pro League Season 18 - 2º lugar',
    'IEM Katowice 2024 - 3º-4º lugar',
    'BLAST Premier: World Final 2023 - 3º-4º lugar',
    'ESL Pro League Season 17 - 2º lugar',
    'BLAST Premier: Fall Groups 2023 - 1º lugar',
    'ESL Pro League Season 16 - 3º-4º lugar'
  ],
  ultimasPartidas: [
    { adversario: 'Vitality', resultado: 'Derrota', placar: '1-2', data: '15/04/2024', campeonato: 'ESL Pro League Season 19' },
    { adversario: 'FaZe', resultado: 'Vitória', placar: '2-1', data: '14/04/2024', campeonato: 'ESL Pro League Season 19' },
    { adversario: 'G2', resultado: 'Derrota', placar: '0-2', data: '13/04/2024', campeonato: 'ESL Pro League Season 19' },
    { adversario: 'MOUZ', resultado: 'Vitória', placar: '2-0', data: '12/04/2024', campeonato: 'ESL Pro League Season 19' },
    { adversario: 'NAVI', resultado: 'Vitória', placar: '2-1', data: '11/04/2024', campeonato: 'ESL Pro League Season 19' }
  ],
  club: 'FURIA Club é o lugar onde o verdadeiro fã mostra que é raiz! Aqui, você testa seus conhecimentos sobre a história, os jogadores, os momentos icônicos e tudo que envolve a FURIA Esports. Cada resposta certa vale pontos — quanto mais você sabe, mais alto sobe no ranking dos fãs. Desafie seus amigos, conquiste seu lugar no topo e prove que seu sangue é preto e branco!',
  historia: 'A FURIA Esports foi fundada em 2017 e rapidamente se tornou uma das principais organizações de esports do Brasil. O time de CS:GO é conhecido por seu estilo agressivo de jogo e por representar o Brasil em competições internacionais. A FURIA é conhecida por seu estilo de jogo único, chamado de "FURIA Style", que combina agressividade com estratégia inovadora. Em 2023, a organização expandiu para outros jogos como Valorant e League of Legends.',
  estilo: 'O "FURIA Style" é caracterizado por jogadas agressivas, pressão constante e movimentações inesperadas. O time é conhecido por sua capacidade de adaptação e por surpreender os adversários com estratégias inovadoras. Com a chegada do FalleN em 2023, o estilo evoluiu para uma mistura perfeita entre agressividade e controle de mapa.',

  treinador: {
    nome: 'Hepa',
    nacionalidade: 'BR',
    idade: 33,
    tempoNaFuria: 'Desde 2023'
  },
  
  proximosJogos: [
    { adversario: 'A definir', data: 'Em breve', campeonato: 'ESL Pro League Season 20' },
    { adversario: 'A definir', data: 'Em breve', campeonato: 'BLAST Premier: Spring Finals 2024' }
  ],
    
  sugestoesPerguntas: [
    'Quem são os jogadores da FURIA?',
    'Qual é o estilo de jogo da FURIA?',
    'Quais são as conquistas da FURIA?',
    'Quem é o treinador da FURIA?',
    'Qual é a história da FURIA?',
    'Como está o desempenho dos jogadores?',
    'O que é o Furia Club?',
    'Quais são os próximos jogos da FURIA?',
    'Quem são os jogadores reservas?',
    'Qual é o próximo campeonato?',
    'Como foram as últimas partidas da FURIA?',
    'Qual foi o último resultado da FURIA?',
    'O time está indo bem?'
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
      content: 'Olá! Eu sou o Panthera o Chatbot da FURIA, como posso ajudar?\n\nPosso responder sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo\n- Treinador\n \n Quer saber mais sobre o Furia Club?\n O que você gostaria de saber? '
    }
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    setShowSuggestions(false);
    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulação de resposta da IA com atraso
    const response = generateResponse(input);
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: response
    };

    // Atraso aleatório entre 1 e 3 segundos
    const delay = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, delay);

    setInput('');
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Verifica saudações
    if (lowerQuery.match(/^(oi|olá|ola|e aí|fala|hey|hi|hello|salve|bom dia|boa tarde|boa noite)/i)) {
      const saudação = saudações[Math.floor(Math.random() * saudações.length)];
      return `${saudação} Como posso te ajudar hoje?\n\nPosso responder sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo\n- Treinador \n- Furia Club`;
    }

    // Verifica perguntas sobre o estado do bot
    if (lowerQuery.match(/(como você está|tudo bem|como vai|como está|está bem | tudo bem)/i)) {
      const resposta = respostasPositivas[Math.floor(Math.random() * respostasPositivas.length)];
      return `${resposta} O que você gostaria de saber sobre a FURIA?\n\nPosso falar sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo\n- Treinador \n- Furia Club`;
    }
    
    // Verifica perguntas sobre o desempenho do time
    if (lowerQuery.match(/(o time está indo bem|como está o time|como vai o time|desempenho|performance|resultados|como está a furia|como vai a furia|a furia está bem|a furia está indo bem)/i)) {
      return `O time está tendo um bom desempenho! Recentemente, a FURIA conquistou:\n${furiaData.conquistas.slice(0, 3).join('\n')}\n\nE nas últimas partidas:\n${furiaData.ultimasPartidas.slice(0, 3).map(p => 
        `${p.campeonato} - ${p.data}\nFURIA ${p.placar} ${p.adversario} (${p.resultado})`
      ).join('\n\n')}`;
    }
    
    // Verifica perguntas sobre próximos jogos - DEVE VIR ANTES DA VERIFICAÇÃO DE ESTILO DE JOGO
    if (lowerQuery.match(/(próximos? jogos?|proximos? jogos?|quando (vai|será|sera) (jogar|a partida)|futuros? jogos?|próximas? partidas?|proximas? partidas?|próximo campeonato|proximo campeonato)/i)) {
      return `Próximos jogos da FURIA:\n${furiaData.proximosJogos.map(j => 
        `${j.campeonato}\nAdversário: ${j.adversario}\nData: ${j.data}`
      ).join('\n\n')}`;
    }
    
    // Verifica perguntas sobre jogadores
    if (lowerQuery.match(/(jogadores|quem são os jogadores|quem sao os jogadores|roster|lineup|line-up|time atual|equipe atual|jogadores atuais|quem joga|quem joga na furia|jogadores da furia|time da furia|equipe da furia)/i)) {
      return `Os jogadores atuais da FURIA são:\n${furiaData.jogadores.map(j => 
        `${j.nome} - ${j.posicao} (${j.nacionalidade})\nIdade: ${j.idade} | K/D: ${j.kd}`
      ).join('\n\n')}`;
    }
    
    // Verifica perguntas sobre conquistas
    if (lowerQuery.match(/(conquistas?|títulos?|titulos?|vitórias?|vitorias?|achievements?|títulos? ganhos?|titulos? ganhos?|títulos? conquistados?|titulos? conquistados?|o que a furia já ganhou|o que a furia ja ganhou)/i)) {
      return `Principais conquistas da FURIA:\n${furiaData.conquistas.join('\n')}`;
    }
    
    // Verifica perguntas sobre Furia Club
    if (lowerQuery.match(/(furia club|o que é o furia club|como funciona o furia club|clube furia|club furia|o que é o club|o que e o club|o que é furia club|o que e furia club)/i)) {
      return furiaData.club;
    }
    
    // Verifica perguntas sobre história
    if (lowerQuery.match(/(historia|história|furia)/i)) {
      console.log('Match encontrado para história:', lowerQuery);
      return furiaData.historia;
    }

    // Verifica perguntas sobre estilo de jogo
    if (lowerQuery.match(/(estilo de jogo|furia style|como joga|tática|taticas|estratégia|estrategias|como a furia joga|estilo furia|como a furia joga|como o furia joga|como o furia joga|como joga a furia|como joga o furia)/i)) {
      return furiaData.estilo;
    }

    // Verifica perguntas sobre treinador
    if (lowerQuery.match(/(treinador|coach|guerri|hepa|quem treina|quem é o treinador|quem e o treinador|treinador da furia|coach da furia)/i)) {
      return `O treinador da FURIA é ${furiaData.treinador.nome}.\n\nDetalhes:\n- Nacionalidade: ${furiaData.treinador.nacionalidade}\n- Idade: ${furiaData.treinador.idade}\n- Tempo na FURIA: ${furiaData.treinador.tempoNaFuria}`;
    }

    // Verifica perguntas sobre últimas partidas
    if (lowerQuery.match(/(últimas? partidas?|ultimas? partidas?|últimos? jogos?|ultimos? jogos?|resultados? recentes?|partidas? recentes?|jogos? recentes?|últimos? resultados?|ultimos? resultados?|como foi a última|como foi a ultima|como foram as últimas|como foram as ultimas|como foi o último jogo|como foi o ultimo jogo|como foram os últimos jogos|como foram os ultimos jogos)/i)) {
      return `Últimas partidas da FURIA:\n${furiaData.ultimasPartidas.map(p => 
        `${p.campeonato} - ${p.data}\nFURIA ${p.placar} ${p.adversario} (${p.resultado})`
      ).join('\n\n')}`;
    }
    
    // Verifica perguntas sobre jogadores reservas
    if (lowerQuery.match(/(reservas?|substitutos?|banco|bench|jogadores? reservas?|quem são os reservas|quem sao os reservas|reservas da furia|substitutos da furia|banco da furia|bench da furia)/i)) {
      return `Jogadores reservas da FURIA:\n${furiaData.reservas.map(j => 
        `${j.nome} - ${j.posicao} (${j.nacionalidade})\nIdade: ${j.idade} | K/D: ${j.kd}`
      ).join('\n\n')}`;
    }
    
    // Verifica agradecimentos
    if (lowerQuery.match(/(obrigado|obrigada|valeu|vlw|thanks|thank you)/i)) {
      return 'Por nada, tamo junto ! Estou aqui para ajudar. Tem mais alguma dúvida sobre a FURIA?\n\nPosso falar sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo\n- Treinador \n- Furia Club';
    }
    
    return 'Desculpe, não entendi sua pergunta. Você pode perguntar sobre:\n- Jogadores e suas estatísticas\n- Conquistas do time\n- História da FURIA\n- Estilo de jogo \n- Furia Club \n- Treinador\n\nOu pode tentar uma dessas perguntas:\n' + furiaData.sugestoesPerguntas.map(p => `- ${p}`).join('\n');
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
          {isTyping && (
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EB0029] flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="rounded-lg p-3 text-white bg-white/10">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
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
