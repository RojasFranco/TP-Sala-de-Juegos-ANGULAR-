import { Component, OnInit } from '@angular/core';
import { JuegoTateti } from '../../clases/juego-tateti';

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

  constructor() {
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
      alert("El juego termino, comience nuevamente");
    }
    else{
      this.mostrarErrorAlElegirPosicion = false;
      if(this.posiciones[posicionSeleccionada]=="-"){
        this.posiciones[posicionSeleccionada] = "X";      
        if(this.AlgunoGano()){
          this.MostrarGanador("jugador");
          this.juegoTermino=true;
        }
        else{
          this.ElegirOpcionMaquina();
          if(this.Empataron()){
            this.MostrarGanador("ninguno, fue empate");
            this.juegoTermino = true;
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
            this.MostrarGanador("maquina");
            this.juegoTermino=true;
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
}
