import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCYeQ3z89J0xTvgihANzB0lckfD-0hK9So",
  authDomain: "bolt-b9576.firebaseapp.com",
  projectId: "bolt-b9576",
  storageBucket: "bolt-b9576.appspot.com",
  messagingSenderId: "1088140593414",
  appId: "1:1088140593414:web:2655d76cd5c8bacd3c7687"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)


