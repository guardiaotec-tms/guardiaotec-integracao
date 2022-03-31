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
      const isAdmin = uid === '8apvlVyigrYY4cTJ9E2xl9LZvlS2';
      store.dispatch(setIsAdmin(isAdmin));
      store.dispatch(setUserId(uid));
    } else {
      setIsLoggedIn(false);
      store.dispatch(setUserId(''));
    }
  });
};
