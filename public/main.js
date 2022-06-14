// import { guardarDoc } from './modulos/downDoc.js'
//import { guardarColl } from './modulos/downColl.js'
// import { crearDoc } from './modulos/upColl.js'
import { guardarColl } from './modulos/downDb.js'


// descomenta esta linea para descargar una coleccion entera
// CUIDADO: PUEDE TRAER MUCHOS DOCUMENTOS AL EJECUTARSE

guardarColl(['clientes','pedidos["transacciones"]']);

// solo funciona con las colecciones de la raiz




// crearDoc('file-in')