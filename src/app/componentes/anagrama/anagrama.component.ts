import { Component, OnInit } from '@angular/core';
import { join } from 'path';
import { JuegoAnagrama } from '../../clases/juego-anagrama';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  nuevoJuego: JuegoAnagrama;
  palabraDesordenada: string;
  ocultarPalabras: boolean = true;
  ocultarBtnJugar: boolean = false;
  ocultarResultado: boolean = true;
  respuesta: string;
  intentos: number;
  mostrarRta: boolean=false;
  mostrarError: boolean;
  constructor() { 
    this.nuevoJuego = new JuegoAnagrama("Anagrama");
    this.intentos=3;
  }

  ngOnInit() {
  }

  GenerarPalabras(){
    let palabraSecreta = this.nuevoJuego.GenerarPalabra();
    this.ocultarPalabras = false;
    this.ocultarBtnJugar = true;
    this.ocultarResultado = true;
    let palabraSeparada = palabraSecreta.split('');
    palabraSeparada = palabraSeparada.sort(() => Math.random()-0.5);
    this.palabraDesordenada = palabraSeparada.join(' ');
  }

  Verificar(){
    if(this.nuevoJuego.verificar()){
      this.respuesta = "Ganaste";     
      this.ResetearJuego(); 
    }
    else{
      if(this.intentos==1){
        this.respuesta = "Perdiste";
        this.mostrarError=false;
        this.ResetearJuego();

      }
      else{
        this.intentos--;
        this.mostrarError=true;
      }
    }    
  }

  ResetearJuego(){
    this.ocultarBtnJugar = false;
    this.ocultarPalabras=true;
    this.intentos=3;
    this.ocultarResultado = false;
    this.nuevoJuego.palabraIngresada=null;
    this.mostrarRta=true;
  }

}
