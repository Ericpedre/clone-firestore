// import { guardarDoc } from './modulos/downDoc.js'
//import { guardarColl } from './modulos/downColl.js'
// import { crearDoc } from './modulos/upColl.js'
// import { guardarColl } from './modulos/downDb.js'
import { upDb } from './modulos/upDb.js'


// descomenta esta linea para descargar una coleccion entera
// CUIDADO: PUEDE TRAER MUCHOS DOCUMENTOS AL EJECUTARSE

// guardarColl(['informes','productos','variables','clientes','pedidos["transacciones"]']);

// solo funciona con las colecciones de la raiz

upDb('file-in')


// crearDoc('file-in')