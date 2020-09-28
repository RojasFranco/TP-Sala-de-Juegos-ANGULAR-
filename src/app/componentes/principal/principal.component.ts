import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { AutenticacionService } from '../../servicios/autenticacion.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  usuarioLogeado: boolean = false;
  quiereloguearse: boolean = false;
  quiereRegistrarse:boolean = false;
  constructor(private auth: AutenticacionService) {  }

  ngOnInit() {
  }

  async VerificarUsuario(){
    try{
      let user = await this.auth.ObtenerLogueado();
      if(user==null){
        console.log("no hay logueados");
      }
      else{
        console.log(user.email);
      }      
    }
    catch(error){
      console.log(error);
    }
  }

  AccionUsuario(accion: string){
    if(accion=="ingresar"){
      this.quiereloguearse = true;
      this.quiereRegistrarse = false;
    }
    else if(accion == "registrar"){
      this.quiereRegistrarse = true;
      this.quiereloguearse = false;
    }
    else{ //RECIBE DESLOGUEO, innceesario TO DO
      this.usuarioLogeado = false;
    }
  }

  LogeoUsuario(usuario: Usuario){
    this.usuarioLogeado = true;
    this.quiereloguearse = false;
    // router
  }

  VolverAMenu(nada){
    this.quiereRegistrarse = false;
    this.quiereloguearse = false;
  }
}
