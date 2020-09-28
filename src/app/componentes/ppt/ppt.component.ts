import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

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
  constructor(private fbRegistroUsers: RegistroJugadoresService,
    private fbListadoJugadas: RegistroResultadosJuegosService,
    private auth: AutenticacionService) { 
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
      if(this.resultadoJuego.toLowerCase()=="ganaste"){
        this.ActualizarInformacionBD(true);
      }
      else if(this.resultadoJuego.toLowerCase()=="perdiste"){
        this.ActualizarInformacionBD(false);
      }
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

  async ActualizarInformacionBD(gano: boolean){
    let usuario = await this.auth.ObtenerLogueado();        
    if(gano){
      this.fbRegistroUsers.ActualizarPuntaje(usuario.email, 5);
      this.fbListadoJugadas.AgregarResultadoSinID("Piedra Papel Tijera", usuario.email, "Gano");
    }
    else{
      this.fbListadoJugadas.AgregarResultadoSinID("Piedra Papel Tijera", usuario.email, "Perdio");
    }
  }
}
