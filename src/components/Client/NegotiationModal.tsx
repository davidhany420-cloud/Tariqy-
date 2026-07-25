import React, { useState } from 'react';
import { VehicleOption } from '../../types';

interface NegotiationModalProps {
  vehicle: VehicleOption | null;
  isOpen: boolean;
  onClose: () => void;
  onAcceptPrice: (vehicleName: string, price: number) => void;
  onProposeNewPrice: (vehicleName: string, newPrice: number) => void;
}

export const NegotiationModal: React.FC<NegotiationModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onAcceptPrice,
  onProposeNewPrice,
}) => {
  const [showCounterInput, setShowCounterInput] = useState(false);
  const [counterPrice, setCounterPrice] = useState<number>(vehicle ? vehicle.defaultPrice - 10 : 50);

  if (!isOpen || !vehicle) return null;

  const handleCounterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (counterPrice > 0) {
      onProposeNewPrice(vehicle.name, counterPrice);
      setShowCounterInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0a0a0a] w-full max-w-sm rounded-3xl p-5 border-2 border-[#c1a35f] shadow-2xl text-center space-y-4">
        <div className="w-14 h-14 bg-[#c1a35f]/10 rounded-full flex items-center justify-center text-3xl mx-auto border-2 border-[#c1a35f]/40">
          🤝
        </div>

        <div>
          <h3 className="text-sm font-black text-white">
            عرض السعر المقترح • {vehicle.name}
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-1 leading-relaxed">
            الكابتن اقترح سعر{' '}
            <strong className="text-[#c1a35f] font-black text-sm">
              {vehicle.defaultPrice} جنيه
            </strong>{' '}
            للمشوار الثابت اليومي. هل السعر مناسب لك؟
          </p>
        </div>

        {!showCounterInput ? (
          <div className="space-y-2 pt-1">
            <button
              onClick={() => onAcceptPrice(vehicle.name, vehicle.defaultPrice)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl text-xs font-black transition-all shadow-md active:scale-98"
            >
              عاجبني والسعر مناسب (تأكيد) ✔
            </button>

            <button
              onClick={() => {
                setCounterPrice(Math.max(10, vehicle.defaultPrice - 15));
                setShowCounterInput(true);
              }}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white py-2.5 px-4 rounded-xl text-xs font-black transition-all active:scale-98"
            >
              مش عاجبني (هأنقص السعر) 💸
            </button>

            <button
              onClick={onClose}
              className="w-full text-slate-400 text-[11px] font-bold py-1 hover:text-slate-300"
            >
              إلغاء
            </button>
          </div>
        ) : (
          <form onSubmit={handleCounterSubmit} className="space-y-3 pt-1">
            <div className="text-xs font-black text-slate-300">
              اكتب السعر الجديد الذي تقترحه (بالجنيه):
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                type="number"
                value={counterPrice}
                onChange={(e) => setCounterPrice(Number(e.target.value))}
                min="10"
                max="5000"
                required
                className="w-32 bg-[#050505] border-2 border-[#c1a35f] rounded-xl px-3 py-2 text-center text-sm font-black text-white focus:outline-none"
              />
              <span className="text-xs font-extrabold text-slate-400">جنيه</span>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 py-2.5 rounded-xl text-xs font-black transition-all"
              >
                إرسال العرض للكابتن ➔
              </button>
              <button
                type="button"
                onClick={() => setShowCounterInput(false)}
                className="bg-white/10 text-slate-300 px-3 py-2.5 rounded-xl text-xs font-bold"
              >
                رجوع
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
