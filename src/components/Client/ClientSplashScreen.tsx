import React from 'react';

interface ClientSplashScreenProps {
  onStartClient: () => void;
  onStartDriver: () => void;
}

export const ClientSplashScreen: React.FC<ClientSplashScreenProps> = ({
  onStartClient,
  onStartDriver,
}) => {
  return (
    <div className="flex-1 min-h-[80vh] flex flex-col justify-between bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] text-[#e0dcd0] p-6 text-center rounded-b-3xl">
      <div className="my-auto py-8 flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-[#c1a35f] rounded-full flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(193,163,95,0.3)] border-4 border-[#0a0a0a] animate-pulse">
            🚕
          </div>
          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-950">
            مفعل 🟢
          </span>
        </div>

        <h1 className="text-4xl font-black text-[#c1a35f] tracking-tight mb-2">
          تطبيق طريقي
        </h1>
        <p className="text-xs text-slate-400 font-bold max-w-xs leading-relaxed">
          تطبيق دورات المدارس والمشاوير الثابتة في مصر مع التتبع الحي للـ GPS
        </p>

        <div className="mt-6 flex items-center gap-2 text-[11px] text-[#c1a35f] bg-[#c1a35f]/10 px-3 py-1.5 rounded-full border border-[#c1a35f]/30 font-bold">
          <span>⚡</span>
          <span>خدمة توصيل آمنة وموثوقة 100%</span>
        </div>
      </div>

      <div className="space-y-3 pb-4">
        <button
          onClick={onStartClient}
          className="w-full bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 py-3.5 px-4 rounded-2xl text-sm font-black transition-all shadow-lg shadow-[#c1a35f]/20 active:scale-98"
        >
          دخول (حجز خدمة جديدة) ➔
        </button>

        <button
          onClick={onStartDriver}
          className="w-full bg-transparent hover:bg-white/[0.05] text-[#c1a35f] border-2 border-[#c1a35f]/80 py-3 px-4 rounded-2xl text-xs font-black transition-all active:scale-98"
        >
          تسجيل كابتن جديد (سائق) 🚗
        </button>
      </div>
    </div>
  );
};
