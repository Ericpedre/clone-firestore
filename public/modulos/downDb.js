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


function getColeccion(ref) {
    return getDocs(collection(db, ref))
}

function splitSubCollections(element) {
    let subCollections

    let splited = element.split('[')
    if (splited.length === 1) {
        subCollections = []
    } else {
        subCollections = JSON.parse('[' + splited[1])
    }

    return {
        name: splited[0],
        subCollections: subCollections
    }
}

export function guardarColl(collections) {

    let downBtn = document.getElementById('down-btn')
    downBtn.innerHTML = `Descargar datos de ${app._options.projectId}`;

    downBtn.addEventListener('click', async function () {
        let finalDb = await Promise.all(collections.map(async function (element) {
            let collectionName = splitSubCollections(element).name
            let subCollections = splitSubCollections(element).subCollections

            let querySnapshot = await getColeccion(collectionName)
            querySnapshot = pulirCollection([querySnapshot])[0]

            if (subCollections.length === 0) {
                return querySnapshot
            } else {
                let newDocs = await Promise.all(querySnapshot.docs.map(async doc => {
                    let querySnapshot = await getColeccion(collectionName + '/' + doc.id + '/' + subCollections[0])
                    
                    let newDoc = pulirCollection([querySnapshot])

                    addDocument(doc, newDoc)

                    return doc
                    
                }))

                return querySnapshot
            }
        }))

        
        console.log(finalDb)
        descargar(finalDb)
    })
}

function pulirCollection(querySnapshots) {

    let finalCollection = [];

    querySnapshots.forEach(querySnapshot => {
        let docs = []
        querySnapshot.forEach(doc => {
            docs.push({
                id: doc.id,
                data: doc.data()
            })
        });
        finalCollection.push({
            name: querySnapshot.query.id,
            docs: docs
        })
    });

    return finalCollection;
}

function descargar(finalCollection) {
    // se descargan los datos
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalCollection));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `db.json`);
    dlAnchorElem.click();
}

function addDocument(doc, newDoc) {
    newDoc = newDoc[0]

    if (doc) {
        if (doc['subCollections']) {
            doc['subCollections'].push(newDoc)
        } else {
            doc['subCollections'] = [newDoc]
        }
    } else {
        doc['subCollections'] = [newDoc]
    }
    
}