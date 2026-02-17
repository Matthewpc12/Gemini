
import React, { useRef, useEffect } from 'react';
import { Role, Message } from '../types';

interface ChatAreaProps {
  messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-4xl font-medium mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 text-transparent bg-clip-text">
          Hello, user
        </div>
        <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Help me write" desc="an email to decline a meeting" icon="✨" />
          <Card title="Analyze code" desc="and suggest improvements" icon="💻" />
          <Card title="Explain" desc="how large language models work" icon="📝" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-0">
      <div className="max-w-3xl mx-auto py-8">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className={`flex gap-4 ${msg.role === Role.USER ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs ${
                msg.role === Role.MODEL 
                  ? 'bg-[#1a73e8]' 
                  : 'bg-gradient-to-tr from-orange-400 to-red-400'
              }`}>
                {msg.role === Role.MODEL ? 'G' : 'U'}
              </div>
              <div className={`flex flex-col max-w-[85%] ${msg.role === Role.USER ? 'items-end' : ''}`}>
                <div className={`p-4 rounded-2xl ${
                  msg.role === Role.USER ? 'bg-[#282a2c] text-[#e3e3e3]' : 'text-[#e3e3e3]'
                }`}>
                  {msg.isThinking ? (
                    <div className="flex gap-1 py-1">
                      <span className="w-1.5 h-1.5 bg-[#8e918f] rounded-full typing-dot"></span>
                      <span className="w-1.5 h-1.5 bg-[#8e918f] rounded-full typing-dot"></span>
                      <span className="w-1.5 h-1.5 bg-[#8e918f] rounded-full typing-dot"></span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; desc: string; icon: string }> = ({ title, desc, icon }) => (
  <div className="bg-[#1e1f20] hover:bg-[#282a2c] p-5 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-[#333537]">
    <div className="text-xl mb-4">{icon}</div>
    <div className="font-medium text-[#e3e3e3] text-sm mb-1">{title}</div>
    <div className="text-[#8e918f] text-xs">{desc}</div>
  </div>
);

export default ChatArea;
