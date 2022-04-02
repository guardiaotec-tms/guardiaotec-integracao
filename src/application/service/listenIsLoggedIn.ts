import { listenUser } from './listenUser';
import { store } from '../store/configureStore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setIsAdmin, setUserId } from '../store/features/auth/authSlice';

export const listenIsLoggedIn = (setIsLoggedIn: any) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    console.log('in useIsLoggedIn');
    if (user) {
      const uid = user.uid;
      setIsLoggedIn(true);
      const isAdmin = uid === 'apylH29lhfghT8ccITg4PqXl4hg1';
      store.dispatch(setIsAdmin(isAdmin));
      store.dispatch(setUserId(uid));
      listenUser(uid);
    } else {
      setIsLoggedIn(false);
      store.dispatch(setUserId(''));
    }
  });
};
