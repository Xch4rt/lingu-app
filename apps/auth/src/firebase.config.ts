import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

export function initializerFirebase() {

    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_JD,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBAS_MEASURAMENT_ID
    };


    const app = initializeApp(firebaseConfig);

    const analytics = getAnalytics(app);

    const firebaseAuth = getAuth(app);

    return {app, analytics, firebaseAuth};
}
