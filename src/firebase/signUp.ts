import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const signUp = async (email: string, password: string) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user.uid;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorMessage === 'Firebase: Error (auth/email-already-in-use).')
        throw new Error('Email já cadastrado');

      throw error;
      // ..
    });
};
