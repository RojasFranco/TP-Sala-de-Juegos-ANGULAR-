import { Component, OnInit } from '@angular/core';
import { JuegoAhorcado } from '../../clases/juego-ahorcado';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  nuevoJuego: JuegoAhorcado;
  palabraSecretaSeparada: Array<string>;
  estaEnJuego: boolean = false;
  abecedario: string;
  letrasDisponibles: Array<string>;
  letraElegida: string;
  palabraEnFormacion: Array<string>;
  intentos: number = 3;
  mostrarPerdio: boolean = false;
  mostrarError: boolean = false;
  perdio : boolean = false;
  constructor() {
    this.nuevoJuego = new JuegoAhorcado("Ahorcado");
    this.abecedario = "abcdefghijklmnopqrstuvwxyz";
    this.letrasDisponibles = this.abecedario.toLocaleUpperCase().split('');
    // this.palabraEnFormacion = new Array<string>();
   }

  ngOnInit(): void {
  }

  GenerarPalabra(){
    this.perdio=false;
    this.intentos=3;
    this.estaEnJuego = true;
    this.nuevoJuego.gano = false;
    let palabra=null;
    this.mostrarError = false;
    
    this.palabraEnFormacion = new Array<string>();;
    palabra = this.nuevoJuego.DevolverPalabraSecreta();
    this.palabraSecretaSeparada = palabra.split('');
    console.log(palabra);    
    console.log(this.palabraSecretaSeparada);
    for (let index = 0; index < this.palabraSecretaSeparada.length; index++) {
      this.palabraEnFormacion[index] = "_";      
    }
    console.log(this.palabraEnFormacion);
  }

  ElegirLetra(letraActual){
    let letraCoincide = false;
    this.letraElegida = letraActual;
    for (let index = 0; index < this.palabraSecretaSeparada.length; index++) {
      const element = this.palabraSecretaSeparada[index];
      if(element.toLowerCase()==letraActual.toLowerCase()){
        this.palabraEnFormacion[index] = letraActual;
        letraCoincide = true;
      }      
    }    
    if(letraCoincide){
      this.mostrarError = false;
      if(this.VerificarSiGano()){
        this.nuevoJuego.gano = true;
      }
    }
    else{
      this.intentos-=1;
      this.mostrarError = true;
      if(this.intentos==0){
        this.perdio = true;
      }
    }

    

  }

  VerificarSiGano(){
    let retorno = true;
    for (let index = 0; index < this.palabraEnFormacion.length; index++) {
      const element = this.palabraEnFormacion[index];
      if(element.toLowerCase() != this.palabraSecretaSeparada[index].toLowerCase()){
        retorno = false;
        break;
      }
    }
    return retorno;
  }


}
