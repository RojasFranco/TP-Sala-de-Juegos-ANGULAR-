import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

  nuevoJuego: JuegoPiedraPapelTijera;
  opcionesDisponibles: Array<string>;
  opcionAleatoria: string;
  estaEnJuego: boolean=false;
  srcInicial: string = "../../../assets/imagenes/signoPregunta.jpg";
  srcPiedra: string="../../../assets/imagenes/piedra.png";
  srcPapel: string = "../../../assets/imagenes/papel.png";
  srcTijera: string = "../../../assets/imagenes/tijera.png";
  srcMaquina: string;
  srcJugador: string;
  ocultarMostrarError: boolean = true;
  resultadoJuego: string;
  constructor() { 
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    this.srcMaquina = this.srcInicial;
    this.srcJugador=this.srcInicial;
    this.opcionesDisponibles = new Array();
    this.opcionesDisponibles.push("piedra", "papel", "tijera");    
  }

  ngOnInit(): void {
  }

  Jugar(){
    this.estaEnJuego=true;
    this.srcJugador = this.srcInicial;
    this.srcMaquina = this.srcInicial;
    this.resultadoJuego=null;
    this.opcionAleatoria=null;
    this.nuevoJuego.opcionElegida=null;
  }

  Verificar(){
    this.opcionAleatoria = this.opcionesDisponibles[Math.floor(Math.random()*3)]
    if(this.nuevoJuego.opcionElegida){ 
      this.ocultarMostrarError = true;     
      this.estaEnJuego=false;    
      this.srcJugador = this.DevolverSrcSegunOpcion(this.nuevoJuego.opcionElegida);
      this.srcMaquina = this.DevolverSrcSegunOpcion(this.opcionAleatoria);
      this.resultadoJuego = this.ValidarResultado(this.nuevoJuego.opcionElegida, this.opcionAleatoria);
    }    
    else{
      this.ocultarMostrarError = false;
    }
  }

  DevolverSrcSegunOpcion(datoValidar){
    let retorno: string;
    switch (datoValidar) {
      case "piedra":
        retorno =  this.srcPiedra;
        break;
      case "papel":
        retorno = this.srcPapel
        break;
      default:
        retorno = this.srcTijera
        break;
    }
    return retorno;
  }

  ValidarResultado(opcionJugador: string, opcionMaquina: string){
    let resultado: string;
    switch (opcionJugador) {
      case "piedra":
        if(opcionMaquina=="tijera"){
          resultado= "Ganaste"
        }
        else if(opcionMaquina=="papel"){
          resultado = "Perdiste"
        }
        else{
          resultado = "Empate"
        }
        break;
      case "papel":
        if(opcionMaquina=="tijera"){
          resultado= "Perdiste"
        }
        else if(opcionMaquina=="papel"){
          resultado = "Empate"
        }
        else{
          resultado = "Ganaste"
        }
        break;
      default:
        if(opcionMaquina=="tijera"){
          resultado= "Empate"
        }
        else if(opcionMaquina=="papel"){
          resultado = "Ganaste"
        }
        else{
          resultado = "Perdiste"
        }
        break;
    }
    return resultado;
  }

  elegirPiedra(){
    this.nuevoJuego.opcionElegida = "piedra";
  }

  elegirPapel(){
    this.nuevoJuego.opcionElegida = "papel";
  }

  elegirTijera(){
    this.nuevoJuego.opcionElegida = "tijera";
  }
}
