// ===== FIREBASE SETUP FOR CRICTAKKAR =====

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyBYOs-GNvpmbp6gGM5A5N2A4nPT2wvMfbE",
  authDomain: "crictakkar-44c10.firebaseapp.com",
  projectId: "crictakkar-44c10",
  storageBucket: "crictakkar-44c10.firebasestorage.app",
  messagingSenderId: "96883177573",
  appId: "1:96883177573:web:215aba6e651fbac6086e8c"
};

// Start Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ===== SIGN UP WITH EMAIL AND PASSWORD =====
async function signUpUser(email, password, username, favouriteTeam) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send verification email
    await sendEmailVerification(user);

    // Save profile to database
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      favouriteTeam: favouriteTeam,
      quizzesPlayed: 0,
      totalScore: 0,
      totalQuestions: 0,
      currentStreak: 0,
      bestStreak: 0,
      xp: 0,
      level: "Debutant",
      emailVerified: false,
      loginMethod: "email",
      joinedDate: new Date().toISOString()
    });

    return { success: true, user: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ===== LOG IN WITH EMAIL AND PASSWORD =====
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ===== SIGN IN WITH GOOGLE =====
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if this user already has a profile
    const existingProfile = await getUserProfile(user.uid);

    if (!existingProfile.success) {
      // New user — create their profile
      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName || "CricFan",
        email: user.email,
        favouriteTeam: "",
        quizzesPlayed: 0,
        totalScore: 0,
        totalQuestions: 0,
        currentStreak: 0,
        bestStreak: 0,
        xp: 0,
        level: "Debutant",
        emailVerified: true,
        loginMethod: "google",
        joinedDate: new Date().toISOString()
      });
      return { success: true, user: user, isNewUser: true };
    }

    return { success: true, user: user, isNewUser: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ===== LOG OUT =====
async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ===== GET USER PROFILE =====
async function getUserProfile(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: "No profile found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ===== SAVE QUIZ RESULT =====
async function saveQuizResult(uid, score, totalQuestions) {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      quizzesPlayed: increment(1),
      totalScore: increment(score),
      totalQuestions: increment(totalQuestions),
      xp: increment(score * 10)
    });

    const profile = await getUserProfile(uid);
    if (profile.success) {
      const totalXP = profile.data.xp;
      const newLevel = calculateLevel(totalXP);
      await updateDoc(userRef, { level: newLevel });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
