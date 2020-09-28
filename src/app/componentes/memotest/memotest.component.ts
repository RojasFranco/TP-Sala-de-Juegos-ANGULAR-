import { Component, OnInit } from '@angular/core';
import { JuegoMemotest } from '../../clases/juego-memotest';
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  nuevoJuego: JuegoMemotest;
  animalesDisponibles: Array<any>; //Tengo el src y nombre en cada animal
  tableroAnimales: Array<any>;
  estaEnJuego: boolean = false;
  primerElegido: any;   // GUARDO ANIMAL CON SUS CAMPOS 
  segundoElegido: any;  // TODO AGREGAR ENTIDAD ANIMAL;
  bufferElegido: any;
  cantidadSeleccionados: number;
  mostrarError: boolean = false;
  cantidadNecesariaParaGanar = 12;
  juegoTermino: boolean = false;
  cantidadIntentos:number;
  perdio: boolean = false;
  mostrarIntentos: boolean = false;

  // tablero: Array<any>;
  constructor(private fbRegistroUsers: RegistroJugadoresService,
    private fbListadoJugadas: RegistroResultadosJuegosService,
    private auth: AutenticacionService) { 
    this.nuevoJuego = new JuegoMemotest("Memotest");
    this.animalesDisponibles = this.nuevoJuego.DevolverAnimales();
    this.cantidadSeleccionados = 0;
    this.cantidadIntentos = 5;
  }

  ngOnInit(): void {
  }

  Jugar(){
    this.estaEnJuego=true;
    this.CrearJuegoPosiciones();
  }

  CrearJuegoPosiciones(){
    this.juegoTermino = false;
    this.nuevoJuego.gano = false;
    this.cantidadNecesariaParaGanar = 12;
    this.cantidadSeleccionados = 0;
    this.mostrarError = false;
    this.estaEnJuego = true;
    this.cantidadIntentos = 5;
    this.tableroAnimales = [...this.animalesDisponibles];
    this.tableroAnimales.forEach(element => {
      element.seleccionado = false;
    });
    // this.animalesDisponibles.forEach(element => {
    //   this.tableroAnimales.push(element);
    // });
    // for (let index = 0; index < this.animalesDisponibles.length; index++) {
    //   const element = this.animalesDisponibles[index];
    //   this.tableroAnimales.push(element);
    // }
    // DESORDENAR
    this.tableroAnimales = this.tableroAnimales.sort(() => Math.random()-0.5);
  }

  seleccionar(posicionElegida){    
    this.mostrarIntentos = false;
    if(this.tableroAnimales[posicionElegida].seleccionado){
      this.mostrarError = true;
    }    
    else{      
      this.mostrarError = false;
      this.tableroAnimales[posicionElegida].seleccionado = true;
      this.Controlador(posicionElegida);
    }    
  }

  Controlador(indice){
    if(this.cantidadSeleccionados==2){
      if(this.SonIguales()){
        this.cantidadNecesariaParaGanar-=2;
        console.log(this.cantidadNecesariaParaGanar);
        if(this.cantidadNecesariaParaGanar==2){
          // JUEGO TERMINADO
          this.nuevoJuego.gano=true;
          this.juegoTermino = true;
          this.ActualizarInformacionBD(true);
        }
      }
      else{
        this.OcultarSeleccionados();
        this.cantidadIntentos-=1;
        this.mostrarIntentos = true;
        if(this.cantidadIntentos==0){
          this.juegoTermino = true;
          this.perdio = true;
          this.estaEnJuego = false;
          this.ActualizarInformacionBD(false);
        }
      }
      this.cantidadSeleccionados = 0;
    }
    
    if(this.cantidadSeleccionados==0){
      this.primerElegido = this.tableroAnimales[indice];
    }
    else{ //(this.cantidadSeleccionados==1)
      this.segundoElegido = this.tableroAnimales[indice];
    }

    this.cantidadSeleccionados+=1;
  }

  SonIguales(){    
    return this.primerElegido.nombre==this.segundoElegido.nombre;
  }

  OcultarSeleccionados(){
    this.primerElegido.seleccionado = false;
    this.segundoElegido.seleccionado = false;
  }

  async ActualizarInformacionBD(gano: boolean){
    let usuario = await this.auth.ObtenerLogueado();        
    if(gano){
      this.fbRegistroUsers.ActualizarPuntaje(usuario.email, 5);
      this.fbListadoJugadas.AgregarResultadoSinID("Memotest", usuario.email, "Gano");
    }
    else{
      this.fbListadoJugadas.AgregarResultadoSinID("Memotest", usuario.email, "Perdio");
    }
  }
  
}
