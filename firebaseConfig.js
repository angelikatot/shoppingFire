// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZMRwWLNp6S1RFn3k11i7d4JyMz7P9Elc",
    authDomain: "fir-cb475.firebaseapp.com",
    projectId: "fir-cb475",
    storageBucket: "fir-cb475.appspot.com",
    messagingSenderId: "949568694796",
    appId: "1:949568694796:web:66fbf4862584b51ba85c29",
    measurementId: "G-TD8BH8E0BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app; // Ensure app is exported for use in App.js
