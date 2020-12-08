// import firebase from "firebase";
// import "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDjeMWKxg3jaHTHslFIU_MlqcIHMD0J2aI",
//   authDomain: "memkeep-da8fa.firebaseapp.com",
//   databaseURL: "https://memkeep-da8fa.firebaseio.com",
//   projectId: "memkeep-da8fa",
//   storageBucket: "memkeep-da8fa.appspot.com",
//   messagingSenderId: "798430700063",
//   appId: "1:798430700063:web:bc5467337d4e357859ab2a",
// };

// class Fire {
//   constructor(callback) {
//     this.init(callback);
//   }

//   init(callback) {
//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }

//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         callback(null, user);
//       } else {
//         firebase
//           .auth()
//           .signInAnonymously()
//           .catch((error) => {
//             callback(error);
//           });
//       }
//     });
//   }

//   getLists(callback) {
//     let ref = firebase
//       .firestore()
//       .collection("users")
//       .doc(this.userId)
//       .collection("lists");

//     this.unsubscribe = ref.onSnapshot((snapshot) => {
//       lists = [];

//       snapshot.forEach((doc) => {
//         lists.push({ id: doc.id, ...doc.data() });
//       });
//       callback(lists);
//     });
//   }

//   get UserId() {
//     return firebase.auth().currentUser.uid;
//   }
// }

// export default Fire;
