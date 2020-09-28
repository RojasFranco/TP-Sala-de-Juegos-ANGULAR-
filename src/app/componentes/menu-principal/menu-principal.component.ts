import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  mailUsuarioLogueado: string;
  constructor(private auth: AutenticacionService) { 
    this.CargarUsuarioLogueado();    
  }

  ngOnInit(): void {
  }

  async CargarUsuarioLogueado(){
    let user = await this.auth.ObtenerLogueado();
    this.mailUsuarioLogueado=user.email;
  }

}
