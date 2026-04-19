
import { initializeApp, cert, getApps, App, ServiceAccount } from "firebase-admin/app";

const appName = 'firebase-admin-app-[StakIt]';

function initializeAdminApp(): App {
    const existingApp = getApps().find(app => app.name === appName);
    if (existingApp) {
        return existingApp;
    }

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
        throw new Error("FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables must be set.");
    }
    
    const serviceAccount: ServiceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    return initializeApp({
        credential: cert(serviceAccount),
    }, appName);
}

export function getAdminApp(): App {
    return initializeAdminApp();
}
