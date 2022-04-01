import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from 'firebase/auth';

export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    }
  );
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;

  //   });
};

export const signOut = async () => {
  fbSignOut(getAuth());
};
