import firebase from 'firebase';
import { auth } from 'lib/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect } from 'react-router-dom';

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

const signInWithIU = () => {
  // TODO: IU SAML Auth
};

const LoginPage = () => {
  const [user] = useAuthState(auth);
  return user ? <Redirect to="/" /> : <button type="button" onClick={signInWithGoogle} className="button m-4">Sign in with Google</button>;
};

export default LoginPage;
