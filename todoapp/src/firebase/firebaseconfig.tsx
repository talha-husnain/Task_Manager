// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD52Tw_F2RIIyGWyiEI8ACqCoNAu2F9SFo',
  authDomain: 'todoapp-5a501.firebaseapp.com',
  projectId: 'todoapp-5a501',
  storageBucket: 'todoapp-5a501.appspot.com',
  messagingSenderId: '193017388037',
  appId: '1:193017388037:web:6f03430decc222a980106c',
  measurementId: 'G-8S4QHVHBPV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optionally initialize Firebase Analytics, if you plan to use it
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
