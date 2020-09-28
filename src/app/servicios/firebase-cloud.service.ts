import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCloudService {

  constructor(private firebaseCloud: AngularFirestore) { }

  AgregarElemento(coleccion, elementoAgregar, idElemento){
    console.log("LLEGO ACA");
    return this.firebaseCloud.collection(coleccion).doc(idElemento).set(elementoAgregar);
  }

  AgregarElementoSinId(coleccion, elementoAgregar){    
    return this.firebaseCloud.collection(coleccion).add(elementoAgregar);
  }

  ActualizarElemento(coleccion, campoActualizado, idElemento){
    return this.firebaseCloud.collection(coleccion).doc(idElemento).update(campoActualizado);
  }

  ObtenerElemento(coleccion, idElemento){
    // this.firebaseCloud.collection("QWE").snapshotChanges
    return this.firebaseCloud.collection(coleccion).doc(idElemento).get();
  
  }

  BorrarElemento(coleccion, idElemento){
    return this.firebaseCloud.collection(coleccion).doc(idElemento).delete();
  }

  // REVISAR        TO DO
  ObtenerTodosElementos(coleccion){
    // this.firebaseCloud.collection("QWE").snapshotChanges
    return this.firebaseCloud.collection(coleccion).get();
  }

  // ObtenerTodosElementosDEE(coleccion, restriccion){
  //   return this.firebaseCloud.collection(coleccion).get(restriccion);
  // }
}

