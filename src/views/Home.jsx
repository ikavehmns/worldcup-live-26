import React, { useState, useEffect } from 'react';

export default function Home({ switchTab }) {
  // شبیه‌سازی تایمر ثانیه‌شمار برای بازی آلمان و انگلیس
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 55, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // تبدیل اعداد به فارسی برای ظاهر شیک‌تر
  const toPersianNum = (n) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* هدر شمارش معکوس بازی بزرگ */}
      <section className="relative h-64 w-full rounded-2xl overflow-hidden border border-white/10 group">
        <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200" alt="German vs England Match" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex gap-2 items-center mb-2">
            <span className="bg-cyan-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold uppercase">بازی بزرگ روز</span>
            <span className="text-white/85 text-xs font-semibold">مرحله نهایی</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mb-4">آلمان مقابل انگلیس</h3>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-xl font-bold text-cyan-400 font-mono">{toPersianNum(timeLeft.days.toString().padStart(2, '0'))}</span>
              <span className="text-[10px] text-slate-400">روز</span>
            </div>
            <div className="text-cyan-400 font-bold">:</div>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-xl font-bold text-cyan-400 font-mono">{toPersianNum(timeLeft.hours.toString().padStart(2, '0'))}</span>
              <span className="text-[10px] text-slate-400">ساعت</span>
            </div>
            <div className="text-cyan-400 font-bold">:</div>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-xl font-bold text-cyan-400 font-mono">{toPersianNum(timeLeft.minutes.toString().padStart(2, '0'))}</span>
              <span className="text-[10px] text-slate-400">دقیقه</span>
            </div>
            <div className="text-cyan-400 font-bold">:</div>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-xl font-bold text-red-400 font-mono">{toPersianNum(timeLeft.seconds.toString().padStart(2, '0'))}</span>
              <span className="text-[10px] text-slate-400">ثانیه</span>
            </div>
            <button className="mr-auto bg-cyan-400 text-slate-950 px-5 py-2 rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,219,231,0.4)]">
              یادآوری بازی
            </button>
          </div>
        </div>
      </section>

      {/* بخش دسترسی سریع */}
      <section className="grid grid-cols-3 gap-3">
        <div onClick={() => switchTab('profile')} className="bg-slate-900/60 backdrop-blur border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:border-cyan-400/50 cursor-pointer transition-all">
          <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-cyan-400">calendar_today</span>
          </div>
          <span className="text-[10px] font-bold text-slate-200">پاداش روزانه</span>
        </div>
        <div onClick={() => switchTab('profile')} className="bg-slate-900/60 backdrop-blur border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:border-cyan-400/50 cursor-pointer transition-all">
          <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-emerald-400">progress_activity</span>
          </div>
          <span className="text-[10px] font-bold text-slate-200">گردونه شانس</span>
        </div>
        <div onClick={() => switchTab('profile')} className="bg-slate-900/60 backdrop-blur border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:border-cyan-400/50 cursor-pointer transition-all">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-400">quiz</span>
          </div>
          <span className="text-[10px] font-bold text-slate-200">کوییز فوتبالی</span>
        </div>
      </section>

      {/* بنر مبارزه پیش‌بینی */}
      <section className="relative rounded-2xl overflow-hidden p-5 bg-gradient-to-l from-slate-900 to-cyan-950/40 border border-white/5">
        <div className="flex justify-between items-center">
          <div className="max-w-[65%] space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-cyan-400 text-sm">bolt</span>
              <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider">نبرد فعال پیش‌بینی</span>
            </div>
            <h4 class="text-base font-black text-white">نبرد پیش‌بینی مسابقات</h4>
            <p className="text-xs text-slate-400 leading-relaxed">با میلیون‌ها نفر رقابت کنید و جوایز دیجیتال ۲۰۲۶ را ببرید.</p>
            <button onClick={() => switchTab('predictions')} className="mt-2 bg-cyan-400 text-slate-950 px-4 py-1.5 rounded-full font-bold text-[11px] hover:scale-105 active:scale-95 transition-all">
              همین حالا بپیوندید
            </button>
          </div>
          <div className="w-20 h-20 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
            <span className="material-symbols-outlined text-6xl text-yellow-500 relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </div>
        </div>
      </section>

      {/* بازی‌های زنده در جریان */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            در حال پخش زنده
          </h2>
          <span onClick={() => switchTab('live')} className="text-xs text-cyan-400 hover:underline cursor-pointer">مشاهده همه</span>
        </div>
        <div className="flex gap-4 overflow-x-auto scroll-hide pb-2">
          {/* کارت بازی زنده برزیل فرانسه */}
          <div onClick={() => switchTab('live')} className="bg-slate-900/60 backdrop-blur border border-white/10 flex-shrink-0 w-80 p-5 rounded-xl relative overflow-hidden cursor-pointer hover:border-cyan-400/30 transition-all">
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/30">
              <span class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              <span class="text-[9px] font-bold text-red-400">'۷۲</span>
            </div>
            <div className="flex justify-between items-center gap-4 mb-4 mt-2">
              <div className="flex flex-col items-center gap-2 flex-1">
                <img alt="برزیل" className="w-10 h-10 object-cover rounded-full border border-white/10" src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=100" />
                <span className="text-xs text-slate-300">برزیل</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-lg font-bold text-cyan-400 font-mono">۲</span>
                <span className="text-slate-600 font-bold">-</span>
                <span className="text-lg font-bold text-slate-300 font-mono">۱</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <img alt="فرانسه" className="w-10 h-10 object-cover rounded-full border border-white/10" src="https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=100" />
                <span className="text-xs text-slate-300">فرانسه</span>
              </div>
            </div>
            <div className="h-1 bg-slate-850 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-3/4 rounded-full shadow-[0_0_8px_#00f2ff]"></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}