import React, { useState, useEffect } from 'react';
import { updateCoins, updateLastSpin } from '../firebase';

export default function Profile({ user, userData, coins, onWinCoins, onLogout }) {
  const [spinDeg, setSpinDeg] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinStatus, setSpinStatus] = useState('چرخش روزانه رایگان شما آماده است!');
  const [lastPrize, setLastPrize] = useState(null);
  const [doubleAdWatched, setDoubleAdWatched] = useState(false);
  const [nextSpinTime, setNextSpinTime] = useState(null);
  const [countdownText, setCountdownText] = useState('');

  useEffect(() => {
    if (userData?.lastSpinTimestamp) {
      const lastSpin = userData.lastSpinTimestamp.toDate?.() 
        ? userData.lastSpinTimestamp.toDate().getTime() 
        : userData.lastSpinTimestamp;
      const nextTime = lastSpin + 24 * 60 * 60 * 1000;
      if (nextTime > Date.now()) setNextSpinTime(nextTime);
    }
  }, [userData]);

  useEffect(() => {
    if (!nextSpinTime) return;
    const interval = setInterval(() => {
      const diff = nextSpinTime - Date.now();
      if (diff <= 0) {
        setNextSpinTime(null);
        setCountdownText('');
        setSpinStatus('چرخش روزانه رایگان شما آماده است!');
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        const fa = n => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
        setCountdownText(`${fa(h)} ساعت و ${fa(m)} دقیقه و ${fa(s)} ثانیه`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextSpinTime]);

  const handleSpin = async () => {
    if (isSpinning || nextSpinTime) return;
    setIsSpinning(true);
    setDoubleAdWatched(false);
    setSpinStatus('درحال چرخش...');

    const roll = Math.random() * 100;
    let prize = 0, segmentIndex = 0;
    if (roll < 35) { prize = 0; segmentIndex = Math.random() > 0.5 ? 0 : 5; }
    else if (roll < 65) { prize = 10; segmentIndex = 1; }
    else if (roll < 85) { prize = 25; segmentIndex = 2; }
    else if (roll < 96) { prize = 50; segmentIndex = 3; }
    else { prize = 100; segmentIndex = 4; }

    const targetAngle = segmentIndex * 60 + 10 + Math.random() * 40;
    const finalRotation = 1440 + ((360 - targetAngle) % 360);
    setSpinDeg(finalRotation);

    setTimeout(async () => {
      setIsSpinning(false);
      setLastPrize(prize);
      if (prize > 0) {
        onWinCoins(prize);
        if (user) await updateCoins(user.uid, coins + prize);
        setSpinStatus(`شما برنده ${prize} سکه شدید! 🎁`);
      } else {
        setSpinStatus('پوچ! شانس بعدی یار شما باشد ❌');
      }
      if (user) await updateLastSpin(user.uid);
      setNextSpinTime(Date.now() + 24 * 60 * 60 * 1000);
    }, 4000);
  };

  const handleWatchDoubleAd = () => {
    if (doubleAdWatched || !lastPrize || lastPrize === 0) return;
    setSpinStatus('درحال بارگذاری تبلیغ...');
    setIsSpinning(true);
    setTimeout(async () => {
      setIsSpinning(false);
      setDoubleAdWatched(true);
      onWinCoins(lastPrize);
      if (user) await updateCoins(user.uid, coins + lastPrize * 2);
      setSpinStatus(`${lastPrize} سکه دیگر اضافه شد! 🎉`);
    }, 2000);
  };

  const handleWatchExtraSpinAd = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setNextSpinTime(null);
      setCountdownText('');
      setLastPrize(null);
      setDoubleAdWatched(false);
      setSpinStatus('یک شانس چرخش فوری هدیه داده شد 🎰');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">

      {/* کارت پروفایل */}
      <section className="flex flex-col items-center text-center space-y-3 pt-2">
        <div className="relative">
          <img
            alt="Avatar"
            className="w-20 h-20 rounded-full border-2 border-cyan-400 p-0.5 object-cover"
            src={user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
          />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">{user?.displayName || 'کاربر مهمان'}</h2>
          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>
        <button
          onClick={onLogout}
          className="text-[10px] text-slate-500 hover:text-red-400 transition-colors border border-white/5 px-4 py-1.5 rounded-full hover:border-red-400/30"
        >
          خروج از حساب
        </button>
      </section>

      {/* گردونه شانس */}
      <section className="bg-slate-900/60 backdrop-blur border border-white/5 rounded-xl p-6 flex flex-col items-center">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5 mb-5 self-start">
          <span className="material-symbols-outlined text-cyan-400 text-base">auto_awesome</span>
          گردونه شانس روزانه
        </h3>

        <div className="relative w-52 h-52 mb-6">
          <div
            style={{
              transform: `rotate(${spinDeg}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.85, 0.1, 1)' : 'none',
              background: 'conic-gradient(from 0deg, #00f2ff 0deg 60deg, #1e293b 60deg 120deg, #00f2ff 120deg 180deg, #1e293b 180deg 240deg, #00f2ff 240deg 300deg, #1e293b 300deg 360deg)'
            }}
            className="w-full h-full rounded-full border-4 border-slate-800 relative overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.15)]"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="absolute text-[10px] font-bold text-slate-950 -translate-y-20">پوچ</span>
              <span className="absolute text-[10px] font-bold text-white translate-x-16 -translate-y-10">۱۰ سکه</span>
              <span className="absolute text-[10px] font-bold text-slate-950 translate-x-16 translate-y-10">۲۵ سکه</span>
              <span className="absolute text-[10px] font-bold text-white translate-y-20">۵۰ سکه</span>
              <span className="absolute text-[10px] font-bold text-slate-950 -translate-x-16 translate-y-10">۱۰۰ سکه</span>
              <span className="absolute text-[10px] font-bold text-white -translate-x-16 -translate-y-10">پوچ</span>
            </div>
            <div className="absolute inset-0 m-auto w-10 h-10 bg-slate-950 border-2 border-cyan-400 rounded-full z-10 flex items-center justify-center">
              <span className="material-symbols-outlined text-cyan-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-500 rounded-t-sm z-20" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}></div>
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning || !!nextSpinTime}
          className={`font-black px-12 py-3 rounded-xl transition-all shadow-lg text-xs ${isSpinning || !!nextSpinTime ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 hover:scale-105 active:scale-95'}`}
        >
          {isSpinning ? 'در حال چرخش...' : nextSpinTime ? 'فردا برگردید' : 'بچرخان!'}
        </button>

        <span className="text-[10px] mt-4 font-bold text-center text-slate-400 leading-relaxed block max-w-xs">
          {countdownText ? `زمان انتظار: ${countdownText}` : spinStatus}
        </span>

        <div className="w-full mt-5 pt-5 border-t border-white/5 space-y-2">
          {lastPrize > 0 && !doubleAdWatched && (
            <button onClick={handleWatchDoubleAd} className="w-full py-2.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <span className="material-symbols-outlined text-sm">smart_display</span>
              دو برابر کردن جایزه با دیدن تبلیغ 📺
            </button>
          )}
          {!!nextSpinTime && (
            <button onClick={handleWatchExtraSpinAd} className="w-full py-2.5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <span className="material-symbols-outlined text-sm">smart_display</span>
              چرخش فوری با تماشای تبلیغ 📺
            </button>
          )}
        </div>
      </section>

    </div>
  );
}
