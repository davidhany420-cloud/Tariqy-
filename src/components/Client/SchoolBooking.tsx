import React, { useState } from 'react';
import { SchoolRoute, SchoolBookingData } from '../../types';

interface SchoolBookingProps {
  route: SchoolRoute;
  onBack: () => void;
  onSubmitBooking: (booking: SchoolBookingData) => void;
}

export const SchoolBooking: React.FC<SchoolBookingProps> = ({
  route,
  onBack,
  onSubmitBooking,
}) => {
  const [studentName, setStudentName] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [schoolAndGrade, setSchoolAndGrade] = useState(route.schoolName || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !pickupAddress.trim()) {
      return;
    }
    onSubmitBooking({
      routeTitle: route.title,
      studentName,
      pickupAddress,
      schoolAndGrade,
    });
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
          بيانات حجز دورة المدرسة
        </h2>
        <div className="w-8"></div>
      </div>

      {/* Selected Route Summary Banner */}
      <div className="bg-[#0a0a0a] border border-[#c1a35f]/30 p-3 rounded-2xl text-xs text-[#e0dcd0] font-bold space-y-1">
        <div className="text-[#c1a35f] font-black text-xs">🚌 {route.title}</div>
        <div className="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-white/10">
          <span>سائق الخط: {route.captainName}</span>
          <span className="font-extrabold text-[#c1a35f]">{route.pricePerMonth} ج/شهرياً</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            👶 اسم الطالب / الطالبة بالكامل
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            placeholder="مثال: يوسف أحمد علي"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            🏠 عنوان استلام الطالب (منين؟)
          </label>
          <input
            type="text"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            required
            placeholder="مثال: الشارع الرئيسي، عمارة 14، المحافظة"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            🏫 اسم المدرسة والصف الدراسي
          </label>
          <input
            type="text"
            value={schoolAndGrade}
            onChange={(e) => setSchoolAndGrade(e.target.value)}
            required
            placeholder="مثال: مدرسة المستقبل - الصف الرابع الابتدائي"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 font-black py-3.5 px-4 rounded-2xl text-xs transition-all shadow-md shadow-[#c1a35f]/20 active:scale-98 mt-2"
        >
          تأكيد الحجز والدخول لجروب الخط والتتبع ✔
        </button>
      </form>
    </div>
  );
};
