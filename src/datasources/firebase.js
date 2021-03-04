import firebase from 'firebase/app';

const oFirebase = firebase.initializeApp({
	apiKey: 'AIzaSyBvVTLeforp5WJCoOZWRm5lmGrzwUl3-8g',
	authDomain: 'project-muyaho.firebaseapp.com',
	databaseURL: 'https://project-muyaho-default-rtdb.firebaseio.com',
	projectId: 'project-muyaho',
	storageBucket: 'project-muyaho.appspot.com',
	messagingSenderId: '420349513798',
	appId: '1:420349513798:web:4d6bc1104ec2d1e7903a47',
	measurementId: 'G-3QND9NWCP9',
});

export const oFirebaseAuth = oFirebase.auth();
