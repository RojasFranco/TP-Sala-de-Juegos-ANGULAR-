import { Component, OnInit } from '@angular/core';
import { join } from 'path';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

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
  constructor(private fbRegistroUsers: RegistroJugadoresService,
    private fbListadoJugadas: RegistroResultadosJuegosService,
    private auth: AutenticacionService) { 
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
      this.ActualizarInformacionBD(true);
    }
    else{
      if(this.intentos==1){
        this.respuesta = "Perdiste";
        this.mostrarError=false;
        this.ResetearJuego();
        this.ActualizarInformacionBD(false);

      }
      else{
        this.intentos--;
        this.mostrarError=true;
      }
    }    
  }

  async ActualizarInformacionBD(gano: boolean){
    let usuario = await this.auth.ObtenerLogueado();        
    if(gano){
      this.fbRegistroUsers.ActualizarPuntaje(usuario.email, 5);
      this.fbListadoJugadas.AgregarResultadoSinID("Anagrama", usuario.email, "Gano");
    }
    else{
      this.fbListadoJugadas.AgregarResultadoSinID("Anagrama", usuario.email, "Perdio");
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
