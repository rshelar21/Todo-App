import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCLEhUg5EoKP9NBmlikrn4o8IkfAD5iB94",
  authDomain: "todo-list-c85fb.firebaseapp.com",
  projectId: "todo-list-c85fb",
  storageBucket: "todo-list-c85fb.appspot.com",
  messagingSenderId: "60062005950",
  appId: "1:60062005950:web:b329334e62484234cd3cef"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;