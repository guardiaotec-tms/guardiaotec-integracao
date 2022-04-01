import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from '../store/features/auth/authSlice';
import { store } from '../store/configureStore';

export const listenUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const user = await getDoc(userRef);
  let data = user.data();
  if (data) {
    const { password, ...userData }: any = user.data();
    if (userData) {
      store.dispatch(setUser(userData));
    }
  } else {
    store.dispatch(setUser(null));
  }
};
