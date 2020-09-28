import { Component, OnInit } from '@angular/core';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  // public listadoParaCompartir: Array<any>;
  //  miServicioJuego:JuegoServiceService

  listadoPedido: Array<any>;
  jugarACargar: string = "todos";
  constructor(private fbListadoResultados: RegistroResultadosJuegosService, private auth: AutenticacionService) {
    this.listadoPedido = new Array<any>();
    this.CargarResultados();
  }
  
  ngOnInit() {
    
  }

  Cargar(juegoPedido){
    this.jugarACargar = juegoPedido;
    this.CargarResultados();
  }

  CargarResultados(){
    if(this.jugarACargar=="todos"){
      this.fbListadoResultados.ObtenerTodosLosResultados().subscribe(rta=>{
        rta.forEach(rdo=>{
          this.listadoPedido.push(rdo.data());
        })
      })
    }
    else{
      this.listadoPedido = this.fbListadoResultados.ObtenerTodosResultadosDelJuego(this.jugarACargar);
    }
  }

  async CargarResultadosPorUsuario(){
    let usuario = await this.auth.ObtenerLogueado();
    this.listadoPedido = this.fbListadoResultados.ObtenerResultadosDelUsuario(usuario.email);
  }
}
