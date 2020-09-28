import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../clases/jugador';
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
import { JugadoresService } from '../../servicios/jugadores.service';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  jugador: Jugador;
  listadoJugadores:Array<Jugador>;
  // miJugadoresServicio:JugadoresService
  TodosLosJugadores: any;
  
    constructor(private fbService: RegistroJugadoresService) {
      // this.miJugadoresServicio = serviceJugadores;
      this.listadoJugadores = new Array<Jugador>();
      this.TraerTodos();
      
    }
    


  ngOnInit() {
  }


  TraerTodos(){
    this.fbService.ObtenerJugadores().subscribe(jugadores=>{
      jugadores.forEach(jugador=>{
        let nuevo = new Jugador();
        nuevo.correo = jugador.id;
        nuevo.puntaje = jugador.data().Puntaje;
        this.listadoJugadores.push(nuevo);
      })
    })
    // console.log(this.listadoJugadores);
  }
  // TraerGanadores(){
  //   this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }
  // TraerPerdedores(){
  //   this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
  //     //console.info("jugadores listado",(data));
  //     this.listado= data;

  //   })
  // }

}
