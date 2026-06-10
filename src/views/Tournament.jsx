import React, { useState } from 'react';

const groups = [
  { name: 'گروه A', teams: [
    { name: 'آمریکا', played: 3, gd: '+4', pts: 7, qualified: true },
    { name: 'آرژانتین', played: 3, gd: '+3', pts: 6, qualified: true },
    { name: 'هلند', played: 3, gd: '0', pts: 4, qualified: false },
    { name: 'مراکش', played: 3, gd: '-7', pts: 0, qualified: false },
  ]},
  { name: 'گروه B', teams: [
    { name: 'برزیل', played: 3, gd: '+5', pts: 9, qualified: true },
    { name: 'فرانسه', played: 3, gd: '+2', pts: 6, qualified: true },
    { name: 'ژاپن', played: 3, gd: '-2', pts: 3, qualified: false },
    { name: 'مکزیک', played: 3, gd: '-5', pts: 0, qualified: false },
  ]},
  { name: 'گروه C', teams: [
    { name: 'آلمان', played: 3, gd: '+4', pts: 7, qualified: true },
    { name: 'اسپانیا', played: 3, gd: '+2', pts: 5, qualified: true },
    { name: 'پرتغال', played: 3, gd: '0', pts: 4, qualified: false },
    { name: 'کانادا', played: 3, gd: '-6', pts: 1, qualified: false },
  ]},
  { name: 'گروه D', teams: [
    { name: 'انگلیس', played: 3, gd: '+3', pts: 7, qualified: true },
    { name: 'ایتالیا', played: 3, gd: '+1', pts: 5, qualified: true },
    { name: 'کلمبیا', played: 3, gd: '-1', pts: 3, qualified: false },
    { name: 'عربستان', played: 3, gd: '-3', pts: 1, qualified: false },
  ]},
  { name: 'گروه E', teams: [
    { name: 'بلژیک', played: 3, gd: '+5', pts: 9, qualified: true },
    { name: 'کرواسی', played: 3, gd: '+1', pts: 4, qualified: true },
    { name: 'سنگال', played: 3, gd: '-2', pts: 3, qualified: false },
    { name: 'استرالیا', played: 3, gd: '-4', pts: 1, qualified: false },
  ]},
  { name: 'گروه F', teams: [
    { name: 'پرتغال', played: 3, gd: '+4', pts: 7, qualified: true },
    { name: 'اروگوئه', played: 3, gd: '+2', pts: 6, qualified: true },
    { name: 'ایران', played: 3, gd: '-2', pts: 3, qualified: false },
    { name: 'غنا', played: 3, gd: '-4', pts: 0, qualified: false },
  ]},
  { name: 'گروه G', teams: [
    { name: 'لهستان', played: 3, gd: '+3', pts: 7, qualified: true },
    { name: 'دانمارک', played: 3, gd: '+1', pts: 5, qualified: true },
    { name: 'تونس', played: 3, gd: '-1', pts: 2, qualified: false },
    { name: 'اکوادور', played: 3, gd: '-3', pts: 1, qualified: false },
  ]},
  { name: 'گروه H', teams: [
    { name: 'سوئیس', played: 3, gd: '+4', pts: 7, qualified: true },
    { name: 'کره‌جنوبی', played: 3, gd: '+1', pts: 5, qualified: true },
    { name: 'قطر', played: 3, gd: '-2', pts: 2, qualified: false },
    { name: 'کامرون', played: 3, gd: '-3', pts: 1, qualified: false },
  ]},
];

const bracket = [
  { round: 'یک‌هشتم نهایی', matches: [
    { home: 'برزیل', homeScore: '2', away: 'کره‌جنوبی', awayScore: '0', done: true },
    { home: 'آلمان', homeScore: '-', away: 'انگلیس', awayScore: '-', done: false },
    { home: 'آرژانتین', homeScore: '3', away: 'لهستان', awayScore: '1', done: true },
    { home: 'فرانسه', homeScore: '-', away: 'بلژیک', awayScore: '-', done: false },
  ]},
  { round: 'یک‌چهارم نهایی', matches: [
    { home: 'برزیل', homeScore: '-', away: '؟', awayScore: '-', done: false },
    { home: 'آرژانتین', homeScore: '-', away: '؟', awayScore: '-', done: false },
  ]},
  { round: 'نیمه‌نهایی', matches: [
    { home: '؟', homeScore: '-', away: '؟', awayScore: '-', done: false },
  ]},
  { round: 'فینال', matches: [
    { home: '؟', homeScore: '-', away: '؟', awayScore: '-', done: false },
  ]},
];

const scorers = [
  { name: 'کیلیان امباپه', country: 'فرانسه', goals: 6, assists: 3 },
  { name: 'ارلینگ هالند', country: 'نروژ', goals: 5, assists: 1 },
  { name: 'وینیسیوس جونیور', country: 'برزیل', goals: 4, assists: 4 },
  { name: 'هری کین', country: 'انگلیس', goals: 4, assists: 2 },
  { name: 'لیونل مسی', country: 'آرژانتین', goals: 3, assists: 5 },
  { name: 'رودریگو', country: 'برزیل', goals: 3, assists: 2 },
  { name: 'آنتوان گریزمان', country: 'فرانسه', goals: 3, assists: 1 },
];

export default function Tournament() {
  const [subTab, setSubTab] = useState('group');
  const [selectedGroup, setSelectedGroup] = useState(0);

  return (
    <div className="space-y-6 animate-fade-in pb-12">

      {/* تب‌های بالا */}
      <nav className="flex gap-2 overflow-x-auto pb-2 scroll-hide">
        {[['group', 'جدول گروه‌ها'], ['knockout', 'مراحل حذفی'], ['stats', 'گلزنان']].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setSubTab(id)}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${subTab === id ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* ۱. جدول گروه‌ها */}
      {subTab === 'group' && (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto scroll-hide pb-1">
            {groups.map((g, i) => (
              <button
                key={i}
                onClick={() => setSelectedGroup(i)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border ${selectedGroup === i ? 'bg-cyan-400/20 text-cyan-400 border-cyan-400/40' : 'bg-slate-900 text-slate-500 border-white/5 hover:text-white'}`}
              >
                {g.name}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-white">{groups[selectedGroup].name}</h2>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-cyan-400 rounded-sm inline-block"></span> صعود</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-700 rounded-sm inline-block"></span> حذف</span>
              </div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-500 border-b border-white/5">
                    <th className="p-3 text-center w-8">#</th>
                    <th className="p-3">تیم</th>
                    <th className="p-3 text-center">ب</th>
                    <th className="p-3 text-center">تف</th>
                    <th className="p-3 text-center font-bold">امت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {groups[selectedGroup].teams.map((team, i) => (
                    <tr key={i} className={team.qualified ? 'bg-cyan-400/5' : ''}>
                      <td className="p-3 text-center">
                        <span className={`font-mono font-bold ${team.qualified ? 'text-cyan-400' : 'text-slate-600'}`}>{i + 1}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-1 h-4 rounded-full ${team.qualified ? 'bg-cyan-400' : 'bg-slate-700'}`}></div>
                          <span className={`font-bold ${team.qualified ? 'text-white' : 'text-slate-400'}`}>{team.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center font-mono text-slate-400">{team.played}</td>
                      <td className="p-3 text-center font-mono text-slate-400" dir="ltr">{team.gd}</td>
                      <td className="p-3 text-center font-mono font-bold text-cyan-400">{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ۲. براکت حذفی */}
      {subTab === 'knockout' && (
        <div className="space-y-5">
          {bracket.map((round, ri) => (
            <div key={ri} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`h-px flex-1 ${ri === bracket.length - 1 ? 'bg-yellow-500/30' : 'bg-white/5'}`}></div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border whitespace-nowrap ${ri === bracket.length - 1 ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' : 'text-slate-400 border-white/5 bg-slate-900'}`}>
                  {ri === bracket.length - 1 && '🏆 '}{round.round}
                </span>
                <div className={`h-px flex-1 ${ri === bracket.length - 1 ? 'bg-yellow-500/30' : 'bg-white/5'}`}></div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {round.matches.map((match, mi) => (
                  <div key={mi} className={`bg-slate-900/60 border rounded-xl p-3 flex items-center gap-3 ${match.done ? 'border-cyan-400/20' : 'border-white/5'}`}>
                    <span className={`font-bold text-xs flex-1 text-right ${match.done ? 'text-white' : 'text-slate-500'}`}>{match.home}</span>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono text-sm font-bold ${match.done ? 'bg-slate-950 border-cyan-400/20 text-cyan-400' : 'bg-slate-950 border-white/5 text-slate-600'}`}>
                      <span>{match.homeScore}</span>
                      <span className="text-slate-700 text-xs">:</span>
                      <span>{match.awayScore}</span>
                    </div>
                    <span className={`font-bold text-xs flex-1 text-left ${match.done ? 'text-white' : 'text-slate-500'}`}>{match.away}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ۳. گلزنان */}
      {subTab === 'stats' && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300">کفش طلای مسابقات</h3>
          {scorers.map((p, i) => (
            <div key={i} className={`bg-slate-900/60 border rounded-xl p-4 flex items-center gap-3 ${i === 0 ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-white/5'}`}>
              <span className={`font-mono font-black text-base w-6 text-center ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-slate-600'}`}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                <span className="text-[10px] text-slate-400">{p.country}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="font-mono font-black text-base text-cyan-400 block">{p.goals}</span>
                  <span className="text-[9px] text-slate-500 uppercase">گل</span>
                </div>
                <div className="text-center">
                  <span className="font-mono font-bold text-sm text-emerald-400 block">{p.assists}</span>
                  <span className="text-[9px] text-slate-500 uppercase">پاس گل</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
