import React, { useState } from 'react';
import Home from './views/Home';
import LiveMatch from './views/LiveMatch';
import Predictions from './views/Predictions';
import Tournament from './views/Tournament';
import Profile from './views/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [coins, setCoins] = useState(2450); // شبیه‌سازی کیف پول کاربر
  const [isPremium, setIsPremium] = useState(false); // وضعیت عضویت ویژه

  const switchTab = (tabId) => {
    setActiveTab(tabId);
  };

  const handleWinCoins = (amount) => {
    setCoins(prevCoins => prevCoins + amount);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-28 font-sans antialiased">
      
      {/* هدر سراسری با همگام‌سازی سکه‌ها */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 sticky top-0 z-[100] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-cyan-400">sports_soccer</span>
          <h1 className="text-base font-black text-white">جام جهانی ۲۰۲۶ زنده</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
            <span className="font-mono text-xs text-yellow-400 font-bold">{coins.toLocaleString('fa-IR')}</span>
          </div>
          <div onClick={() => switchTab('profile')} className="w-8 h-8 rounded-full border border-cyan-400 p-0.5 overflow-hidden cursor-pointer">
            <img className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* لود شدن پویای صفحات فرانت‌آند */}
      <main className="px-4 pt-6 max-w-md mx-auto w-full">
        {activeTab === 'home' && (
          <Home switchTab={switchTab} />
        )}

        {activeTab === 'live' && (
          <LiveMatch isPremium={isPremium} />
        )}

        {activeTab === 'predictions' && (
          <Predictions />
        )}

        {activeTab === 'tournament' && (
          <Tournament />
        )}

        {activeTab === 'profile' && (
          <Profile coins={coins} onWinCoins={handleWinCoins} />
        )}
      </main>

      {/* منوی ناوبری ۵ دکمه‌ای شیک پایین صفحه */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-slate-950/90 backdrop-blur-xl border-t border-slate-900 rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        {['home', 'live', 'predictions', 'tournament', 'profile'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => switchTab(tab)} 
            className={`flex flex-col items-center justify-center transition-all ${activeTab === tab ? 'text-cyan-400 scale-105' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <span className="material-symbols-outlined text-2xl">
              {tab === 'home' && 'home'}
              {tab === 'live' && 'sensors'}
              {tab === 'predictions' && 'insights'}
              {tab === 'tournament' && 'emoji_events'}
              {tab === 'profile' && 'person'}
            </span>
            <span className="text-[10px] font-bold mt-1">
              {tab === 'home' && 'خانه'}
              {tab === 'live' && 'زنده'}
              {tab === 'predictions' && 'پیش‌بینی'}
              {tab === 'tournament' && 'مسابقات'}
              {tab === 'profile' && 'من'}
            </span>
          </button>
        ))}
      </nav>
      
    </div>
  );
}