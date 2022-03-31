import { getDoc, doc } from 'firebase/firestore';
import { db } from './../../firebase/firebase';
import { store } from '../store/configureStore';
import { setUserCompanyId } from '../store/features/company/companySlice';

export const getUserCompanyInfo = async (userId: string) => {
  console.log(userId);
  //download user info from Id, and set the company Id
  const userDoc = await getDoc(doc(db, 'users', userId));
  const companyId = userDoc.data()?.companyId;
  console.log(companyId);

  store.dispatch(setUserCompanyId(companyId));
};
