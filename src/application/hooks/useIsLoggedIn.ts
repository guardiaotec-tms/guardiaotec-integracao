import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | 'loading'>('loading');
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log('in useIsLoggedIn');
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setIsLoggedIn(true);
      // ...
    } else {
      setIsLoggedIn(false);
      // User is signed out
      // ...
    }
  });

  return isLoggedIn;
};
