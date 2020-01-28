import app from 'firebase/app';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyC267_okoxb1fpFykYePqwjilHWtdq1pik",
  authDomain: "react-fireauth-9db87.firebaseapp.com",
  databaseURL: "https://react-fireauth-9db87.firebaseio.com",
  projectId: "react-fireauth-9db87",
  storageBucket: "react-fireauth-9db87.appspot.com",
  messagingSenderId: "584709656916",
  appId: "1:584709656916:web:9d41c7b326e1fcd8fcb8c1",
  measurementId: "G-011Z8RSMHG"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    // this.db = app.database();
  }

  // *** Auth API ***
  /* Create user with email and password */
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  /* Sign in with email and password */
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  /* Sign out the user */
  doSignOut = () => this.auth.signOut();

  /* Reset the password of the user */
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  /* Change the user password */
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}
export default Firebase;