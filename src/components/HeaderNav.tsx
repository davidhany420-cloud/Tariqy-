import React from 'react';
import { MainTab } from '../types';

interface HeaderNavProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-white/10 shadow-xl">
      <div className="max-w-md mx-auto px-3 py-2.5 flex items-center justify-between gap-1.5">
        <button
          onClick={() => setActiveTab('client')}
          className={`flex-1 py-2 px-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            activeTab === 'client'
              ? 'bg-[#c1a35f] text-slate-950 shadow-lg shadow-[#c1a35f]/20 border-2 border-[#c1a35f] font-black'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <span>📱</span>
          <span>واجهة العميل</span>
        </button>

        <button
          onClick={() => setActiveTab('driver')}
          className={`flex-1 py-2 px-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            activeTab === 'driver'
              ? 'bg-[#c1a35f] text-slate-950 shadow-lg shadow-[#c1a35f]/20 border-2 border-[#c1a35f] font-black'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <span>🚗</span>
          <span>واجهة السائق</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex-1 py-2 px-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            activeTab === 'admin'
              ? 'bg-[#c1a35f] text-slate-950 shadow-lg shadow-[#c1a35f]/20 border-2 border-[#c1a35f] font-black'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <span>⚙️</span>
          <span>لوحة الأدمن</span>
        </button>
      </div>
    </header>
  );
};
