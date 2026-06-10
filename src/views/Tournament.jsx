import React, { useState } from 'react';

export default function Tournament() {
  const [subTab, setSubTab] = useState('group'); // group | knockout | stats

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* تب‌های بالای صفحه مسابقات */}
      <nav className="flex gap-2 overflow-x-auto pb-2 scroll-hide">
        <button 
          onClick={() => setSubTab('group')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${subTab === 'group' ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          جدول گروه‌ها
        </button>
        <button 
          onClick={() => setSubTab('knockout')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${subTab === 'knockout' ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          مراحل حذفی (Bracket)
        </button>
        <button 
          onClick={() => setSubTab('stats')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${subTab === 'stats' ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          آمار گلزنان
        </button>
      </nav>

      {/* ۱. محتوای تب جدول گروه‌ها */}
      {subTab === 'group' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-white">جدول رده‌بندی گروه A</h2>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> صعود حتمی
            </span>
          </div>
          <div className="bg-slate-900/60 backdrop-blur border border-white/5 rounded-xl overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-950/80 text-slate-400 border-b border-white/5">
                  <th className="p-3 text-center">رتبه</th>
                  <th className="p-3">تیم</th>
                  <th className="p-3 text-center">بازی</th>
                  <th className="p-3 text-center">تفاضل</th>
                  <th className="p-3 text-center">امتیاز</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                <tr className="bg-cyan-400/5">
                  <td className="p-3 text-center font-bold text-cyan-400 font-mono">۱</td>
                  <td className="p-3 flex items-center gap-2">
                    <img className="w-5 h-5 rounded-full object-cover" src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=60" alt="USA" />
                    <span className="font-bold">آمریکا</span>
                  </td>
                  <td className="p-3 text-center font-mono">۳</td>
                  <td className="p-3 text-center font-mono" dir="ltr">+۴</td>
                  <td className="p-3 text-center font-bold text-cyan-400 font-mono">۷</td>
                </tr>
                <tr className="bg-cyan-400/5">
                  <td className="p-3 text-center font-bold text-cyan-400 font-mono">۲</td>
                  <td className="p-3 flex items-center gap-2">
                    <img className="w-5 h-5 rounded-full object-cover" src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=60" alt="Argentina" />
                    <span className="font-bold">آرژانتین</span>
                  </td>
                  <td className="p-3 text-center font-mono">۳</td>
                  <td className="p-3 text-center font-mono" dir="ltr">+۳</td>
                  <td className="p-3 text-center font-bold text-cyan-400 font-mono">۶</td>
                </tr>
                <tr>
                  <td className="p-3 text-center font-mono text-slate-500">۳</td>
                  <td className="p-3 flex items-center gap-2">
                    <img className="w-5 h-5 rounded-full object-cover" src="https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=60" alt="Netherlands" />
                    <span className="font-semibold text-slate-400">هلند</span>
                  </td>
                  <td className="p-3 text-center font-mono text-slate-400">۳</td>
                  <td className="p-3 text-center font-mono text-slate-400" dir="ltr">۰</td>
                  <td className="p-3 text-center font-mono text-slate-400">۴</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ۲. محتوای تب مراحل حذفی */}
      {subTab === 'knockout' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white">براکت بازی‌های حذفی</h3>
          <div className="overflow-x-auto pb-4 scroll-hide">
            <div className="flex gap-6 min-w-[500px] py-2" dir="rtl">
              {/* ستون یک هشتم */}
              <div className="space-y-6 w-52 flex-shrink-0">
                <span className="block text-center text-[10px] text-slate-400 border-b border-white/5 pb-1 font-bold">یک‌هشتم نهایی</span>
                <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3 space-y-2 border-r-2 border-cyan-400">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white">برزیل</span>
                    <span className="font-mono font-bold text-cyan-400">۲</span>
                  </div>
                  <div className="flex justify-between items-center text-xs opacity-40">
                    <span className="text-slate-400">کره جنوبی</span>
                    <span className="font-mono">۰</span>
                  </div>
                </div>
              </div>
              {/* ستون یک چهارم */}
              <div className="space-y-6 w-52 flex-shrink-0 pt-6">
                <span className="block text-center text-[10px] text-slate-400 border-b border-white/5 pb-1 font-bold">یک‌چهارم نهایی</span>
                <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3 space-y-2 border-r-2 border-slate-700">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">آلمان</span>
                    <span className="font-mono text-slate-500">-</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">انگلیس</span>
                    <span className="font-mono text-slate-500">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ۳. محتوای تب آمار گلزنان */}
      {subTab === 'stats' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white">کفش طلای مسابقات</h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img className="w-12 h-12 rounded-full object-cover border border-cyan-400" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Mbappe" />
                <div>
                  <h4 className="text-xs font-bold text-white">کیلیان امباپه</h4>
                  <span className="text-[10px] text-slate-400">فرانسه</span>
                </div>
              </div>
              <div className="text-left">
                <span className="font-mono text-xl font-bold text-cyan-400">۵</span>
                <span className="block text-[8px] text-slate-500 font-bold uppercase">گل زده</span>
              </div>
            </div>
            <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img className="w-12 h-12 rounded-full object-cover border border-white/5" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Haaland" />
                <div>
                  <h4 className="text-xs font-bold text-white">ارلینگ هالند</h4>
                  <span className="text-[10px] text-slate-400">نروژ</span>
                </div>
              </div>
              <div className="text-left">
                <span className="font-mono text-xl font-bold text-cyan-400">۴</span>
                <span className="block text-[8px] text-slate-500 font-bold uppercase">گل زده</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}