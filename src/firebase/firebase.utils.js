import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAxmcs3EnIHchMzDRjE_WCeareABCFTdPQ",
    authDomain: "crwn-db-651f6.firebaseapp.com",
    databaseURL: "https://crwn-db-651f6.firebaseio.com",
    projectId: "crwn-db-651f6",
    storageBucket: "crwn-db-651f6.appspot.com",
    messagingSenderId: "671300045132",
    appId: "1:671300045132:web:a22fcfb57a50076afc27e9"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;