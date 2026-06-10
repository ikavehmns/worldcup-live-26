import React, { useState } from 'react';

export default function LiveMatch({ isPremium }) {
  const [subTab, setSubTab] = useState('stats'); // stats | lineups | timeline

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* اسکوربورد زنده بالای صفحه */}
      <section className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-5 relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-14 h-14 rounded-full border border-white/10 p-1.5 bg-slate-950/60 overflow-hidden">
              <img alt="برزیل" className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=100" />
            </div>
            <span className="font-bold text-xs text-white">برزیل</span>
          </div>
          
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-black text-white font-mono">۲</span>
              <span className="text-cyan-400 font-bold text-lg">:</span>
              <span className="text-2xl font-black text-white font-mono">۱</span>
            </div>
            <div className="bg-red-500/15 px-3 py-1 rounded-full flex items-center gap-1.5 border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[9px] text-red-400 font-bold font-mono">دقیقه ۷۲ زنده</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-14 h-14 rounded-full border border-white/10 p-1.5 bg-slate-950/60 overflow-hidden">
              <img alt="فرانسه" className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=100" />
            </div>
            <span className="font-bold text-xs text-white">فرانسه</span>
          </div>
        </div>
      </section>

      {/* تب‌های جابه‌جایی جزئیات بازی */}
      <nav className="flex border-b border-white/10">
        <button 
          onClick={() => setSubTab('stats')}
          className={`flex-1 py-3 text-xs font-bold text-center transition-all ${subTab === 'stats' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          آمار تیمی
        </button>
        <button 
          onClick={() => setSubTab('lineups')}
          className={`flex-1 py-3 text-xs font-bold text-center transition-all ${subTab === 'lineups' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          ترکیب‌ها
        </button>
        <button 
          onClick={() => setSubTab('timeline')}
          className={`flex-1 py-3 text-xs font-bold text-center transition-all ${subTab === 'timeline' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          رویدادها
        </button>
      </nav>

      {/* محتوای تب آمار تیمی */}
      {subTab === 'stats' && (
        <div className="space-y-4">
          <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-white mb-2">روند بازی (Momentum)</h3>
            <div className="h-20 w-full relative">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                <path d="M0,50 Q30,20 60,70 T120,30 T180,65 T240,15 T300,75 T400,50" fill="none" stroke="#00f2ff" strokeWidth="2.5"></path>
                <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.15)" strokeDasharray="4"></line>
              </svg>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-white">آمار زنده تیمی</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span>۵۵٪</span>
                  <span className="text-slate-400">مالکیت توپ</span>
                  <span>۴۵٪</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full flex overflow-hidden">
                  <div className="bg-cyan-400 h-full" style={{ width: '55%' }}></div>
                  <div className="bg-slate-600 h-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* محتوای تب ترکیب‌ها */}
      {subTab === 'lineups' && (
        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl text-xs space-y-4">
          <div className="grid grid-cols-2 gap-4 divide-x divide-slate-800 divide-x-reverse">
            <div>
              <h4 className="text-cyan-400 font-bold text-center mb-3">برزیل (۴-۳-۳)</h4>
              <ul className="space-y-2 text-slate-300">
                <li>• الیسون (GK)</li>
                <li>• مارکینیوش</li>
                <li>• رودریگو ⚽</li>
                <li>• وینیسیوس جونیور ⚽</li>
              </ul>
            </div>
            <div className="pr-4">
              <h4 className="text-slate-300 font-bold text-center mb-3">فرانسه (۴-۲-۳-۱)</h4>
              <ul className="space-y-2 text-slate-300">
                <li>• مایک مانیان (GK)</li>
                <li>• اوپامکانو</li>
                <li>• گریزمان</li>
                <li>• کیلیان امباپه ⚽</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* محتوای تب رویدادها */}
      {subTab === 'timeline' && (
        <div className="bg-slate-900/40 border border-white/5 p-5 rounded-xl text-xs space-y-4">
          <div className="relative border-r-2 border-slate-800 mr-2 pr-6 space-y-6">
            <div className="relative">
              <span className="absolute -right-[31px] top-0 bg-slate-950 border-2 border-cyan-400 rounded-full p-1 flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-cyan-400">sports_soccer</span>
              </span>
              <h4 className="font-bold text-white">گل دوم برزیل (دقیقه ۶۱)</h4>
              <p className="text-slate-400">رودریگو</p>
            </div>
            <div className="relative">
              <span className="absolute -right-[31px] top-0 bg-slate-950 border-2 border-red-500 rounded-full p-1 flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-red-500">warning</span>
              </span>
              <h4 className="font-bold text-white">کارت زرد (دقیقه ۵۴)</h4>
              <p className="text-slate-400">آنتوان گریزمان</p>
            </div>
          </div>
        </div>
      )}

      {/* بخش تحلیل پریمیوم با هوش مصنوعی (قفل) */}
      <section className="bg-slate-900/60 backdrop-blur border border-yellow-500/20 rounded-xl p-5 relative overflow-hidden">
        {!isPremium && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-4 text-center">
            <span className="material-symbols-outlined text-yellow-500 text-3xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <p className="text-xs font-bold text-white">آنالیز زنده هوش مصنوعی مخصوص اعضای طلایی</p>
            <p className="text-[10px] text-slate-400 mt-1 mb-3">دقت پیش‌بینی شانس‌ها را با خرید اشتراک از بخش پروفایل باز کنید.</p>
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <span className="bg-gradient-to-r from-yellow-400 to-amber-600 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded italic">PREMIUM AI</span>
          <h3 className="text-xs font-bold text-white">پیش‌بینی زنده احتمال برد</h3>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">شانس برد برزیل:</span>
            <span className="text-cyan-400 font-bold">۶۸٪</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">احتمال مساوی:</span>
            <span className="text-slate-400">۲۲٪</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">شانس برد فرانسه:</span>
            <span className="text-red-400">۱۰٪</span>
          </div>
        </div>
      </section>

    </div>
  );
}