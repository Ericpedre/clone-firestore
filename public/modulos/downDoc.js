// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdpsQab-Ys38Gy3BqCJOh4xMRJV6oofQI",
  authDomain: "strongdog-2.firebaseapp.com",
  databaseURL: "https://strongdog-2-default-rtdb.firebaseio.com",
  projectId: "strongdog-2",
  storageBucket: "strongdog-2.appspot.com",
  messagingSenderId: "335477571403",
  appId: "1:335477571403:web:2fe73fb45b7cf80435b2ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export async function guardarDoc(ruta) {

    const docRef = doc(db, 'CLIENTES', 'EricP:20666');
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
        console.log('Document data: ', JSON.stringify(docSnap.data()))

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(docSnap.data()));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", `${docSnap.id}.json`);
        dlAnchorElem.click();
        
    } else {
        console.log("No such document!");
    }

}