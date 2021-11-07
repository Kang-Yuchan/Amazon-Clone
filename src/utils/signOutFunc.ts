import firebase from '../../firebase/firebaseClient';

export const signOut = async () => firebase.auth().signOut();
