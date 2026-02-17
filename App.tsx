
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Role, Message, ChatSession } from './types';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import InputBar from './components/InputBar';

const App: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 'default',
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: text,
      timestamp: new Date(),
    };

    // Update current session with user message and thinking state
    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        const newTitle = s.messages.length === 0 ? text.slice(0, 30) : s.title;
        return {
          ...s,
          title: newTitle,
          messages: [...s.messages, userMsg, {
            id: 'thinking-' + Date.now(),
            role: Role.MODEL,
            content: '',
            timestamp: new Date(),
            isThinking: true
          }],
        };
      }
      return s;
    }));

    // Realistic reasoning delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // The core functionality: "idk"
    const response = "idk";

    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        const filteredMessages = s.messages.filter(m => !m.isThinking);
        return {
          ...s,
          messages: [...filteredMessages, {
            id: (Date.now() + 1).toString(),
            role: Role.MODEL,
            content: response,
            timestamp: new Date(),
          }],
        };
      }
      return s;
    }));
  }, [currentSessionId]);

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
  };

  const deleteChat = (id: string) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      if (filtered.length === 0) {
        return [{
          id: 'default',
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
        }];
      }
      return filtered;
    });
    if (currentSessionId === id) {
      setCurrentSessionId(sessions[0].id);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#131314] text-[#e3e3e3] overflow-hidden">
      <Sidebar 
        sessions={sessions} 
        currentId={currentSessionId} 
        onSelect={setCurrentSessionId} 
        onNewChat={createNewChat}
        onDeleteChat={deleteChat}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <main className={`flex-1 flex flex-col relative transition-all duration-300`}>
        {/* Header */}
        <header className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-[#282a2c] rounded-full"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
              </button>
            )}
            <div className="text-xl font-medium text-[#c4c7c5]">Gemini</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
            U
          </div>
        </header>

        <ChatArea messages={currentSession.messages} />
        
        <InputBar onSend={handleSendMessage} />
        
        <footer className="py-3 px-6 text-center text-[10px] text-[#8e918f]">
          Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
        </footer>
      </main>
    </div>
  );
};

export default App;
