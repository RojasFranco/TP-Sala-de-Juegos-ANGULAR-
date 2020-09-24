import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service'; //'src/app/servicios/autenticacion.service';
import { Usuario } from '../../clases/usuario';
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
  constructor( private router: Router, private auth: AutenticacionService) { 
    this.usuario = new Usuario();
  }



  ngOnInit() {
  }

  async Registrar(){
    if(!this.usuario.correo || !this.usuario.clave || !this.repetidorClave){
      console.log("Complete los campos");
    }
    else{
      if(this.usuario.clave == this.repetidorClave){
        try{
          await this.auth.RegistrarUsuario(this.usuario)
          console.log("Registrado exitosamente");
          this.router.navigate(["Login"]);
        }
        catch(error){
          switch (error.code) {
            case 'auth/invalid-email':
              alert("Ingrese un correo electronico valido");
              break;
            case 'auth/weak-password':
              alert("La contraseña debe tener al menos 6 caracteres");
              break;
            case 'auth/email-already-in-use':
              alert("Este mail ya esta registrado");
              break;
            default:
              alert("Error inesperado: "+error.message);
              break;
          }
        }
      }
    }
  }

}
