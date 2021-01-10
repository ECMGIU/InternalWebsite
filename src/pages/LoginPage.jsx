import firebase from 'firebase';
import { auth } from 'lib/firebase';
import React from 'react';

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

const signInWithIU = () => {
  // TODO: IU SAML Auth
};

const LoginPage = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center text-center">
    <div>🤠 <br />Woah there cowboy! <br />You&apos;re not logged in.</div>
    <button type="button" onClick={signInWithGoogle} className="button bg-black text-white m-4">Sign in with Google</button>
  </div>
);

export default LoginPage;
