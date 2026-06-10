import React, { useState } from 'react';

const matches = [
  {
    id: 1,
    group: 'یک‌هشتم نهایی',
    time: 'امشب ساعت ۲۰:۰۰',
    bonus: true,
    home: { name: 'آلمان', odds: '2.10' },
    away: { name: 'انگلیس', odds: '1.95' },
    drawOdds: '3.20',
  },
  {
    id: 2,
    group: 'یک‌هشتم نهایی',
    time: 'فردا ساعت ۱۷:۰۰',
    bonus: false,
    home: { name: 'فرانسه', odds: '1.70' },
    away: { name: 'بلژیک', odds: '2.50' },
    drawOdds: '3.60',
  },
  {
    id: 3,
    group: 'گروه C',
    time: 'پس‌فردا ساعت ۲۳:۰۰',
    bonus: false,
    home: { name: 'اسپانیا', odds: '1.85' },
    away: { name: 'پرتغال', odds: '2.20' },
    drawOdds: '3.10',
  },
];

const history = [
  { match: 'برزیل - کره‌جنوبی', pick: 'برزیل', result: 'win', coins: 120 },
  { match: 'آرژانتین - لهستان', pick: 'آرژانتین', result: 'win', coins: 90 },
  { match: 'ژاپن - مکزیک', pick: 'مساوی', result: 'loss', coins: -50 },
  { match: 'آمریکا - مراکش', pick: 'آمریکا', result: 'win', coins: 75 },
  { match: 'هلند - سنگال', pick: 'هلند', result: 'loss', coins: -50 },
];

const leaderboard = [
  { rank: 1, name: 'AliStar99', correct: 18, coins: 4200 },
  { rank: 2, name: 'PredictorX', correct: 16, coins: 3750 },
  { rank: 3, name: 'GoalMaster', correct: 15, coins: 3400 },
  { rank: 42, name: 'شما', correct: 9, coins: 1850, isMe: true },
];

export default function Predictions() {
  const [predictions, setPredictions] = useState({});
  const [activeTab, setActiveTab] = useState('active');

  const handlePredict = (matchId, type) => {
    setPredictions(prev => ({ ...prev, [matchId]: type }));
  };

  const wins = history.filter(h => h.result === 'win').length;
  const accuracy = Math.round((wins / history.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in pb-12">

      {/* هدر آمار کاربر */}
      <section className="bg-slate-900/60 backdrop-blur border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <img className="w-10 h-10 rounded-full object-cover border border-cyan-400" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80" alt="avatar" />
          <div>
            <h3 className="text-xs font-black text-white">الکس تامپسون</h3>
            <p className="text-[10px] text-slate-400">رتبه #۴۲ جهانی • اسطوره پیش‌بینی</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-950 rounded-lg p-2.5 text-center border border-white/5">
            <span className="font-mono font-black text-base text-cyan-400 block">{history.length}</span>
            <span className="text-[9px] text-slate-500 uppercase">پیش‌بینی</span>
          </div>
          <div className="bg-slate-950 rounded-lg p-2.5 text-center border border-white/5">
            <span className="font-mono font-black text-base text-emerald-400 block">{wins}</span>
            <span className="text-[9px] text-slate-500 uppercase">صحیح</span>
          </div>
          <div className="bg-slate-950 rounded-lg p-2.5 text-center border border-white/5">
            <span className="font-mono font-black text-base text-yellow-400 block">{accuracy}٪</span>
            <span className="text-[9px] text-slate-500 uppercase">دقت</span>
          </div>
        </div>
      </section>

      {/* تب‌های داخلی */}
      <nav className="flex border-b border-white/10">
        {[['active', 'مسابقات فعال'], ['history', 'تاریخچه'], ['leaderboard', 'رده‌بندی']].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-2.5 text-xs font-bold text-center transition-all ${activeTab === id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* مسابقات فعال */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {matches.map((match) => {
            const picked = predictions[match.id];
            return (
              <div key={match.id} className={`bg-slate-900/60 backdrop-blur border rounded-xl p-4 ${picked ? 'border-cyan-400/30' : 'border-white/5'}`}>
                <div className="flex justify-between items-center mb-3 text-[10px] text-slate-400">
                  <span>{match.group} • {match.time}</span>
                  {match.bonus && (
                    <span className="bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded font-bold">بونوس ۲x</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col items-center gap-1 w-1/3">
                    <span className="text-sm font-black text-white">{match.home.name}</span>
                    <span className="text-[10px] text-slate-500">میزبان</span>
                  </div>
                  <span className="text-[10px] text-slate-600 font-bold">VS</span>
                  <div className="flex flex-col items-center gap-1 w-1/3">
                    <span className="text-sm font-black text-white">{match.away.name}</span>
                    <span className="text-[10px] text-slate-500">مهمان</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2" dir="ltr">
                  {[
                    { type: 'home', label: match.home.name, odds: match.home.odds },
                    { type: 'draw', label: 'مساوی', odds: match.drawOdds },
                    { type: 'away', label: match.away.name, odds: match.away.odds },
                  ].map(({ type, label, odds }) => (
                    <button
                      key={type}
                      onClick={() => handlePredict(match.id, type)}
                      className={`flex flex-col items-center justify-center py-2.5 rounded-lg border transition-all ${picked === type ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400 shadow-inner' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-400/30'}`}
                    >
                      <span className="text-[8px] opacity-60 mb-0.5">{label}</span>
                      <span className="font-mono text-xs font-bold">{odds}</span>
                    </button>
                  ))}
                </div>

                {picked && (
                  <p className="text-[10px] text-center mt-3 text-cyan-400 font-semibold">
                    ✓ پیش‌بینی ثبت شد
                  </p>
                )}
              </div>
            );
          })}

          {/* چالش ۱ به ۱ */}
          <div className="bg-gradient-to-br from-cyan-400/5 to-transparent border border-white/5 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-black text-cyan-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">swords</span>
              چالش ۱ به ۱ با دوستان
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">یک لینک چالش بسازید و برنده تمام سکه‌ها شوید!</p>
            <button
              onClick={() => alert('لینک چالش کپی شد!')}
              className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-lg text-xs transition-colors"
            >
              ساخت چالش و دعوت از دوستان
            </button>
          </div>
        </div>
      )}

      {/* تاریخچه */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {history.map((h, i) => (
            <div key={i} className={`bg-slate-900/60 border rounded-xl p-3.5 flex items-center gap-3 ${h.result === 'win' ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${h.result === 'win' ? 'bg-emerald-500/15' : 'bg-red-500/15'}`}>
                <span className="material-symbols-outlined text-sm" style={{ color: h.result === 'win' ? '#34d399' : '#f87171' }}>
                  {h.result === 'win' ? 'check_circle' : 'cancel'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{h.match}</p>
                <p className="text-[10px] text-slate-400">پیش‌بینی: {h.pick}</p>
              </div>
              <span className={`font-mono font-bold text-sm ${h.result === 'win' ? 'text-emerald-400' : 'text-red-400'}`}>
                {h.result === 'win' ? '+' : ''}{h.coins}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* رده‌بندی */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-2">
          {leaderboard.map((p, i) => (
            <div key={i} className={`border rounded-xl p-3.5 flex items-center gap-3 ${p.isMe ? 'bg-cyan-400/10 border-cyan-400/30' : 'bg-slate-900/60 border-white/5'}`}>
              <span className={`font-mono font-black text-sm w-6 text-center ${p.rank === 1 ? 'text-yellow-400' : p.rank === 2 ? 'text-slate-300' : p.rank === 3 ? 'text-amber-600' : 'text-slate-500'}`}>
                {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : `#${p.rank}`}
              </span>
              <span className={`flex-1 text-xs font-bold ${p.isMe ? 'text-cyan-400' : 'text-white'}`}>{p.name}</span>
              <div className="flex items-center gap-3 text-xs">
                <div className="text-center">
                  <span className="font-mono font-bold text-emerald-400 block">{p.correct}</span>
                  <span className="text-[9px] text-slate-500">صحیح</span>
                </div>
                <div className="text-center">
                  <span className="font-mono font-bold text-yellow-400 block">{p.coins.toLocaleString('fa-IR')}</span>
                  <span className="text-[9px] text-slate-500">سکه</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
