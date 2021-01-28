import firebase from 'firebase/app';
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
  <div className="flex flex-col items-center justify-center w-screen h-screen text-center">
    <div>🤠 <br />Woah there cowboy! <br />You&apos;re not logged in.</div>
    <button type="button" onClick={signInWithGoogle} className="m-4 text-white bg-black button">Sign in with Google</button>
  </div>
);

export default LoginPage;
