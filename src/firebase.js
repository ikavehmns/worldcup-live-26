import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxb1iZ8HxAMZx5VRM27u877zQOl0ylWCQ",
  authDomain: "worldcup-2026-e2f12.firebaseapp.com",
  projectId: "worldcup-2026-e2f12",
  storageBucket: "worldcup-2026-e2f12.firebasestorage.app",
  messagingSenderId: "371535349928",
  appId: "1:371535349928:web:f110e8b1dd8037fa705a9d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// ورود با گوگل
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// خروج
export const logOut = () => signOut(auth);

// گوش دادن به تغییر وضعیت کاربر
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

// خواندن داده کاربر از Firestore
export const getUserData = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

// ساخت پروفایل کاربر جدید در Firestore
export const createUserProfile = async (uid, displayName, email, photoURL) => {
  const ref = doc(db, "users", uid);
  await setDoc(ref, {
    displayName,
    email,
    photoURL,
    coins: 500,
    lastSpinTimestamp: null,
    predictions: [],
    createdAt: serverTimestamp(),
  });
};

// آپدیت سکه‌ها
export const updateCoins = async (uid, newAmount) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { coins: newAmount });
};

// آپدیت زمان آخرین چرخش گردونه
export const updateLastSpin = async (uid) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { lastSpinTimestamp: serverTimestamp() });
};

// ذخیره پیش‌بینی جدید
export const savePrediction = async (uid, prediction) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const current = snap.data().predictions || [];
    await updateDoc(ref, { predictions: [...current, prediction] });
  }
};
