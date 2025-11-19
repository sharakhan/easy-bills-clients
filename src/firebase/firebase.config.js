
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMhYPzHtL9gzR1K1wCHoanoT-4YzOAkZ8",
  authDomain: "easy-bill-management-system.firebaseapp.com",
  projectId: "easy-bill-management-system",
  storageBucket: "easy-bill-management-system.appspot.com",
  messagingSenderId: "565382033490",
  appId: "1:565382033490:web:daefbfd9cf0884ab4cef8b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
