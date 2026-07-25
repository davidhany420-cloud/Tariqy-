import React, { useState } from 'react';
import { SchoolRoute } from '../../types';
import { EGYPT_GOVERNORATES } from '../../data/mockData';

interface SchoolRoutesProps {
  routes: SchoolRoute[];
  onBack: () => void;
  onSelectRoute: (route: SchoolRoute) => void;
}

export const SchoolRoutes: React.FC<SchoolRoutesProps> = ({
  routes,
  onBack,
  onSelectRoute,
}) => {
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('الكل');

  const filteredRoutes = selectedGovernorate === 'الكل'
    ? routes
    : routes.filter((r) => r.governorate === selectedGovernorate);

  return (
    <div className="p-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/10 text-white font-extrabold flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          ➔
        </button>
        <h2 className="text-base font-black text-[#c1a35f]">
          خطوط المدارس حسب المحافظات
        </h2>
        <div className="w-8"></div>
      </div>

      {/* Governorate Filter Pills */}
      <div>
        <div className="text-xs font-bold text-slate-400 mb-2">
          📍 اختر المحافظة للتصفية:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {EGYPT_GOVERNORATES.map((gov) => (
            <button
              key={gov}
              onClick={() => setSelectedGovernorate(gov)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                selectedGovernorate === gov
                  ? 'bg-[#c1a35f] text-slate-950 shadow-sm border-2 border-[#c1a35f]'
                  : 'bg-[#0a0a0a] text-slate-300 border border-white/10 hover:bg-white/[0.05]'
              }`}
            >
              {gov}
            </button>
          ))}
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-2.5">
        {filteredRoutes.length === 0 ? (
          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 text-center text-slate-400 text-xs font-bold">
            لا توجد خطوط مدارس مسجلة في هذه المحافظة حالياً.
          </div>
        ) : (
          filteredRoutes.map((route) => (
            <div
              key={route.id}
              onClick={() => onSelectRoute(route)}
              className="bg-[#0a0a0a] rounded-2xl p-3.5 border border-white/10 hover:border-[#c1a35f] active:scale-98 transition-all cursor-pointer shadow-md flex items-start gap-3"
            >
              <div className="w-11 h-11 bg-[#c1a35f]/10 rounded-xl border border-[#c1a35f]/30 flex items-center justify-center text-2xl shrink-0 mt-0.5">
                🚌
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-extrabold text-white text-xs leading-tight truncate">
                    {route.title}
                  </h3>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                      route.seatsLeft <= 1
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    متبقي {route.seatsLeft} مقاعد
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 font-semibold space-y-0.5">
                  <div>🏫 {route.schoolName}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mt-1 pt-1 border-t border-white/10">
                    <span>⏰ الذهاب: {route.departureTime}</span>
                    <span className="text-[#c1a35f] font-black">
                      {route.pricePerMonth}ج / شهرياً
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
