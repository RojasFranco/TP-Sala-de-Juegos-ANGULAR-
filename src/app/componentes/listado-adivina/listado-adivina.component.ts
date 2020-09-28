import { Component, OnInit } from '@angular/core';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';

@Component({
  selector: 'app-listado-adivina',
  templateUrl: './listado-adivina.component.html',
  styleUrls: ['./listado-adivina.component.css']
})
export class ListadoAdivinaComponent implements OnInit {

  listadoResultados: Array<any>;
  juegoBuscado: string;
  constructor(private fbListadoResultados: RegistroResultadosJuegosService) {
    this.listadoResultados = new Array<any>();
    this.CargarResultados();
   }

  ngOnInit(): void {
  }

  CargarResultados(){
    // this.fbListadoResultados.ObtenerTodosResultadosDelJuego("Adivina el nro").subscribe(rta=>{
    //   rta.forEach(datoActual=>{
    //     this.listadoResultados.push(datoActual.data());
    //   })
    // })
    this.listadoResultados = this.fbListadoResultados.ObtenerTodosResultadosDelJuego("Adivina el nro");
  }



}
