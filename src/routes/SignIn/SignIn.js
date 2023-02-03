import { getRedirectResult } from 'firebase/auth';
import { useEffect, useRef } from "react";

import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect
} from "../../utils/firebase/firebase.utils";

import SignUpForm from '../SignUpForm';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignIn;