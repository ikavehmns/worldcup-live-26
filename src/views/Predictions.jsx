import React, { useState } from 'react';

export default function Predictions() {
  const [activePredict, setActivePredict] = useState(null); // host | draw | guest
  const [predictionMessage, setPredictionMessage] = useState('پیش‌بینی خود را ثبت کنید!');

  const handlePredict = (type) => {
    setActivePredict(type);
    
    let label = '';
    if (type === 'host') label = 'برد برزیل';
    if (type === 'draw') label = 'نتیجه مساوی';
    if (type === 'guest') label = 'برد فرانسه';

    setPredictionMessage(`پیش‌بینی شما با موفقیت روی گزینه «${label}» ثبت شد! 🎯`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* هدر رتبه کاربر */}
      <section className="bg-slate-900/60 backdrop-blur border border-white/5 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img className="w-12 h-12 rounded-full object-cover border border-cyan-400" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80" alt="avatar" />
            <span className="absolute -bottom-1 -left-1 bg-cyan-400 text-slate-950 text-[8px] font-black px-1 rounded-full">سطح ۴۲</span>
          </div>
          <div>
            <h3 className="text-xs font-black text-white">رده‌بندی پیش‌بینی‌های شما</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">رتبه ۱,۲۴۰# جهانی • اسطوره پیش‌بینی</p>
          </div>
        </div>
      </section>

      {/* کارتهای فعال برای پیش‌بینی */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-300">مسابقات فعال برای پیش‌بینی</h3>
        
        <div className="bg-slate-900/60 backdrop-blur border border-white/10 p-5 rounded-xl border-r-4 border-r-cyan-400">
          <div className="flex justify-between items-center mb-3 text-[10px] text-slate-400">
            <span>گروه A • امشب ساعت ۲۰:۰۰</span>
            <span className="bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded font-bold">بونوس سکه دوبرابر</span>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="flex flex-col items-center gap-1 w-1/3">
              <img className="w-10 h-10 object-cover rounded-full border border-white/5" src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=100" alt="Brazil" />
              <span className="text-xs font-bold text-white">برزیل</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold">در مقابل</span>
            <div className="flex flex-col items-center gap-1 w-1/3">
              <img className="w-10 h-10 object-cover rounded-full border border-white/5" src="https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=100" alt="France" />
              <span className="text-xs font-bold text-white">فرانسه</span>
            </div>
          </div>

          {/* دکمه‌های ثبت نظر */}
          <div className="grid grid-cols-3 gap-2" dir="ltr">
            <button 
              onClick={() => handlePredict('host')}
              className={`flex flex-col items-center justify-center py-2.5 rounded-lg border transition-all ${activePredict === 'host' ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400 shadow-inner' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-400/30'}`}
            >
              <span className="text-[8px] opacity-60">میزبان</span>
              <span className="font-mono text-xs font-bold">1.85</span>
            </button>
            <button 
              onClick={() => handlePredict('draw')}
              className={`flex flex-col items-center justify-center py-2.5 rounded-lg border transition-all ${activePredict === 'draw' ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400 shadow-inner' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-400/30'}`}
            >
              <span className="text-[8px] opacity-60">مساوی</span>
              <span className="font-mono text-xs font-bold">3.40</span>
            </button>
            <button 
              onClick={() => handlePredict('guest')}
              className={`flex flex-col items-center justify-center py-2.5 rounded-lg border transition-all ${activePredict === 'guest' ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400 shadow-inner' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-400/30'}`}
            >
              <span className="text-[8px] opacity-60">مهمان</span>
              <span className="font-mono text-xs font-bold">2.10</span>
            </button>
          </div>

          <p className="text-[10px] text-center mt-3 font-semibold text-cyan-400">{predictionMessage}</p>
        </div>
      </section>

      {/* بخش مبارزه ۱ به ۱ */}
      <section className="bg-gradient-to-br from-cyan-400/5 to-transparent border border-white/5 rounded-xl p-5 space-y-3">
        <h4 className="text-xs font-black text-cyan-400 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">swords</span>
          چالش پیش‌بینی ۱ به ۱ با دوستان
        </h4>
        <p className="text-[11px] text-slate-400 leading-relaxed">یک لینک چالش بسازید، برای دوستان خود بفرستید و در پیش‌بینی نتایج رقابت کنید. برنده تمام سکه‌ها را مال خود می‌کند!</p>
        <button onClick={() => alert('لینک دعوت کپی شد!')} className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-lg text-xs transition-colors">
          ساخت چالش و دعوت از دوستان
        </button>
      </section>

    </div>
  );
}