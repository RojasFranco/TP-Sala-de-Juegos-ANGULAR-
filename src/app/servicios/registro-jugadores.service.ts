import { Injectable } from '@angular/core';
import { FirebaseCloudService } from './firebase-cloud.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroJugadoresService {

  coleccionGuardar: string;
  constructor(private fb: FirebaseCloudService) { 
    this.coleccionGuardar = "lista-jugadores"
  }

  GuardarJugador(correo: string, totalPuntos: number){
    let datosGuardar = {
      Puntaje: totalPuntos
    };    
    return this.fb.AgregarElemento(this.coleccionGuardar,datosGuardar,correo);
  }

  async ActualizarPuntaje(correo:string, puntosNuevos:number){
    // this.fb.ActualizarElemento(this.coleccionGuardar, datosActualizados, correo);
    let jugadorActual = this.ObtenerJugador(correo);
    let puntajeActual;
    jugadorActual.subscribe(rta=>{
      puntajeActual=rta.data().Puntaje;
      let nuevosDatos = {
        Puntaje: puntajeActual+puntosNuevos
      };
      return this.fb.ActualizarElemento(this.coleccionGuardar, nuevosDatos, correo);
    })
  }

  ObtenerJugador(correoId: string){
    return this.fb.ObtenerElemento(this.coleccionGuardar,correoId);
  }

  ObtenerJugadores(){
    return this.fb.ObtenerTodosElementos(this.coleccionGuardar);
  }
}
