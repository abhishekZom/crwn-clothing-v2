import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect
} from 'firebase/auth';

import {
  doc,
  getDoc,
  getFirestore,
  setDoc
} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCchGSUZC7cLaBr0wQX22VM_muCrgvE-YE",
  authDomain: "crwn-clothing-db-f92e9.firebaseapp.com",
  projectId: "crwn-clothing-db-f92e9",
  storageBucket: "crwn-clothing-db-f92e9.appspot.com",
  messagingSenderId: "625684873279",
  appId: "1:625684873279:web:ac462d518e2b587b00f88a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch(error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}