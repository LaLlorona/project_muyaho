import firebase from 'firebase/app';
import 'firebase/auth';

const oFirebase = firebase.initializeApp({});

export const oFirebaseAuth = oFirebase.auth();
