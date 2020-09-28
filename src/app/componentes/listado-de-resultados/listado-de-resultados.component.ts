
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
//  @Input()
//  

  // @Input() juegoBuscado: string;
  @Input() listadoResultados: Array<any>;
  constructor(private fbListadoResultados: RegistroResultadosJuegosService,
              private fbJugadores: RegistroJugadoresService) {
                
    // this.listadoResultados = new Array<any>();
    // this.CargarResultados();
   }

  ngOnInit() {
  }

  // CargarResultados(){
  //   if(!this.juegoBuscado){
  //     this.fbListadoResultados.ObtenerTodosLosResultados().subscribe(rta=>{
  //       rta.forEach(rdo=>{
  //         this.listadoResultados.push(rdo.data());
  //       })
  //     })
  //   }
  //   else{
  //     console.log("LLEGO A BUSCADO");
  //     console.log(this.juegoBuscado);
  //     this.listadoResultados = this.fbListadoResultados.ObtenerTodosResultadosDelJuego(this.juegoBuscado);
  //   }
  // }

}
