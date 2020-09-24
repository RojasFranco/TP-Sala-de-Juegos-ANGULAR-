import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Usuario } from '../../clases/usuario';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  // usuario = '';
  // clave= '';
  usuario: Usuario;
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AutenticacionService) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";
    this.usuario = new Usuario();

  }

  ngOnInit() {
  }

  async Entrar() {
    if(this.usuario.correo && this.usuario.clave){
      try{
        await this.auth.LoguearUsuario(this.usuario);
        this.router.navigate(['Principal']);
      }
      catch(error){
        switch (error.code) { // TO DO CAMBIAR ALERTS
          case 'auth/invalid-email':
            alert("Ingrese un correo valido");
            break;
          case 'auth/user-not-found':
            alert("Este correo no esta registrado, registrese");
            break;
          case 'auth/wrong-password':
            alert("La contraseña no es correcta");
            break;
          default:
            alert("Error inesperado: "+error.message);
            break;
        }
        this.logeando = true;
      }
    }
    else{
      this.logeando = true;
      console.log("Complete los campos");
    }
  }


  MoverBarraDeProgreso() {
    this.progreso=0;
    this.ProgresoDeAncho="0%";
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="Verificando..."; 
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      console.log("inicio");
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar bg-info progress-bar-striped active";
        this.progresoMensaje="Verificando su cuenta..."; 
          break;
        case 30:
          this.clase="progress-bar bg-danger progress-bar-striped active";
          // this.progresoMensaje="Adjustando encriptación.."; 
          break;
          case 60:
          this.clase="progress-bar bg-danger progress-bar-striped active";
          this.progresoMensaje="Cargando datos..";
          break;
          case 75:
          this.clase="progress-bar bg-success progress-bar-striped active";
          this.progresoMensaje="Cargando juegos..";
          break;
          case 85:
          this.clase="progress-bar bg-success progress-bar-striped active";
          this.progresoMensaje="Instalando..";
          break;
          
        case 100:
          console.log("final");
          this.subscription.unsubscribe();
          this.Entrar();
          break;
      }     
    });
    // this.logeando=true;
  }

  Volver(){
    this.router.navigate(["Principal"]);
  }

}
