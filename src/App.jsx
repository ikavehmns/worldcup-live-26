import React, { useState, useEffect } from 'react';
import Home from './views/Home';
import LiveMatch from './views/LiveMatch';
import Predictions from './views/Predictions';
import Tournament from './views/Tournament';
import Profile from './views/Profile';
import { onAuthChange, signInWithGoogle, logOut, getUserData, createUserProfile } from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);         // اطلاعات Auth گوگل
  const [userData, setUserData] = useState(null); // داده‌های Firestore
  const [authLoading, setAuthLoading] = useState(true);
  const [isPremium] = useState(false);

  // گوش دادن به تغییر وضعیت ورود
  useEffect(() => {
    const unsub = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        let data = await getUserData(firebaseUser.uid);
        if (!data) {
          // اولین ورود — ساخت پروفایل جدید
          await createUserProfile(
            firebaseUser.uid,
            firebaseUser.displayName,
            firebaseUser.email,
            firebaseUser.photoURL
          );
          data = await getUserData(firebaseUser.uid);
        }
        setUserData(data);
      } else {
        setUser(null);
        setUserData(null);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await logOut();
  };

  const handleWinCoins = (amount) => {
    setUserData(prev => prev ? { ...prev, coins: (prev.coins || 0) + amount } : prev);
  };

  const coins = userData?.coins ?? 0;
  const switchTab = (tabId) => setActiveTab(tabId);

  // صفحه لودینگ
  if (authLoading) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <span className="material-symbols-outlined text-cyan-400 text-5xl animate-pulse">sports_soccer</span>
          <p className="text-slate-400 text-sm">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // صفحه ورود (اگه لاگین نکرده)
  if (!user) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-sm w-full">
          <div className="space-y-2">
            <span className="material-symbols-outlined text-cyan-400 text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>sports_soccer</span>
            <h1 className="text-2xl font-black text-white">جام جهانی ۲۰۲۶</h1>
            <p className="text-slate-400 text-sm">برای پیش‌بینی، گردونه شانس و رقابت وارد شوید</p>
          </div>

          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[['emoji_events', 'پیش‌بینی زنده'], ['monetization_on', 'جوایز سکه'], ['insights', 'رده‌بندی']].map(([icon, label]) => (
                <div key={icon} className="space-y-1">
                  <span className="material-symbols-outlined text-cyan-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  <p className="text-[10px] text-slate-400 font-bold">{label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-white hover:bg-gray-100 text-slate-900 font-black rounded-xl text-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.7-2.9-11.3-7.1l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.3 4-4.2 5.2l6.2 5.2C40.8 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
              </svg>
              ورود با حساب گوگل
            </button>
          </div>
          <p className="text-[10px] text-slate-600">ورود کاملاً رایگان است</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-28 font-sans antialiased">

      {/* هدر */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 sticky top-0 z-[100] px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-cyan-400">sports_soccer</span>
          <h1 className="text-sm font-black text-white">جام جهانی ۲۰۲۶ زنده</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
            <span className="font-mono text-xs text-yellow-400 font-bold">{coins.toLocaleString('fa-IR')}</span>
          </div>
          <div onClick={() => switchTab('profile')} className="w-8 h-8 rounded-full border border-cyan-400 p-0.5 overflow-hidden cursor-pointer">
            <img className="w-full h-full object-cover rounded-full" src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80'} alt="Avatar" />
          </div>
        </div>
      </header>

      {/* محتوای صفحات */}
      <main className="px-4 pt-6 max-w-md mx-auto w-full">
        {activeTab === 'home' && <Home switchTab={switchTab} />}
        {activeTab === 'live' && <LiveMatch isPremium={isPremium} />}
        {activeTab === 'predictions' && <Predictions user={user} userData={userData} setUserData={setUserData} />}
        {activeTab === 'tournament' && <Tournament />}
        {activeTab === 'profile' && (
          <Profile
            user={user}
            userData={userData}
            coins={coins}
            onWinCoins={handleWinCoins}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* منوی پایین */}
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
            <span className="text-[10px] font-bold mt-0.5">
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
