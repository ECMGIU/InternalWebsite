import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// These look like they should be secured, but that's not needed
const firebaseConfig = {
  apiKey: 'AIzaSyCxDhYtIrjvRHl19pMDk1pQ4BA_cQDQXcY',
  authDomain: 'iu-ecmg-internal.firebaseapp.com',
  projectId: 'iu-ecmg-internal',
  storageBucket: 'iu-ecmg-internal.appspot.com',
  messagingSenderId: '298651320163',
  appId: '1:298651320163:web:dcd23b45bfb169cd795d56',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Enable Analytics
firebase.analytics();
