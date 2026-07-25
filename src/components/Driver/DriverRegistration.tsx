import React, { useState } from 'react';
import { EGYPT_GOVERNORATES } from '../../data/mockData';

interface DriverRegistrationProps {
  onGoToInstaPay: (driverInfo: {
    fullName: string;
    phone: string;
    governorate: string;
    vehicleModel: string;
    nationalIdFile: string;
    licenseFile: string;
  }) => void;
}

export const DriverRegistration: React.FC<DriverRegistrationProps> = ({
  onGoToInstaPay,
}) => {
  const [fullName, setFullName] = useState('أحمد محمد السيد');
  const [phone, setPhone] = useState('01098765432');
  const [governorate, setGovernorate] = useState('القاهرة');
  const [vehicleModel, setVehicleModel] = useState('ميكروباص تويوتا 2022 مكيف');
  const [nationalIdFile, setNationalIdFile] = useState<string | null>(null);
  const [licenseFile, setLicenseFile] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'id' | 'license'
  ) => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      if (type === 'id') {
        setNationalIdFile(name);
      } else {
        setLicenseFile(name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGoToInstaPay({
      fullName,
      phone,
      governorate,
      vehicleModel,
      nationalIdFile: nationalIdFile || 'بطاقة_الرقم_القومي.jpg',
      licenseFile: licenseFile || 'رخصة_السيارة.pdf',
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h2 className="text-base font-black text-[#c1a35f]">
            تسجيل كابتن جديد (سائق) 🚗
          </h2>
          <p className="text-[11px] text-slate-400 font-bold">
            انضم لأسطول طريقي وابدأ استقبال دورات المدارس والمشاوير اليومية
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            👤 الاسم الثلاثي بالكامل
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-extrabold text-slate-300 mb-1">
              📱 رقم الموبايل
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-300 mb-1">
              🏙️ المحافظة
            </label>
            <select
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
            >
              {EGYPT_GOVERNORATES.filter((g) => g !== 'الكل').map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            🚘 نوع وفئة السيارة وسنة الصنع
          </label>
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
            placeholder="مثال: ميكروباص تويوتا 2022 مكيف"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
          />
        </div>

        {/* Upload Box 1: National ID */}
        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            🪪 صورة البطاقة الشخصية (وجه وظهر)
          </label>
          <label
            className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
              nationalIdFile
                ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300'
                : 'bg-[#0a0a0a] border-white/20 hover:border-[#c1a35f] text-slate-300'
            }`}
          >
            <span className="text-2xl">🪪</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-extrabold truncate">
                {nationalIdFile
                  ? `تم الرفع: ${nationalIdFile}`
                  : 'رفع صورة البطاقة الشخصية'}
              </div>
              <div className="text-[10px] text-slate-400 font-bold">
                اضغط لاختيار صورة من جهازك
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'id')}
              className="hidden"
            />
          </label>
        </div>

        {/* Upload Box 2: License */}
        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            📄 رخصة القيادة ورخصة السيارة
          </label>
          <label
            className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
              licenseFile
                ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300'
                : 'bg-[#0a0a0a] border-white/20 hover:border-[#c1a35f] text-slate-300'
            }`}
          >
            <span className="text-2xl">📄</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-extrabold truncate">
                {licenseFile
                  ? `تم الرفع: ${licenseFile}`
                  : 'رفع رخصة القيادة والسيارة'}
              </div>
              <div className="text-[10px] text-slate-400 font-bold">
                اضغط لاختيار المستندات أو الصور
              </div>
            </div>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, 'license')}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 font-black py-3.5 px-4 rounded-2xl text-xs transition-all shadow-md shadow-[#c1a35f]/20 active:scale-98 mt-2"
        >
          حفظ المستندات والانتقال لدفع رسوم التفعيل (InstaPay) ➔
        </button>
      </form>
    </div>
  );
};
