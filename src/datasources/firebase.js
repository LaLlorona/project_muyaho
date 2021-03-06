import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// firebase init - add your own config here
const firebaseConfig = {};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
const commentsCollection = db.collection('comments');
const likesCollection = db.collection('likes');
const imageStorage = firebase.storage();

// export utils/refs
export {
	db,
	auth,
	usersCollection,
	postsCollection,
	commentsCollection,
	likesCollection,
	imageStorage,
};
