import React, { useState } from 'react';
import { DriverApplication, SchoolRoute } from '../../types';
import { EGYPT_GOVERNORATES } from '../../data/mockData';

interface AdminDashboardProps {
  drivers: DriverApplication[];
  routes: SchoolRoute[];
  onApproveDriver: (id: string) => void;
  onRejectDriver: (id: string) => void;
  onAddSchoolRoute: (newRoute: Omit<SchoolRoute, 'id'>) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  drivers,
  routes,
  onApproveDriver,
  onRejectDriver,
  onAddSchoolRoute,
}) => {
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);

  // New Route Form State
  const [routeTitle, setRouteTitle] = useState('');
  const [governorate, setGovernorate] = useState('القاهرة');
  const [schoolName, setSchoolName] = useState('');
  const [totalSeats, setTotalSeats] = useState(14);
  const [departureTime, setDepartureTime] = useState('07:00 ص');
  const [vehicleType, setVehicleType] = useState('ميكروباص مكيف حديث');
  const [captainName, setCaptainName] = useState('الكابتن حسام الدين');
  const [pricePerMonth, setPricePerMonth] = useState(1200);

  const activeDriversCount = drivers.filter((d) => d.status === 'approved').length;
  const pendingDrivers = drivers.filter((d) => d.status === 'pending');

  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeTitle.trim() || !schoolName.trim()) return;

    onAddSchoolRoute({
      title: routeTitle,
      governorate,
      schoolName,
      seatsLeft: totalSeats,
      totalSeats,
      departureTime,
      vehicleType,
      captainName,
      captainPhone: '01000000000',
      pricePerMonth,
    });

    setRouteTitle('');
    setSchoolName('');
    setShowAddRouteModal(false);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h2 className="text-base font-black text-[#c1a35f]">
            ⚙️ لوحة تحكم الأدمن (منصة طريقي)
          </h2>
          <p className="text-[11px] text-slate-400 font-bold">
            مراجعة السائقين والتحقق من دفع InstaPay وإدارة الخطوط
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#0a0a0a] p-3 rounded-2xl border border-white/10 text-center shadow-md">
          <div className="text-xl font-black text-white">
            {activeDriversCount}
          </div>
          <div className="text-[10px] text-slate-400 font-extrabold">
            سائق نشط
          </div>
        </div>

        <div className="bg-[#0a0a0a] p-3 rounded-2xl border border-white/10 text-center shadow-md">
          <div className="text-xl font-black text-[#c1a35f]">
            {pendingDrivers.length}
          </div>
          <div className="text-[10px] text-slate-400 font-extrabold">
            طلبات معلقة
          </div>
        </div>

        <div className="bg-[#0a0a0a] p-3 rounded-2xl border border-white/10 text-center shadow-md">
          <div className="text-xl font-black text-emerald-400">
            {routes.length}
          </div>
          <div className="text-[10px] text-slate-400 font-extrabold">
            خطوط مدارس
          </div>
        </div>
      </div>

      {/* Driver Verifications */}
      <div>
        <h3 className="text-xs font-black text-white mb-2.5">
          📋 مراجعة طلبات السائقين الجدد:
        </h3>

        {pendingDrivers.length === 0 ? (
          <div className="bg-[#0a0a0a] p-4 rounded-2xl border border-white/10 text-center text-xs font-bold text-slate-400">
            لا توجد طلبات سائقين معلقة حالياً ✔
          </div>
        ) : (
          <div className="space-y-3">
            {pendingDrivers.map((drv) => (
              <div
                key={drv.id}
                className="bg-[#0a0a0a] rounded-2xl p-3.5 border border-white/10 space-y-2.5 shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-xs text-white">
                      {drv.fullName}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                      📱 {drv.phone} • {drv.governorate} • {drv.vehicleModel}
                    </p>
                  </div>
                  <span className="text-[9px] font-black bg-[#c1a35f]/20 text-[#c1a35f] px-2 py-0.5 rounded-full border border-[#c1a35f]/40">
                    بانتظار الموافقة
                  </span>
                </div>

                {/* Document Badges */}
                <div className="bg-[#050505] p-2 rounded-xl text-[10px] font-extrabold text-slate-300 space-y-1 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span>🪪 البطاقة الشخصية:</span>
                    <span className="text-emerald-400">مرفوعة ✔</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>📄 رخصة القيادة والسيارة:</span>
                    <span className="text-emerald-400">مرفوعة ✔</span>
                  </div>
                  <div className="flex items-center justify-between text-[#c1a35f] font-black pt-1 border-t border-white/10">
                    <span>💳 مرجع InstaPay (200ج):</span>
                    <span>{drv.instaPayReference || 'IPNTR-8829103948'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onApproveDriver(drv.id)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl text-xs font-black transition-all shadow-xs"
                  >
                    موافقة وتفعيل السائق ✔
                  </button>
                  <button
                    onClick={() => onRejectDriver(drv.id)}
                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2 rounded-xl text-xs font-black transition-all shadow-xs"
                  >
                    رفض الطلب ✖
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* School Routes Management Section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-black text-white">
            🚌 إدارة إضافة خطوط المدارس:
          </h3>
          <button
            onClick={() => setShowAddRouteModal(true)}
            className="bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 px-3 py-1.5 rounded-xl text-xs font-black transition-all"
          >
            + إضافة خط مدرسة جديد
          </button>
        </div>

        <div className="space-y-2">
          {routes.slice(0, 4).map((r) => (
            <div
              key={r.id}
              className="bg-[#0a0a0a] p-3 rounded-xl border border-white/10 flex justify-between items-center text-xs font-bold shadow-md"
            >
              <div>
                <div className="text-white font-black">{r.title}</div>
                <div className="text-[10px] text-slate-400">
                  {r.governorate} • {r.captainName}
                </div>
              </div>
              <span className="text-[#c1a35f] font-black">{r.pricePerMonth}ج</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal to Add Route */}
      {showAddRouteModal && (
        <div className="fixed inset-0 z-[4000] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] w-full max-w-sm rounded-3xl p-5 border-2 border-[#c1a35f] space-y-3">
            <h3 className="text-xs font-black text-white">
              إضافة خط مدرسة جديد
            </h3>

            <form onSubmit={handleCreateRoute} className="space-y-2.5 text-right">
              <div>
                <label className="block text-[11px] font-bold text-slate-300">
                  عنوان الخط
                </label>
                <input
                  type="text"
                  value={routeTitle}
                  onChange={(e) => setRouteTitle(e.target.value)}
                  required
                  placeholder="خط المعادي ➔ مدرسة الفرسان"
                  className="w-full bg-[#050505] border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300">
                    المحافظة
                  </label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
                  >
                    {EGYPT_GOVERNORATES.filter((g) => g !== 'الكل').map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300">
                    عدد المقاعد
                  </label>
                  <input
                    type="number"
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(Number(e.target.value))}
                    min="1"
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300">
                  المدرسة والموعد والاشتراك
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  required
                  placeholder="اسم المدرسة..."
                  className="w-full bg-[#050505] border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f] mb-1"
                />
                <input
                  type="number"
                  value={pricePerMonth}
                  onChange={(e) => setPricePerMonth(Number(e.target.value))}
                  placeholder="الاشتراك الشهري بالجنيه"
                  className="w-full bg-[#050505] border border-white/10 rounded-lg p-2 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 py-2 rounded-xl text-xs font-black"
                >
                  حفظ الخط
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddRouteModal(false)}
                  className="bg-white/10 text-slate-300 px-3 py-2 rounded-xl text-xs font-bold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
