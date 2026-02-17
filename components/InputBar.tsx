
import React, { useState, useRef, useEffect } from 'react';

interface InputBarProps {
  onSend: (text: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ onSend }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="px-4 md:px-0 mb-4">
      <div className="max-w-3xl mx-auto relative group">
        <div className="relative flex items-end bg-[#1e1f20] rounded-[28px] overflow-hidden border border-[#333537] focus-within:border-[#4285f4] transition-all p-2 pr-4 pl-6 shadow-sm">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a prompt here"
            className="flex-1 bg-transparent border-none outline-none resize-none py-3 pr-4 max-h-[200px] text-[#e3e3e3] placeholder-[#8e918f] scrollbar-hide"
          />
          <div className="flex items-center gap-2 pb-2">
            <button className="p-2 hover:bg-[#282a2c] rounded-full text-[#c4c7c5] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
            </button>
            <button className="p-2 hover:bg-[#282a2c] rounded-full text-[#c4c7c5] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            </button>
            <button 
              onClick={() => handleSubmit()}
              disabled={!input.trim()}
              className={`p-2 rounded-full transition-all ${
                input.trim() 
                  ? 'bg-[#4285f4] text-white hover:bg-[#1a73e8]' 
                  : 'text-[#444746] cursor-not-allowed'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputBar;
