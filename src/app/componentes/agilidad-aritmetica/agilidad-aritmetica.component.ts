import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad; //numeroIngresado   gano
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  primerNro: number;
  segundoNro: number;
  operadores: Array<string>;  
  operador: string;
  solucion: number;
  enJuego: boolean=false;
  perdio: boolean = false;
  private subscription: Subscription;
  ngOnInit() {
  }
   constructor(private fbRegistroUsers: RegistroJugadoresService,
     private fbListadoJugadas: RegistroResultadosJuegosService,
     private auth: AutenticacionService) {
     this.ocultarVerificar=true;
     this.Tiempo=8; 
    this.nuevoJuego = new JuegoAgilidad();
    this.operadores = new Array<string>();
    this.operadores.push("+","-","*","/");
    console.info("Inicio agilidad");      
    console.log(this.operadores);
  }
  NuevoJuego() {
    this.ocultarVerificar=false;
    this.generarCuenta();
    this.nuevoJuego.numeroIngresado=null;
    this.nuevoJuego.gano = false;
    this.enJuego=true;
    this.perdio = false;
   this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=8;
      }
      }, 900);

  }
  async verificar()
  {
    this.ocultarVerificar=true;
    this.enJuego=false;
    if(parseInt(this.nuevoJuego.numeroIngresado)==this.solucion){
      this.nuevoJuego.gano = true;
      let usuario = await this.auth.ObtenerLogueado();
      this.fbRegistroUsers.ActualizarPuntaje(usuario.email, 5);
      this.fbListadoJugadas.AgregarResultadoSinID("Agilidad Aritmetica", usuario.email, "Gano");
    }
    else{
      let usuario = await this.auth.ObtenerLogueado();
      this.fbListadoJugadas.AgregarResultadoSinID("Agilidad Aritmetica", usuario.email, "Perdio");
      this.perdio = true;
    }
    clearInterval(this.repetidor);
    this.Tiempo=8;

   
  }  

  generarCuenta(){
    this.primerNro = parseInt((Math.random()*10).toString());
    this.segundoNro = parseInt((Math.random()*10).toString());
    this.operador = this.operadores[Math.floor(Math.random()*4)];
    switch (this.operador) {
      case "+":
        this.solucion=this.primerNro+this.segundoNro;
        break;
      case "-":
        this.solucion = this.primerNro-this.segundoNro;  
        break;
      case "*":
        this.solucion = this.primerNro*this.segundoNro;  
        break;    
      default:
        this.solucion = this.primerNro/this.segundoNro;
        break;
    }
  }

}
