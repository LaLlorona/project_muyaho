import firebase from 'firebase/app';
import 'firebase/auth';

const oFirebase = firebase.initializeApp({
	test: '1234',
});

export const oFirebaseAuth = oFirebase.auth();
