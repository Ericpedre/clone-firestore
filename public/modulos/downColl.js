// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDswkNyh3K8gSHprFxMPh8yYIUHKKoVM48",
    authDomain: "strongdog-project.firebaseapp.com",
    projectId: "strongdog-project",
    storageBucket: "strongdog-project.appspot.com",
    messagingSenderId: "636171274219",
    appId: "1:636171274219:web:6b70f0aa188c5cb51a3bae"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export async function guardarColl(coleccion) {

    const querySnapshot  = await getDocs(collection(db, coleccion));

    let finalCollection = pulirCollection(querySnapshot);

    console.log(finalCollection)

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalCollection));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `${querySnapshot.query.id}.json`);
    // dlAnchorElem.click();

}

function pulirCollection (querySnapshot) {

    let finalCollection = [];

    querySnapshot.forEach(doc => {

        finalCollection.push({id: doc.id, data: doc.data()})

    });

    return finalCollection;
}