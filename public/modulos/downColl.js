// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

console.log(db)

export async function guardarColl(coleccion) {

    // btn 
    let downBtn = document.getElementById("down-btn");
    downBtn.innerHTML = `Descargar datos de ${app._options.projectId}`;

    downBtn.addEventListener('click', async function () {
        const querySnapshot  = await getDocs(collection(db, coleccion));

        let finalCollection = pulirCollection(querySnapshot);
    
        console.log(finalCollection)
    
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalCollection));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", `${querySnapshot.query.id}.json`);
        dlAnchorElem.click();  
    })
}

function pulirCollection (querySnapshot) {

    let finalCollection = [];

    querySnapshot.forEach(doc => {

        finalCollection.push({id: doc.id, data: doc.data()})

    });

    return finalCollection;
}