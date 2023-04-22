import ReactDOM from 'react-dom/client';
import './index.scss';
import { initializeApp } from 'firebase/app';
import App from './App';

initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'chatty-e56ee.firebaseapp.com',
  databaseURL: 'https://chatty-e56ee-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chatty-e56ee',
  storageBucket: 'chatty-e56ee.appspot.com',
  messagingSenderId: '801097964194',
  appId: '1:801097964194:web:d37f74aa66b84c5bca15fb',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
