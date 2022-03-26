import { RootState, store } from './../store/configureStore';
import { useActions } from './useActions';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { setUserId } from '../store/features/auth/authSlice';
// import { useState } from 'react';

export const listenIsLoggedIn = (setIsLoggedIn: any) => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | 'loading'>('loading');
  const auth = getAuth();
  // const { setUserId } = useActions();
  // const currentUserId = useSelector((state: RootState) => state.auth.userId);

  onAuthStateChanged(auth, (user) => {
    console.log('in useIsLoggedIn');
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setIsLoggedIn(true);
      store.dispatch(setUserId(uid));
      // ...
    } else {
      setIsLoggedIn(false);
      // setUserId('');
      store.dispatch(setUserId(''));
      // User is signed out
      // ...
    }
  });

  // return isLoggedIn;
};
