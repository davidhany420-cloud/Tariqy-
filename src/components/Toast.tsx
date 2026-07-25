import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-sm bg-[#0a0a0a] border-2 border-[#c1a35f] text-white py-3 px-4 rounded-2xl shadow-2xl text-xs font-extrabold text-center animate-bounce">
      <div className="flex items-center justify-center gap-2">
        <span className="text-[#c1a35f] text-base">✨</span>
        <span>{message}</span>
      </div>
    </div>
  );
};
