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
  constructor() { 
    this.nuevoJuego = new JuegoAnagrama("Anagrama");
  }

  ngOnInit() {
  }

  GenerarPalabras(){
    let palabraSecreta = this.nuevoJuego.GenerarPalabra();
    this.ocultarPalabras = false;
    this.ocultarBtnJugar = true;
    let palabraSeparada = palabraSecreta.split('');
    palabraSeparada = palabraSeparada.sort(() => Math.random()-0.5);
    this.palabraDesordenada = palabraSeparada.join(' ');
    console.log(this.palabraDesordenada);    
  }

}
