// ===============================
// FIREBASE.JS
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB9T17kttwzkRSnCTp3Ha4Tq2Rf91Fm2oU",
    authDomain: "premium-exam-system.firebaseapp.com",
    projectId: "premium-exam-system",
    storageBucket: "premium-exam-system.firebasestorage.app",
    messagingSenderId: "640657338512",
    appId: "1:640657338512:web:227bcf8996775bd5336815"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
    db,
    doc,
    getDoc,
    updateDoc
};