import React from 'react';

interface ClientHomeProps {
  onSelectSchoolService: () => void;
  onSelectFixedRideService: () => void;
}

export const ClientHome: React.FC<ClientHomeProps> = ({
  onSelectSchoolService,
  onSelectFixedRideService,
}) => {
  return (
    <div className="p-4 space-y-4">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-[#0a0a0a] p-3.5 rounded-2xl border border-white/10 shadow-md">
        <div>
          <div className="text-[11px] font-bold text-slate-400">مرحباً بك 👋</div>
          <div className="text-base font-black text-white">اختر الخدمة المطلوبة:</div>
        </div>
        <div className="w-10 h-10 bg-[#c1a35f]/10 rounded-full flex items-center justify-center text-xl border border-[#c1a35f]/30">
          👤
        </div>
      </div>

      {/* Service Option 1: School Routes */}
      <div
        onClick={onSelectSchoolService}
        className="group bg-[#0a0a0a] rounded-2xl p-4 border border-white/10 shadow-md hover:border-[#c1a35f] active:scale-98 transition-all cursor-pointer relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-2 h-full bg-[#c1a35f]"></div>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-[#c1a35f]/10 rounded-2xl border border-[#c1a35f]/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
            🚌
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm">
                دورة المدرسة
              </h3>
              <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                متاح الآن
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-semibold leading-relaxed">
              خطوط توصيل الطلاب والمدارس بانتظام حسب المحافظات مع تتبع الـ GPS الحي
            </p>
          </div>
        </div>
      </div>

      {/* Service Option 2: Fixed Rides */}
      <div
        onClick={onSelectFixedRideService}
        className="group bg-[#0a0a0a] rounded-2xl p-4 border border-white/10 shadow-md hover:border-[#c1a35f] active:scale-98 transition-all cursor-pointer relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-2 h-full bg-[#c1a35f]/60"></div>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-white/[0.05] rounded-2xl border border-white/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
            💼
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white text-sm">
                مشاوير ثابتة (موظفين / أفراد)
              </h3>
              <span className="text-[10px] font-extrabold bg-[#c1a35f]/10 text-[#c1a35f] px-2 py-0.5 rounded-full border border-[#c1a35f]/30">
                تفاوض ذكي
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-semibold leading-relaxed">
              تنسيق خط سير مباشر يومي مع السائق، اختيار الفئة والتفاوض بالسعر
            </p>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-[#0a0a0a] text-white p-4 rounded-2xl border border-[#c1a35f]/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-[#c1a35f]">🛡️ ضمان طريقي والأمان</span>
          <span className="text-[10px] bg-[#c1a35f]/20 text-[#c1a35f] px-2 py-0.5 rounded-md font-bold">100% موثوق</span>
        </div>
        <p className="text-[11px] text-slate-300 font-semibold leading-relaxed">
          جميع السائقين معتمدون ومفعلون برخصة قيادة وبطاقة رقم قومي مسجلة لدى أدمن التطبيق.
        </p>
      </div>
    </div>
  );
};
