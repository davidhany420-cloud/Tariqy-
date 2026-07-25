import React, { useState } from 'react';

interface DriverInstaPayProps {
  onBack: () => void;
  onSubmitPayment: (referenceNumber: string) => void;
}

export const DriverInstaPay: React.FC<DriverInstaPayProps> = ({
  onBack,
  onSubmitPayment,
}) => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const instaPayHandle = 'tariqi@instapay';

  const handleCopy = () => {
    navigator.clipboard.writeText(instaPayHandle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceNumber.trim()) return;
    onSubmitPayment(referenceNumber);
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
          دفع رسوم التفعيل (InstaPay) 💳
        </h2>
        <div className="w-8"></div>
      </div>

      {/* InstaPay Info Card */}
      <div className="bg-[#0a0a0a] text-white rounded-2xl p-5 text-center space-y-3 border-2 border-[#c1a35f] shadow-xl">
        <div className="text-xs text-slate-400 font-bold">
          رسوم تفعيل حساب الكابتن واعتماده بالنظام
        </div>

        <div className="text-3xl font-black text-[#c1a35f]">
          200 جنيه مصري
        </div>

        <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-md my-2">
          💳
        </div>

        <p className="text-[11px] text-slate-300 font-semibold leading-relaxed">
          قم بالتحويل عبر تطبيق انستا باي (InstaPay) على العنوان التالي:
        </p>

        {/* Copyable IPN Handle */}
        <div
          onClick={handleCopy}
          className="bg-[#c1a35f]/10 hover:bg-[#c1a35f]/20 text-[#c1a35f] py-2 px-4 rounded-xl text-xs font-black border border-dashed border-[#c1a35f] inline-flex items-center gap-2 cursor-pointer transition-colors"
        >
          <span>{instaPayHandle}</span>
          <span className="text-[10px] bg-[#c1a35f] text-slate-950 px-2 py-0.5 rounded-md">
            {copied ? 'تم النسخ ✔' : 'نسخ 📋'}
          </span>
        </div>
      </div>

      {/* Reference Number Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-extrabold text-slate-300 mb-1">
            🔢 رقم مرجع التحويل (IPN Reference Number)
          </label>
          <input
            type="text"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            required
            placeholder="مثال: IPNTR-8829103948"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#c1a35f]"
          />
          <p className="text-[10px] text-slate-400 font-bold mt-1">
            ستجده في رسالة تأكيد التحويل داخل تطبيق InstaPay بعد إتمام العملية.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#c1a35f] hover:bg-[#b0924e] text-slate-950 font-black py-3.5 px-4 rounded-2xl text-xs transition-all shadow-md shadow-[#c1a35f]/20 active:scale-98"
        >
          تأكيد وإرسال الإيصال للأدمن للمراجعة ✔
        </button>
      </form>
    </div>
  );
};
