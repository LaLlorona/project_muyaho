import firebase from 'firebase/app';
import 'firebase/auth';

const oFirebase = firebase.initializeApp({
	test: '1234',
	test2: '1234',
	tset3: '123',
});

export const oFirebaseAuth = oFirebase.auth();
