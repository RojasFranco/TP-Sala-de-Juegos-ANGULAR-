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

  constructor() {
    this.nuevoJuego = new JuegoTateti("TaTeTi");
    this.posiciones = ['-', '-','-','-','-','-','-','-','-']; //9
   }

  ngOnInit(): void {
  }

  GenerarTablero(){
    this.estaEnJuego = true;


  }

  seleccionar(posicionSeleccionada){
    this.mostrarErrorAlElegirPosicion = false;
    if(this.posiciones[posicionSeleccionada]=="-"){
      this.posiciones[posicionSeleccionada] = "X";      
      //VERIFICAR SI ALGUIEN GANO
      this.ElegirOpcionMaquina();
    }
    else{
      this.mostrarErrorAlElegirPosicion = true;
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
          // VERIFICAR SI GANO
          aunNoEligio=false;
        }
      }
    }
    else{
      // EMPATE
    }
  }

  AlgunoGano(){
    if(this.posiciones[0] == this.posiciones[1] == this.posiciones[2]){
      //gano
    }
  }

}
