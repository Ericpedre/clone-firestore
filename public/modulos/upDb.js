// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export function upDb(inputId){
    let input = document.getElementById(inputId);

    input.addEventListener('change', async function () {
        let file = input.files[0];
        let text = await file.text();
        let json = JSON.parse(text)
        
        console.log(json)
        
        writeDb(json)
        
    })

}

async function writeDb(json) {

    json.forEach(collection => {
        collection.docs.forEach(document => {
            console.log('"Witing..."')
            setDoc(doc(db, collection.name, `${document.id}`), document.data);
            if(document.subCollections){
                console.log("has subCollections")
                document.subCollections.forEach(subCollection => {
                    subCollection.docs.forEach(document2 => {
                        setDoc(doc(db, collection.name, `${document.id}`, `${subCollection.name}`, `${document2.id}`), document2.data);
                    })
                })
            } else {
                console.log("no has subCollections")
            }
        })
    });
}