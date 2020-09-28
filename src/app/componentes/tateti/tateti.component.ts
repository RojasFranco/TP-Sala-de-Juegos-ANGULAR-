import { Component, OnInit } from '@angular/core';
import { JuegoTateti } from '../../clases/juego-tateti';
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})


export class TatetiComponent implements OnInit {

  nuevoJuego: JuegoTateti;
  estaEnJuego: boolean = false;
  posiciones: Array<any>;
  mostrarErrorAlElegirPosicion: boolean = false;
  juegoTermino: boolean = false;
  classAlert: string;
  mensajeResultado: string;

  constructor(private fbRegistroUsers: RegistroJugadoresService,
    private fbListadoJugadas: RegistroResultadosJuegosService,
    private auth: AutenticacionService) {
    this.nuevoJuego = new JuegoTateti("TaTeTi");
    this.posiciones = ['-', '-','-','-','-','-','-','-','-']; // 9 posiciones
   }

  ngOnInit(): void {
  }

  GenerarTablero(){    
    this.posiciones = ['-', '-','-','-','-','-','-','-','-']; // 9 posiciones
    this.estaEnJuego = true;
    this.juegoTermino=false;
  }

  seleccionar(posicionSeleccionada){
    if(this.juegoTermino){
      // alert("El juego termino, comience nuevamente");
      this.mensajeResultado = "El juego termino, comience nuevamente";
    }
    else{
      this.mostrarErrorAlElegirPosicion = false;
      if(this.posiciones[posicionSeleccionada]=="-"){
        this.posiciones[posicionSeleccionada] = "X";      
        if(this.AlgunoGano()){
          // this.MostrarGanador("jugador");
          this.juegoTermino=true;
          this.classAlert = "alert alert-success";
          this.mensajeResultado = "Ganaste!! Sumas 5 puntos a tu historial";
          this.ActualizarInformacionBD(true);
        }
        else{
          this.ElegirOpcionMaquina();
          if(this.Empataron()){
            // this.MostrarGanador("ninguno, fue empate");
            this.juegoTermino = true;
            this.classAlert = "alert alert-secondary";
            this.mensajeResultado = "Empataron";
          }
        }      
      }
      else{
        this.mostrarErrorAlElegirPosicion = true;
      }
    }
  }

  ElegirOpcionMaquina(){
    let aunNoEligio=true;

    let cantidadEspaciosDisponibles=0;
    this.posiciones.forEach(element => {
      if(element=="-"){
        cantidadEspaciosDisponibles+=1;
      }
    });
    if(cantidadEspaciosDisponibles>=1){
      while(aunNoEligio){
        let posicion = Math.floor(Math.random()*9);
        if(this.posiciones[posicion]=="-"){
          this.posiciones[posicion] = "O";
          if(this.AlgunoGano()){
            // this.MostrarGanador("maquina");
            this.juegoTermino=true;
            this.classAlert = "alert alert-danger";
            this.mensajeResultado = "Perdiste";
            this.ActualizarInformacionBD(false);
          }
          aunNoEligio=false;
        }
      }
    }
    else{
      // EMPATE
    }
  }

  AlgunoGano():boolean{
    if(this.posiciones[0]!='-' && this.posiciones[0] == this.posiciones[4] && this.posiciones[4] ==this.posiciones[8] ||
      this.posiciones[2]!='-' && this.posiciones[2] == this.posiciones[4] && this.posiciones[4] == this.posiciones[6]){
        return true; 
    }
    else{
      for (let index = 0; index < 3; index++) {
        if(this.posiciones[index]!='-' && this.posiciones[index] == this.posiciones[index+3] && this.posiciones[index+3] == this.posiciones[index+6]){
          return true;
        }
      }
      for (let index = 0; index < 7; index+=3) {        
        if(this.posiciones[index]!='-' && this.posiciones[index]  == this.posiciones[index+1] && this.posiciones[index+1]==this.posiciones[index+2]){
          return true;
        }        
      }
    }
    return false;    
  }

  MostrarGanador(jugadorGanador: string){
    alert("Gano: "+jugadorGanador);
  }

  Empataron(){
    let empataron = true;
    this.posiciones.forEach(element => {
      if(element=='-'){
        empataron = false; 
      }
    });
    return empataron;
  }

  async ActualizarInformacionBD(gano: boolean){
    let usuario = await this.auth.ObtenerLogueado();        
    if(gano){
      this.fbRegistroUsers.ActualizarPuntaje(usuario.email, 5);
      this.fbListadoJugadas.AgregarResultadoSinID("Tateti", usuario.email, "Gano");
    }
    else{
      this.fbListadoJugadas.AgregarResultadoSinID("Tateti", usuario.email, "Perdio");
    }
  }
}
