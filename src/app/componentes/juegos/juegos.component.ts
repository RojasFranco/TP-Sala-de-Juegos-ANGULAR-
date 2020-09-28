import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  correoUsuarioActual: string;
  constructor(private auth: AutenticacionService) { 

  }

  ngOnInit() {
  }

  async CargarUsuarioLogueado(){
    let usuario=await this.auth.ObtenerLogueado();
    this.correoUsuarioActual = usuario.email;
  }

}
