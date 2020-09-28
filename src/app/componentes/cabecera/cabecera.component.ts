import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  @Input() hayUsuarioLogueado: boolean = false;
  @Output() eventoUsuario: EventEmitter<string> = new EventEmitter();
  constructor(private auth: AutenticacionService, private router: Router) { }

  ngOnInit() {
  }

  async Desloguear(){
    await this.auth.Desloguear();
    // this.hayUsuarioLogueado=false; LO HACE EL PPAL QUE ES EL PADRE
    this.router.navigate(["Principal"]);
    this.eventoUsuario.emit("desloguear");    
    // router

  }

  Ingresar(){
    this.eventoUsuario.emit("ingresar");
  }

  Registrar(){
    this.eventoUsuario.emit("registrar");
  }

}
