import React, { useState } from 'react';
import { ChatMessage, SchoolRoute, SchoolBookingData } from '../../types';

interface SchoolChatProps {
  route: SchoolRoute;
  booking: SchoolBookingData | null;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onOpenGpsMap: () => void;
  onBack: () => void;
}

export const SchoolChat: React.FC<SchoolChatProps> = ({
  route,
  booking,
  messages,
  onSendMessage,
  onOpenGpsMap,
  onBack,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="p-4 flex flex-col h-[78vh]">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/10 text-white font-extrabold flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          ➔
        </button>

        <div className="text-center">
          <h2 className="text-xs font-black text-[#c1a35f]">
            جروب {route.title}
          </h2>
          <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{route.captainName} متصل الآن</span>
          </div>
        </div>

        <button
          onClick={onOpenGpsMap}
          className="bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 px-2.5 py-1.5 rounded-xl text-[11px] font-black shadow-sm flex items-center gap-1 active:scale-95 transition-all"
        >
          <span>🗺️</span>
          <span>الـ GPS الحي</span>
        </button>
      </div>

      {/* Student Booking Info Banner */}
      {booking && (
        <div className="my-2 bg-[#0a0a0a] border border-[#c1a35f]/30 rounded-xl p-2.5 text-[11px] font-extrabold text-[#e0dcd0] flex justify-between items-center">
          <span>👶 الطالب: {booking.studentName}</span>
          <span className="text-[#c1a35f]">📍 {booking.pickupAddress}</span>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-[#c1a35f] text-slate-950 font-bold ml-auto rounded-tl-sm shadow-sm'
                : 'bg-[#0a0a0a] text-white font-medium border border-white/10 mr-auto rounded-tr-sm shadow-sm'
            }`}
          >
            <div className="text-[10px] font-black opacity-60 mb-0.5 flex justify-between gap-4">
              <span>{msg.senderName}</span>
              <span>{msg.timestamp}</span>
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="pt-2 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="اكتب رسالة للكابتن..."
          className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
        />
        <button
          type="submit"
          className="bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95"
        >
          إرسال
        </button>
      </form>
    </div>
  );
};
