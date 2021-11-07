import firebase from '../../firebase/firebaseClient';

export const signInWithGoogle = async () => {
  const userCredentials = await firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());

  firebase.firestore().collection('users').doc(userCredentials.user?.uid).set({
    uid: userCredentials.user?.uid,
    email: userCredentials.user?.email,
    name: userCredentials.user?.displayName,
    provider: userCredentials.user?.providerData[0]?.providerId,
    photoUrl: userCredentials.user?.photoURL,
  });
};
