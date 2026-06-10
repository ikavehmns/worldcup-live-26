import React, { useState } from 'react';

// ===== داده‌های ۸ گروه جام جهانی ۲۰۲۶ =====
const groups = [
  {
    id: 'A', teams: [
      { name: 'آمریکا',     played: 3, diff: '+4', pts: 7, qualified: true },
      { name: 'آرژانتین',   played: 3, diff: '+3', pts: 6, qualified: true },
      { name: 'هلند',        played: 3, diff: '0',  pts: 4 },
      { name: 'مراکش',      played: 3, diff: '-7', pts: 0 },
    ]
  },
  {
    id: 'B', teams: [
      { name: 'فرانسه',     played: 3, diff: '+5', pts: 7, qualified: true },
      { name: 'اسپانیا',    played: 3, diff: '+2', pts: 6, qualified: true },
      { name: 'ژاپن',       played: 3, diff: '-1', pts: 3 },
      { name: 'کانادا',     played: 3, diff: '-6', pts: 1 },
    ]
  },
  {
    id: 'C', teams: [
      { name: 'برزیل',      played: 3, diff: '+6', pts: 9, qualified: true },
      { name: 'پرتغال',     played: 3, diff: '+3', pts: 6, qualified: true },
      { name: 'مکزیک',      played: 3, diff: '-2', pts: 3 },
      { name: 'سنگال',      played: 3, diff: '-7', pts: 0 },
    ]
  },
  {
    id: 'D', teams: [
      { name: 'انگلیس',     played: 3, diff: '+4', pts: 7, qualified: true },
      { name: 'آلمان',      played: 3, diff: '+2', pts: 5, qualified: true },
      { name: 'کلمبیا',     played: 3, diff: '-1', pts: 4 },
      { name: 'ایتالیا',    played: 3, diff: '-5', pts: 1 },
    ]
  },
  {
    id: 'E', teams: [
      { name: 'بلژیک',      played: 3, diff: '+5', pts: 7, qualified: true },
      { name: 'اروگوئه',    played: 3, diff: '+1', pts: 5, qualified: true },
      { name: 'کرواسی',     played: 3, diff: '0',  pts: 4 },
      { name: 'کره جنوبی',  played: 3, diff: '-6', pts: 1 },
    ]
  },
  {
    id: 'F', teams: [
      { name: 'هلند',        played: 3, diff: '+3', pts: 7, qualified: true },
      { name: 'دانمارک',    played: 3, diff: '+2', pts: 5, qualified: true },
      { name: 'اکوادور',    played: 3, diff: '-1', pts: 3 },
      { name: 'قطر',         played: 3, diff: '-4', pts: 1 },
    ]
  },
  {
    id: 'G', teams: [
      { name: 'سوئیس',      played: 3, diff: '+4', pts: 7, qualified: true },
      { name: 'نیجریه',     played: 3, diff: '+1', pts: 5, qualified: true },
      { name: 'کامرون',     played: 3, diff: '-2', pts: 3 },
      { name: 'سربستان',    played: 3, diff: '-3', pts: 1 },
    ]
  },
  {
    id: 'H', teams: [
      { name: 'لهستان',     played: 3, diff: '+3', pts: 7, qualified: true },
      { name: 'غنا',         played: 3, diff: '+1', pts: 5, qualified: true },
      { name: 'شیلی',        played: 3, diff: '-1', pts: 3 },
      { name: 'استرالیا',   played: 3, diff: '-3', pts: 1 },
    ]
  },
];

// ===== داده‌های براکت حذفی =====
const bracket = [
  {
    round: 'یک‌هشتم نهایی',
    matches: [
      { home: 'برزیل',    homeScore: 2, away: 'کره جنوبی', awayScore: 0, done: true,  winner: 'برزیل' },
      { home: 'فرانسه',   homeScore: 3, away: 'دانمارک',   awayScore: 1, done: true,  winner: 'فرانسه' },
      { home: 'آرژانتین', homeScore: 2, away: 'اکوادور',   awayScore: 0, done: true,  winner: 'آرژانتین' },
      { home: 'انگلیس',   homeScore: 1, away: 'نیجریه',    awayScore: 0, done: true,  winner: 'انگلیس' },
      { home: 'اسپانیا',  homeScore: 2, away: 'لهستان',    awayScore: 1, done: true,  winner: 'اسپانیا' },
      { home: 'آلمان',    homeScore: 2, away: 'سوئیس',     awayScore: 1, done: true,  winner: 'آلمان' },
      { home: 'پرتغال',   homeScore: 3, away: 'غنا',        awayScore: 0, done: true,  winner: 'پرتغال' },
      { home: 'آمریکا',   homeScore: 2, away: 'بلژیک',     awayScore: 1, done: true,  winner: 'آمریکا' },
    ]
  },
  {
    round: 'یک‌چهارم نهایی',
    matches: [
      { home: 'برزیل',    homeScore: 2, away: 'فرانسه',    awayScore: 1, done: true,  winner: 'برزیل' },
      { home: 'آرژانتین', homeScore: 1, away: 'انگلیس',    awayScore: 1, done: true,  winner: 'آرژانتین', extra: 'پنالتی' },
      { home: 'اسپانیا',  homeScore: 0, away: 'آلمان',     awayScore: 1, done: true,  winner: 'آلمان' },
      { home: 'پرتغال',   homeScore: 2, away: 'آمریکا',    awayScore: 2, done: true,  winner: 'پرتغال', extra: 'وقت اضافه' },
    ]
  },
  {
    round: 'نیمه‌نهایی',
    matches: [
      { home: 'برزیل',    homeScore: 3, away: 'آرژانتین',  awayScore: 2, done: true,  winner: 'برزیل' },
      { home: 'آلمان',    homeScore: null, away: 'پرتغال', awayScore: null, done: false },
    ]
  },
  {
    round: 'فینال',
    matches: [
      { home: 'برزیل',    homeScore: null, away: '؟',      awayScore: null, done: false },
    ]
  },
];

// ===== داده‌های گلزنان =====
const topScorers = [
  { name: 'کیلیان امباپه',      country: 'فرانسه',    goals: 6, assists: 3, rank: 1 },
  { name: 'ارلینگ هالند',        country: 'نروژ',      goals: 5, assists: 2, rank: 2 },
  { name: 'وینیسیوس جونیور',    country: 'برزیل',     goals: 5, assists: 4, rank: 3 },
  { name: 'لیونل مسی',           country: 'آرژانتین',  goals: 4, assists: 5, rank: 4 },
  { name: 'هری کین',             country: 'انگلیس',    goals: 4, assists: 1, rank: 5 },
  { name: 'کریستیانو رونالدو',  country: 'پرتغال',    goals: 3, assists: 2, rank: 6 },
  { name: 'لوکاس اولمو',         country: 'اسپانیا',   goals: 3, assists: 3, rank: 7 },
  { name: 'رودریگو',             country: 'برزیل',     goals: 3, assists: 1, rank: 8 },
];

// ===== کامپوننت ردیف جدول =====
function TeamRow({ rank, name, played, diff, pts, qualified }) {
  return (
    <tr className={qualified ? 'bg-cyan-400/5' : ''}>
      <td className={`p-2.5 text-center font-mono font-bold text-xs ${qualified ? 'text-cyan-400' : 'text-slate-500'}`}>
        {rank}
      </td>
      <td className="p-2.5">
        <div className="flex items-center gap-2">
          {qualified && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"></span>}
          {!qualified && <span className="w-1.5 h-1.5 rounded-full bg-slate-700 flex-shrink-0"></span>}
          <span className={`text-xs font-bold ${qualified ? 'text-white' : 'text-slate-400'}`}>{name}</span>
        </div>
      </td>
      <td className="p-2.5 text-center font-mono text-xs text-slate-400">{played}</td>
      <td className="p-2.5 text-center font-mono text-xs text-slate-400" dir="ltr">{diff}</td>
      <td className={`p-2.5 text-center font-mono text-xs font-bold ${qualified ? 'text-cyan-400' : 'text-slate-400'}`}>{pts}</td>
    </tr>
  );
}

// ===== کامپوننت کارت مسابقه براکت =====
function MatchCard({ match }) {
  const { home, homeScore, away, awayScore, done, winner, extra } = match;
  return (
    <div className={`rounded-xl border p-3 space-y-2 ${done ? 'bg-slate-900/80 border-white/10' : 'bg-slate-900/40 border-white/5 border-dashed'}`}>
      {extra && (
        <span className="text-[9px] text-yellow-400 font-bold bg-yellow-400/10 px-1.5 py-0.5 rounded">{extra}</span>
      )}
      <div className={`flex justify-between items-center text-xs ${winner === home ? 'text-white font-bold' : 'text-slate-400'}`}>
        <span>{home}</span>
        <span className={`font-mono font-bold ${done ? (winner === home ? 'text-cyan-400' : 'text-slate-500') : 'text-slate-600'}`}>
          {done ? homeScore : '—'}
        </span>
      </div>
      <div className={`flex justify-between items-center text-xs ${winner === away ? 'text-white font-bold' : 'text-slate-400'}`}>
        <span>{away}</span>
        <span className={`font-mono font-bold ${done ? (winner === away ? 'text-cyan-400' : 'text-slate-500') : 'text-slate-600'}`}>
          {done ? awayScore : '—'}
        </span>
      </div>
    </div>
  );
}

// ===== کامپوننت اصلی =====
export default function Tournament() {
  const [subTab, setSubTab] = useState('group');
  const [selectedGroup, setSelectedGroup] = useState('A');

  const currentGroup = groups.find(g => g.id === selectedGroup);

  return (
    <div className="space-y-5 animate-fade-in pb-20">

      {/* تب‌های اصلی */}
      <nav className="flex gap-2 overflow-x-auto pb-1 scroll-hide">
        {[
          { id: 'group',    label: 'جدول گروه‌ها' },
          { id: 'knockout', label: 'مراحل حذفی' },
          { id: 'stats',    label: 'آمار گلزنان' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
              subTab === t.id
                ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* ===== تب ۱: جدول گروه‌ها ===== */}
      {subTab === 'group' && (
        <div className="space-y-4">

          {/* انتخاب‌گر گروه */}
          <div className="flex gap-2 overflow-x-auto scroll-hide pb-1">
            {groups.map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGroup(g.id)}
                className={`w-9 h-9 rounded-lg text-xs font-black flex-shrink-0 transition-all border ${
                  selectedGroup === g.id
                    ? 'bg-cyan-400 text-slate-950 border-cyan-400'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:border-cyan-400/30'
                }`}
              >
                {g.id}
              </button>
            ))}
          </div>

          {/* جدول گروه انتخاب‌شده */}
          <div className="bg-slate-900/60 backdrop-blur border border-white/5 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xs font-black text-white">گروه {selectedGroup}</h2>
              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>صعود</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>حذف</span>
              </div>
            </div>
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-950/60 text-slate-500 text-[10px]">
                  <th className="p-2.5 text-center">#</th>
                  <th className="p-2.5">تیم</th>
                  <th className="p-2.5 text-center">بازی</th>
                  <th className="p-2.5 text-center">تفاضل</th>
                  <th className="p-2.5 text-center">امتیاز</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentGroup.teams.map((team, i) => (
                  <TeamRow key={team.name} rank={i + 1} {...team} />
                ))}
              </tbody>
            </table>
          </div>

          {/* خلاصه همه گروه‌ها */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-wider">نگاه کلی — همه گروه‌ها</h3>
            <div className="grid grid-cols-2 gap-2">
              {groups.map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGroup(g.id)}
                  className={`bg-slate-900/60 border rounded-xl p-3 text-right transition-all ${
                    selectedGroup === g.id ? 'border-cyan-400/40' : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black ${selectedGroup === g.id ? 'text-cyan-400' : 'text-slate-400'}`}>
                      گروه {g.id}
                    </span>
                  </div>
                  {g.teams.slice(0, 2).map(t => (
                    <div key={t.name} className="flex items-center justify-between">
                      <span className="text-[10px] text-white font-bold">{t.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{t.pts}</span>
                    </div>
                  ))}
                  <div className="mt-1 pt-1 border-t border-white/5">
                    {g.teams.slice(2).map(t => (
                      <div key={t.name} className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">{t.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{t.pts}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== تب ۲: مراحل حذفی ===== */}
      {subTab === 'knockout' && (
        <div className="space-y-6">
          {bracket.map((stage, si) => (
            <div key={si} className="space-y-3">
              {/* هدر مرحله */}
              <div className="flex items-center gap-3">
                <div className={`h-px flex-1 ${si < bracket.length - 1 ? 'bg-white/5' : 'bg-cyan-400/30'}`}></div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                  si === bracket.length - 1
                    ? 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5'
                    : 'text-slate-400 border-white/10 bg-slate-900/60'
                }`}>
                  {stage.round}
                </span>
                <div className={`h-px flex-1 ${si < bracket.length - 1 ? 'bg-white/5' : 'bg-cyan-400/30'}`}></div>
              </div>

              {/* کارت‌های مسابقه */}
              <div className={`grid gap-3 ${stage.matches.length >= 4 ? 'grid-cols-2' : stage.matches.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {stage.matches.map((match, mi) => (
                  <MatchCard key={mi} match={match} />
                ))}
              </div>

              {/* فلش به مرحله بعد */}
              {si < bracket.length - 1 && (
                <div className="flex justify-center">
                  <span className="material-symbols-outlined text-slate-700 text-lg">arrow_downward</span>
                </div>
              )}
            </div>
          ))}

          {/* قهرمان احتمالی */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-4 flex items-center gap-4">
            <span className="material-symbols-outlined text-yellow-500 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            <div>
              <p className="text-[10px] text-yellow-500/70 font-bold uppercase tracking-wider">فینال در انتظار</p>
              <p className="text-xs font-black text-white mt-0.5">برزیل در انتظار حریف فینال</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== تب ۳: آمار گلزنان ===== */}
      {subTab === 'stats' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-white">کفش طلای مسابقات</h3>
            <span className="text-[10px] text-slate-500">{topScorers.length} بازیکن برتر</span>
          </div>

          {topScorers.map((p, i) => (
            <div
              key={p.name}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                i === 0
                  ? 'bg-gradient-to-l from-yellow-500/5 to-transparent border-yellow-500/20'
                  : i === 1
                  ? 'bg-slate-900/60 border-slate-700/50'
                  : 'bg-slate-900/40 border-white/5'
              }`}
            >
              {/* رتبه */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs ${
                i === 0 ? 'bg-yellow-500 text-slate-950' :
                i === 1 ? 'bg-slate-400 text-slate-950' :
                i === 2 ? 'bg-amber-700 text-white' :
                'bg-slate-800 text-slate-400'
              }`}>
                {i + 1}
              </div>

              {/* مشخصات */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${i < 3 ? 'text-white' : 'text-slate-300'}`}>{p.name}</p>
                <p className="text-[10px] text-slate-500">{p.country}</p>
              </div>

              {/* آمار */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-center">
                  <p className={`font-mono font-black text-sm ${i === 0 ? 'text-yellow-400' : 'text-cyan-400'}`}>{p.goals}</p>
                  <p className="text-[8px] text-slate-600 font-bold">گل</p>
                </div>
                <div className="text-center">
                  <p className="font-mono font-bold text-xs text-slate-400">{p.assists}</p>
                  <p className="text-[8px] text-slate-600 font-bold">پاس گل</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
