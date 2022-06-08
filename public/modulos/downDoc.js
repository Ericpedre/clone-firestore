// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export async function guardarDoc() {

    const docRef = doc(db, 'CLIENTES', 'EricP:20666');
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
        console.log('Document data: ', JSON.stringify(docSnap.data()))

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(docSnap.data()));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", `${docSnap.id}.json`);
        // dlAnchorElem.click();
        
    } else {
        console.log("No such document!");
    }

}