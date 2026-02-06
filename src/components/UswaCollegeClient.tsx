"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, UserCheck } from 'lucide-react';

export default function UswaCollegeClient() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Assalam-o-Alaikum! I'm USWA College AI assistant. You can ask me about Admissions, Fees, Staff, etc." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Sorry, I don't have info about that. You can call our office at 0301-0637955.";
      if (userMsg.includes("admission")) reply = "Admissions 2026 are open! You can apply in FSC and ICS.";
      else if (userMsg.includes("fee")) reply = "Please visit admin office or call for the latest fee structure.";
      else if (userMsg.includes("principal")) reply = "Our Principal is Mr. Abbas, focused on education.";
      else if (userMsg.includes("hello") || userMsg.includes("hi") || userMsg.includes("asalam")) reply = "Wa Alaikum Assalam! How can I help you today?";

      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[102] flex flex-col items-end gap-4">
      {isChatOpen && (
        <div className="bg-white w-full md:w-[400px] h-[550px] rounded-[3rem] shadow-2xl z-[103] flex flex-col border-4 border-blue-900 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-blue-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <UserCheck size={20} className="text-yellow-400" />
              <div>
                <h4 className="font-black text-xs uppercase">USWA AI Help</h4>
                <p className="text-[9px] font-bold text-green-400 mt-1">Online</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} title="Close Chat"><X size={24} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-black ${m.role === 'user' ? 'bg-blue-900 text-white' : 'bg-white text-slate-700 border'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-blue-500 animate-pulse">AI Typing...</div>}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type here..." className="flex-1 bg-slate-100 p-4 rounded-2xl text-xs outline-none focus:border-blue-900" />
            <button type="submit" className="bg-blue-900 text-white p-4 rounded-2xl shadow-xl" title="Send Message"><Send size={18} /></button>
          </form>
        </div>
      )}

      <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-blue-900 text-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-3 animate-bounce" title="Open AI Support">
        <MessageCircle size={28} />
        <span className="font-black text-xs uppercase hidden md:block">AI Support</span>
      </button>
    </div>
  );
}