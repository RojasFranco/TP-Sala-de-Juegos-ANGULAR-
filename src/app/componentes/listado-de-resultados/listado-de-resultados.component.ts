
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

  @Input() listadoResultados: Array<any>;
  constructor(private fbListadoResultados: RegistroResultadosJuegosService,
              private fbJugadores: RegistroJugadoresService) {
                
   }

  ngOnInit() {
  }

}
