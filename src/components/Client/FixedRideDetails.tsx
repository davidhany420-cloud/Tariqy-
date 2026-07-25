import React, { useState } from 'react';

interface FixedRideDetailsProps {
  onBack: () => void;
  onSubmitDetails: (from: string, to: string, time: string) => void;
}

export const FixedRideDetails: React.FC<FixedRideDetailsProps> = ({
  onBack,
  onSubmitDetails,
}) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('08:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocation.trim() || !toLocation.trim()) return;
    onSubmitDetails(fromLocation, toLocation, pickupTime);
  };

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
          تفاصيل المشوار الثابت
        </h2>
        <div className="w-8"></div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#c1a35f]/30 p-3 rounded-2xl text-xs text-[#e0dcd0] font-extrabold space-y-1">
        <span>💡 المشاوير الثابتة تناسب الموظفين والأفراد للذهاب والعودة اليومية بأمان</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            📍 نقطة التحرك (منين بالضبط؟)
          </label>
          <input
            type="text"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            required
            placeholder="مثال: شارع التحرير، الدقي، العمارة رقم 12"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            🎯 نقطة الوصول (لحد فين؟)
          </label>
          <input
            type="text"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            required
            placeholder="مثال: المبنى الإداري، التجمع الخامس"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            ⏰ موعد التحرك اليومي
          </label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 font-black py-3.5 px-4 rounded-2xl text-xs transition-all shadow-md shadow-[#c1a35f]/20 active:scale-98 mt-2"
        >
          متابعة لاختيار السيارة والتفاوض بالسعر ➔
        </button>
      </form>
    </div>
  );
};
