 import app from 'firebase/app'
 import 'firebase/auth'
 import "firebase/firestore";

 const config = {
   apiKey: "AIzaSyBR67h8UeT5tC44PYF82H0DHmg7fJXwLqU",
   authDomain: "marvel-quiz-db2d9.firebaseapp.com",
   projectId: "marvel-quiz-db2d9",
   storageBucket: "marvel-quiz-db2d9.appspot.com",
   messagingSenderId: "1057792945205",
   appId: "1:1057792945205:web:aae362df0d8abaed56557c",
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
 