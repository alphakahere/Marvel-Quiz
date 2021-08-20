 import app from 'firebase/app'
 import 'firebase/auth'
 import "firebase/firestore";

 const config = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID,
 };

 class Firebase {
   constructor() {
     app.initializeApp(config);
     this.auth = app.auth();
     this.db = app.firestore();
   }

   //  Inscription
   signupUser = (email, password) =>
     this.auth.createUserWithEmailAndPassword(email, password);

   // Connexion
   loginUser = (email, password) =>
     this.auth.signInWithEmailAndPassword(email, password);
   // Deconnexion
   signoutUser = () => this.auth.signOut();

   //  Reset password

   resetPassword = (email) => this.auth.sendPasswordResetEmail(email);

   user = uid => this.db.doc(`users/${uid}`);
 }  
 export default Firebase
 