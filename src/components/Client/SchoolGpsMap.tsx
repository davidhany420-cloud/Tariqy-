import React, { useState } from 'react';
import { SchoolRoute, SchoolBookingData } from '../../types';

interface SchoolGpsMapProps {
  route: SchoolRoute;
  booking: SchoolBookingData | null;
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const SchoolGpsMap: React.FC<SchoolGpsMapProps> = ({
  route,
  booking,
  onBack,
  onShowToast,
}) => {
  const [step, setStep] = useState<number>(0);

  const stepsInfo = [
    {
      pinBottom: '95px',
      pinRight: '110px',
      instruction: 'استمر في سيرك نحو منزل الطالب المخصص',
      eta: '7 دقائق',
      distance: '2.4 كم',
      speed: '48 كم/س',
      status: 'الحالة: الباص في طريقه لمنزل الطالب 🟢',
    },
    {
      pinBottom: '160px',
      pinRight: '200px',
      instruction: 'اصعد يميناً في شارع المدارس الرئيسي',
      eta: '4 دقائق',
      distance: '1.2 كم',
      speed: '42 كم/س',
      status: 'الحالة: الباص اقترب من منزل الطالب 🟡',
    },
    {
      pinBottom: '230px',
      pinRight: '280px',
      instruction: 'الباص على بعد خطوات من باب البيت لاستلام الطالب',
      eta: 'دقيقة واحدة',
      distance: '150 متر',
      speed: '25 كم/س',
      status: 'الحالة: الباص وصل أمام المنزل تماماً 🟢',
    },
    {
      pinBottom: '270px',
      pinRight: '320px',
      instruction: 'الباص انطلق بالطالب ويقترب من بوابات المدرسة',
      eta: '0 دقيقة',
      distance: '0 كم',
      speed: '0 كم/س',
      status: 'وصل الطالب للمدرسة بسلام 🏫✨',
    },
  ];

  const currentStep = stepsInfo[step];

  const handleNextStep = () => {
    const next = (step + 1) % stepsInfo.length;
    setStep(next);
    if (next === 3) {
      onShowToast('🔔 إشعار وصول: وصل الطالب إلى المدرسة الآن بنجاح!');
    } else {
      onShowToast(`تحديث موقع الباص: ${stepsInfo[next].eta}`);
    }
  };

  return (
    <div className="p-4 space-y-3">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/10 text-white font-extrabold flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          ➔
        </button>
        <h2 className="text-xs font-black text-[#c1a35f]">
          🗺️ خريطة تتبع دورة المدرسة الحي
        </h2>
        <div className="w-8"></div>
      </div>

      {/* Real GPS Vector Container */}
      <div className="w-full h-[320px] bg-[#050505] rounded-2xl relative overflow-hidden border border-white/10 shadow-xl flex flex-col justify-between">
        {/* Grid Background Lines */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(193, 163, 95, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(193, 163, 95, 0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        ></div>

        {/* Top Direction Instruction Banner */}
        <div className="relative z-10 m-2.5 p-2.5 bg-[#0a0a0a]/95 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between gap-2.5 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-[#c1a35f] text-slate-950 flex items-center justify-center font-black text-sm shrink-0">
            ➔
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-black text-white truncate">
              {currentStep.instruction}
            </h5>
            <p className="text-[10px] text-[#c1a35f] font-bold mt-0.5">
              الانعطاف القادم خلال 250 متر • {route.captainName}
            </p>
          </div>
        </div>

        {/* Route Line SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
          viewBox="0 0 400 320"
        >
          <path
            d="M 60 270 Q 150 200, 220 150 T 330 60"
            fill="none"
            stroke="#c1a35f"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="6,6"
            className="opacity-80"
          />
        </svg>

        {/* Waypoints */}
        <div className="absolute bottom-5 right-5 z-[5] bg-[#0a0a0a] text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/10 shadow-md flex items-center gap-1">
          <span>🏠</span>
          <span>منزل الطالب</span>
        </div>

        <div className="absolute top-16 left-5 z-[5] bg-[#0a0a0a] text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-[#c1a35f]/50 shadow-md flex items-center gap-1">
          <span>🏫</span>
          <span>المدرسة</span>
        </div>

        {/* Animated Moving Vehicle Pin */}
        <div
          className="absolute z-[8] w-11 h-11 bg-[#c1a35f] rounded-full flex items-center justify-center text-xl shadow-[0_0_20px_rgba(193,163,95,0.9)] border-2 border-white transition-all duration-700 ease-in-out"
          style={{
            bottom: currentStep.pinBottom,
            right: currentStep.pinRight,
            transform: 'translate(50%, 50%)',
          }}
        >
          <span>🚌</span>
          <span className="absolute -inset-2 rounded-full border-2 border-[#c1a35f]/50 animate-ping"></span>
        </div>

        {/* HUD Navigation Footer */}
        <div className="relative z-10 m-2.5 p-2 bg-[#0a0a0a]/95 backdrop-blur-md rounded-xl border border-white/10 flex justify-between items-center text-center">
          <div className="flex-1 border-l border-white/10">
            <div className="text-xs font-black text-[#c1a35f]">
              {currentStep.eta}
            </div>
            <div className="text-[9px] font-bold text-slate-400">الوقت المقدر</div>
          </div>
          <div className="flex-1 border-l border-white/10">
            <div className="text-xs font-black text-[#c1a35f]">
              {currentStep.distance}
            </div>
            <div className="text-[9px] font-bold text-slate-400">المسافة</div>
          </div>
          <div className="flex-1">
            <div className="text-xs font-black text-[#c1a35f]">
              {currentStep.speed}
            </div>
            <div className="text-[9px] font-bold text-slate-400">السرعة</div>
          </div>
        </div>
      </div>

      {/* GPS Status Card & Move Controls */}
      <div className="bg-[#0a0a0a] p-3 rounded-2xl border border-white/10 flex justify-between items-center shadow-md">
        <span className="text-xs font-black text-white">
          {currentStep.status}
        </span>
        <button
          onClick={handleNextStep}
          className="bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95"
        >
          تحريك الباص 🔄
        </button>
      </div>

      <button
        onClick={() => {
          setStep(3);
          onShowToast('🔔 تم تسجيل وصول الطالب إلى المدرسة بنجاح!');
        }}
        className="w-full bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 font-black py-3 px-4 rounded-2xl text-xs transition-all shadow-md active:scale-98"
      >
        🔔 محاكاة وصول الطالب للمدرسة
      </button>
    </div>
  );
};
