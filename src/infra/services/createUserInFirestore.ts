import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from './../../firebase/firebase';
type CompanyAccessType = 'Administrador' | 'Editor';

export const createFirestoreUser = async (
  userId: string,
  companyId: string,
  accessType: CompanyAccessType
) => {
  try {
    const docRef = doc(db, 'users', userId);
    const data = { companyId, accessType };
    const response = await setDoc(docRef, data);
    return response;
  } catch (error: any) {
    throw new Error('Não foi possível criar usuário (firestore)');
  }
};
