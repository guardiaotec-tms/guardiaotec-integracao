import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// função firebaseConfig que simplesmente retorna a sua config
import { firebaseConfig } from './firebaseConfig';

export const app = initializeApp(firebaseConfig());
export const db = getFirestore(app);
