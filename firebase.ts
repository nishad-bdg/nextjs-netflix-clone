// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDKw247FbIHTJ0eZXs53EtYb3E2QxRho5w',
  authDomain: 'netflix-clone-a777c.firebaseapp.com',
  projectId: 'netflix-clone-a777c',
  storageBucket: 'netflix-clone-a777c.appspot.com',
  messagingSenderId: '815835478732',
  appId: '1:815835478732:web:15f5660bccc65de1526069',
  measurementId: 'G-VLXFCRJLRL',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
