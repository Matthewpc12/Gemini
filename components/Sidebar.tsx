
import React from 'react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  sessions, 
  currentId, 
  onSelect, 
  onNewChat, 
  onDeleteChat,
  isOpen, 
  toggleSidebar 
}) => {
  if (!isOpen) return null;

  return (
    <aside className="w-[300px] h-full bg-[#1e1f20] flex flex-col border-r border-[#282a2c] z-20">
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-[#282a2c] rounded-full transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </button>
      </div>

      <div className="px-4 mb-4">
        <button 
          onClick={onNewChat}
          className="flex items-center gap-3 w-full p-4 bg-[#282a2c] hover:bg-[#333537] rounded-full transition-colors text-sm font-medium"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <div className="px-3 mb-2 text-xs font-medium text-[#c4c7c5]">Recent</div>
        {sessions.map((session) => (
          <div key={session.id} className="group relative">
            <button
              onClick={() => onSelect(session.id)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-left rounded-full text-sm transition-colors mb-1 ${
                currentId === session.id ? 'bg-[#333537]' : 'hover:bg-[#282a2c]'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#c4c7c5]"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>
              <span className="truncate flex-1">{session.title}</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDeleteChat(session.id); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
            >
               <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#282a2c]">
        <div className="flex items-center gap-3 p-3 rounded-full hover:bg-[#282a2c] cursor-pointer text-sm">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
           Help
        </div>
        <div className="flex items-center gap-3 p-3 rounded-full hover:bg-[#282a2c] cursor-pointer text-sm">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.21.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
           Settings
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
