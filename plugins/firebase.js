import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
        apiKey: "AIzaSyDcLrG5pu8G-PAl9tw4SwRmKSbtxHZSATE",
        authDomain: "rese-ed3be.firebaseapp.com",
        projectId: "rese-ed3be",
        storageBucket: "rese-ed3be.appspot.com",
        messagingSenderId: "285807968241",
        appId: "1:285807968241:web:719cf4f4050dbebabc0e50",
        measurementId: "G-ZJ80VCTXK3"
    }
  )

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
}
export default firebase