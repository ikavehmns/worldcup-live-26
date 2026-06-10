import React, { useState, useEffect } from 'react';

export default function Profile({ coins, onWinCoins }) {
  const [spinDeg, setSpinDeg] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinStatus, setSpinStatus] = useState('چرخش روزانه رایگان شما آماده است!');
  
  // وضعیت‌های مربوط به آگهی‌های ویدیویی تبلیغاتی
  const [lastPrize, setLastPrize] = useState(null);
  const [doubleAdWatched, setDoubleAdWatched] = useState(false);
  const [extraSpinAdWatched, setExtraSpinAdWatched] = useState(false);

  // سیستم زمان‌سنجی ۲۴ ساعته گردونه
  const [nextSpinTime, setNextSpinTime] = useState(null);
  const [countdownText, setCountdownText] = useState('');

  useEffect(() => {
    // خواندن آخرین زمان چرخش از حافظه پایدار مرورگر
    const savedTime = localStorage.getItem('last_spin_timestamp');
    if (savedTime) {
      const waitPeriod = 24 * 60 * 60 * 1000; // ۲۴ ساعت به میلی‌ثانیه
      const nextTime = parseInt(savedTime) + waitPeriod;
      setNextSpinTime(nextTime);
    }
  }, []);

  // محاسبه لحظه‌ای ثانیه‌شمار برای چرخش بعدی
  useEffect(() => {
    if (!nextSpinTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = nextSpinTime - now;

      if (difference <= 0) {
        setNextSpinTime(null);
        setCountdownText('');
        setSpinStatus('چرخش روزانه رایگان شما آماده است!');
        clearInterval(interval);
      } else {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        const hFa = hours.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
        const mFa = minutes.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
        const sFa = seconds.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

        setCountdownText(`زمان انتظار باقی‌مانده: ${hFa} ساعت و ${mFa} دقیقه و ${sFa} ثانیه`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextSpinTime]);

  // چرخاندن مهندسی‌شده گردونه
  const handleSpin = () => {
    if (isSpinning || nextSpinTime) return;

    setIsSpinning(true);
    setDoubleAdWatched(false);
    setSpinStatus('درحال چرخش...');

    // ۱. فرمول احتمالاتی دقیق جوایز بر اساس درخواست شما:
    // شانس‌ها: پوچ (۳۵٪)، ۱۰ سکه (۳۰٪)، ۲۵ سکه (۲۰٪)، ۵۰ سکه (۱۱٪)، ۱۰۰ سکه (۴٪)
    const roll = Math.random() * 100;
    let prize = 0;
    let segmentIndex = 0; // سگمنت‌های گردونه (هر کدام ۶۰ درجه)

    if (roll < 35) {
      prize = 0; // پوچ
      segmentIndex = Math.random() > 0.5 ? 0 : 5; // سگمنت 0 یا 5
    } else if (roll < 65) {
      prize = 10;
      segmentIndex = 1; // سگمنت 1
    } else if (roll < 85) {
      prize = 25;
      segmentIndex = 2; // سگمنت 2
    } else if (roll < 96) {
      prize = 50;
      segmentIndex = 3; // سگمنت 3
    } else {
      prize = 100; // بالاترین رقم با شانس کم (۴٪)
      segmentIndex = 4; // سگمنت 4
    }

    // ۲. محاسبه زاویه توقف دقیق روی سگمنت مشخص‌شده تا نشان‌گر دقیقاً روی آن بایستد
    const segmentMinAngle = segmentIndex * 60;
    const targetAngleInSegment = segmentMinAngle + 10 + Math.random() * 40; 
    const rotationRemainder = (360 - targetAngleInSegment) % 360;
    const finalRotation = 1440 + rotationRemainder; // حداقل ۴ دور کامل

    setSpinDeg(finalRotation);

    // ۳. پس از اتمام چرخش (۴ ثانیه بعد)
    setTimeout(() => {
      setIsSpinning(false);
      setLastPrize(prize);

      if (prize > 0) {
        onWinCoins(prize);
        setSpinStatus(`شما برنده ${prize.toLocaleString('fa-IR')} سکه شدید! 🎁`);
      } else {
        setSpinStatus('پوچ! شانس بعدی یار شما باشد ❌');
      }

      // ذخیره زمان چرخش در مرورگر برای قفل ۲۴ ساعته
      const nowTimestamp = new Date().getTime();
      localStorage.setItem('last_spin_timestamp', nowTimestamp.toString());
      setNextSpinTime(nowTimestamp + 24 * 60 * 60 * 1000);

    }, 4000);
  };

  // شبیه‌سازی تماشای ویدئوی تبلیغاتی برای دوبرابر کردن جایزه
  const handleWatchDoubleAd = () => {
    if (doubleAdWatched || !lastPrize || lastPrize === 0) return;
    
    setSpinStatus('درحال بارگذاری ویدئوی تبلیغاتی تپسل...');
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      setDoubleAdWatched(true);
      onWinCoins(lastPrize); // پرداخت مجدد همان مقدار جایزه (دو برابر کردن)
      setSpinStatus(`تبلیغ تماشا شد! ${lastPrize.toLocaleString('fa-IR')} سکه دیگر اضافه شد! 🎉`);
    }, 2000); // شبیه‌سازی لود تیزر تبلیغاتی به مدت ۲ ثانیه
  };

  // شبیه‌سازی تماشای ویدئوی تبلیغاتی برای چرخش مجدد فوری بدون انتظار ۲۴ ساعته
  const handleWatchExtraSpinAd = () => {
    setSpinStatus('درحال بارگذاری ویدئوی تبلیغاتی ادیوری...');
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      setNextSpinTime(null);
      setCountdownText('');
      setLastPrize(null);
      setDoubleAdWatched(false);
      localStorage.removeItem('last_spin_timestamp'); // حذف قفل زمانی
      setSpinStatus('آفرین! یک شانس چرخش فوری دیگر به شما هدیه داده شد 🎰');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* کارت مشخصات کاربر */}
      <section className="flex flex-col items-center text-center space-y-3 pt-4">
        <div className="relative">
          <img alt="Avatar" className="w-20 h-20 rounded-full border-2 border-cyan-400 p-0.5 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" />
          <div className="absolute -bottom-1 -left-1 bg-yellow-500 p-1.5 rounded-full border-2 border-slate-950 flex items-center justify-center">
            <span className="material-symbols-outlined text-[10px] text-slate-950 font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
        </div>
        <div>
          <h2 className="text-md font-bold text-white">الکس تامپسون</h2>
          <p className="text-xs text-slate-400">شناسه کاربر: #424912 • سطح ۴۲</p>
        </div>
      </section>

      {/* گردونه شانس با کالیبراسیون جدید */}
      <section className="bg-slate-900/60 backdrop-blur border border-white/5 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5 mb-5 self-start">
          <span className="material-symbols-outlined text-cyan-400">auto_awesome</span>
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
            {/* متن‌ها و لیبل‌های روی گردونه */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="absolute text-[10px] font-bold text-slate-950 -translate-y-20">پوچ</span>
              <span className="absolute text-[10px] font-bold text-white translate-x-16 -translate-y-10 rotate-60">۱۰ سکه</span>
              <span className="absolute text-[10px] font-bold text-slate-950 translate-x-16 translate-y-10 rotate-[120deg]">۲۵ سکه</span>
              <span className="absolute text-[10px] font-bold text-white translate-y-20 rotate-180">۵۰ سکه</span>
              <span className="absolute text-[10px] font-bold text-slate-950 -translate-x-16 translate-y-10 rotate-[240deg]">۱۰۰ سکه</span>
              <span className="absolute text-[10px] font-bold text-white -translate-x-16 -translate-y-10 rotate-[300deg]">پوچ</span>
            </div>
            <div className="absolute inset-0 m-auto w-10 h-10 bg-slate-950 border-2 border-cyan-400 rounded-full z-10 flex items-center justify-center">
              <span className="material-symbols-outlined text-cyan-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-500 rounded-t-sm z-20" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}></div>
        </div>

        {/* دکمه چرخش */}
        <button 
          onClick={handleSpin}
          disabled={isSpinning || !!nextSpinTime}
          className={`font-black px-12 py-3 rounded-xl transition-all shadow-lg text-xs ${isSpinning || !!nextSpinTime ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 hover:scale-105 active:scale-95'}`}
        >
          {isSpinning ? 'در حال چرخش...' : nextSpinTime ? 'فردا برگردید' : 'بچرخان!'}
        </button>

        {/* متن راهنما یا تایمر معکوس */}
        <span className="text-[10px] mt-4 font-bold text-center text-slate-400 leading-relaxed block max-w-xs">
          {countdownText ? countdownText : spinStatus}
        </span>

        {/* دکمه‌های ویدئویی تپسل/ادیوری */}
        <div className="w-full mt-6 pt-5 border-t border-white/5 space-y-2">
          {/* دکمه دوبرابر کردن جایزه */}
          {lastPrize > 0 && !doubleAdWatched && (
            <button 
              onClick={handleWatchDoubleAd}
              className="w-full py-2.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">smart_display</span>
              دو برابر کردن جایزه با دیدن ویدیو تبلیغاتی 📺
            </button>
          )}

          {/* دکمه چرخش مجدد فوری */}
          {!!nextSpinTime && (
            <button 
              onClick={handleWatchExtraSpinAd}
              className="w-full py-2.5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">smart_display</span>
              میانبر چرخش مجدد فوری با تماشای تبلیغ 📺
            </button>
          )}
        </div>
      </section>

    </div>
  );
}