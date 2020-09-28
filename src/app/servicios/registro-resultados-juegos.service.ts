import { Injectable } from '@angular/core';
import { FirebaseCloudService } from './firebase-cloud.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroResultadosJuegosService {

  nombreColeccion: string;
  constructor(private fb: FirebaseCloudService) { 
    this.nombreColeccion = "listado-resultados-juegos";
  }

  AgregarResultado(nombreJuego, correoJugador: string, resultado: string){
    let datosAgregar = {
      Jugador: correoJugador,
      Juego: nombreJuego,
      Resultado: resultado
    }
    this.fb.AgregarElemento(this.nombreColeccion, datosAgregar, correoJugador)
  }

  AgregarResultadoSinID(nombreJuego, correoJugador: string, resultado: string){
    let datosAgregar = {
      Jugador: correoJugador,
      Juego: nombreJuego,
      Resultado: resultado
    }
    this.fb.AgregarElementoSinId(this.nombreColeccion, datosAgregar);
  }

  ObtenerTodosLosResultados(){
    return this.fb.ObtenerTodosElementos(this.nombreColeccion);
  }

  ObtenerTodosResultadosDelJuego(juego: string){
    let listaRetornar = new Array<any>();
    this.fb.ObtenerTodosElementos(this.nombreColeccion).subscribe(rta=>{
      rta.forEach(elemento=>{
        if(elemento.data().Juego==juego){
          listaRetornar.push(elemento.data());
        }
      })
    })
    return listaRetornar;
  }

  ObtenerResultadosDelUsuario(correoUsuario: string){
    let listaRetornar = new Array<any>();
    this.fb.ObtenerTodosElementos(this.nombreColeccion).subscribe(rta=>{
      rta.forEach(elemento=>{
        if(elemento.data().Jugador==correoUsuario){
          listaRetornar.push(elemento.data());
        }
      })
    })
    console.log(listaRetornar);
    return listaRetornar;
  }
}
