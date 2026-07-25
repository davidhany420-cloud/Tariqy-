import React from 'react';
import { VehicleOption } from '../../types';

interface FixedRideCarsProps {
  vehicles: VehicleOption[];
  onBack: () => void;
  onSelectVehicle: (vehicle: VehicleOption) => void;
}

export const FixedRideCars: React.FC<FixedRideCarsProps> = ({
  vehicles,
  onBack,
  onSelectVehicle,
}) => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/10 text-white font-extrabold flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          ➔
        </button>
        <h2 className="text-base font-black text-[#c1a35f]">
          اختر فئة السيارة (المشاوير الثابتة)
        </h2>
        <div className="w-8"></div>
      </div>

      <div className="text-xs font-bold text-slate-400">
        اضغط على السيارة لاقتراح السعر والتفاوض المباشر مع الكابتن:
      </div>

      <div className="space-y-3">
        {vehicles.map((v) => (
          <div
            key={v.id}
            onClick={() => onSelectVehicle(v)}
            className="bg-[#0a0a0a] rounded-2xl p-4 border border-white/10 hover:border-[#c1a35f] active:scale-98 transition-all cursor-pointer shadow-md flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 bg-[#c1a35f]/10 rounded-2xl border border-[#c1a35f]/30 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
              {v.icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-extrabold text-white text-xs">
                  {v.name}
                </h3>
                <span
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full border bg-[#c1a35f]/20 text-[#c1a35f] border-[#c1a35f]/40"
                >
                  {v.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                {v.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
