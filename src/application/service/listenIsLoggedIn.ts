import { store } from '../store/configureStore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUserId } from '../store/features/auth/authSlice';

export const listenIsLoggedIn = (setIsLoggedIn: any) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    console.log('in useIsLoggedIn');
    if (user) {
      const uid = user.uid;
      setIsLoggedIn(true);
      store.dispatch(setUserId(uid));
    } else {
      setIsLoggedIn(false);
      store.dispatch(setUserId(''));
    }
  });
};
