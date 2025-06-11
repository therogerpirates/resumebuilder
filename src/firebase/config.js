// Firebase configuration
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { 
  getFirestore,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8JoyngGx99kNU0CZedej5USSL6rAbyLM",
  authDomain: "resumeai-72e9e.firebaseapp.com",
  projectId: "resumeai-72e9e",
  storageBucket: "resumeai-72e9e.firebasestorage.app",
  messagingSenderId: "458590695020",
  appId: "1:458590695020:web:e8c856c7a026b73be43249"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Configure Firestore settings
try {
  db.settings({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  });
} catch (settingsError) {
  console.warn('Firestore settings error:', settingsError);
}

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('Current browser does not support all required features for persistence');
  }
});

// Set auth persistence
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting auth persistence:', error);
});

// Initialize Google Auth Provider
let googleProvider;
try {
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
} catch (googleError) {
  console.warn("Google provider not configured:", googleError);
  googleProvider = null;
}

console.log("Firebase initialized successfully");

export { auth, db, googleProvider };
