import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service'; //'src/app/servicios/autenticacion.service';
import { Usuario } from '../../clases/usuario';
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  usuario: Usuario;
  repetidorClave: string;
  mensajeError: string;
  mostrarError: boolean = false;
  claseAlert: string;
  @Output() eventoQuiereVolver: EventEmitter<any> = new EventEmitter();
  constructor( private router: Router, 
               private auth: AutenticacionService,
               private registroFB: RegistroJugadoresService) { 
    this.usuario = new Usuario();
  }



  ngOnInit() {
  }

  async Registrar(){
    if(!this.usuario.correo || !this.usuario.clave || !this.repetidorClave){
      this.mostrarError = true;
      this.claseAlert= "alert alert-danger";
      this.mensajeError = "Complete los campos";
    }
    else{
      if(this.usuario.clave == this.repetidorClave){
        try{
          await this.auth.RegistrarUsuario(this.usuario)
          this.claseAlert= "alert alert-success";
          this.mensajeError = "Se ha registraso exitosamente";
          this.mostrarError = true;
          this.registroFB.GuardarJugador(this.usuario.correo, 0);
          // console.log("Registrado exitosamente");
          // this.router.navigate(["Login"]);
          setTimeout(() => {
            this.eventoQuiereVolver.emit();
          }, 3000);          

        }
        catch(error){
          this.mostrarError = true;
          this.claseAlert= "alert alert-danger";
          switch (error.code) {
            case 'auth/invalid-email':
              this.mensajeError = "Ingrese un correo electronico valido";
              break;
            case 'auth/weak-password':
              this.mensajeError = "La contraseña debe tener al menos 6 caracteres";
              break;
            case 'auth/email-already-in-use':
              this.mensajeError = "Este mail ya esta registrado, use otro";
              break;
            default:
              this.mensajeError = "Error inesperado: "+error.message;
              break;
          }
        }
      }
    }
  }

  Volver(){
    this.eventoQuiereVolver.emit();
  }

}
