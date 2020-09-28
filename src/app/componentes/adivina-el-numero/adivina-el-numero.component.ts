
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { RegistroJugadoresService } from '../../servicios/registro-jugadores.service';
import { RegistroResultadosJuegosService } from '../../servicios/registro-resultados-juegos.service';
import { JuegoAdivina } from '../../clases/juego-adivina'

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
 @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;
  perdio: boolean = false;
 
  constructor(private auth: AutenticacionService,
              private fbListadoResultados: RegistroResultadosJuegosService,
              private fbRegistroUsuario: RegistroJugadoresService) { 
    this.nuevoJuego = new JuegoAdivina();
    console.info("numero Secreto:",this.nuevoJuego.numeroSecreto);  
    this.ocultarVerificar=false;    
  }
  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador=0;
    this.perdio=false;
  }
  async verificar()
  {
    this.contador++;
    this.ocultarVerificar=true;
    console.info("numero Secreto:",this.nuevoJuego.gano);  
    let usuario = await this.auth.ObtenerLogueado();
    if (this.nuevoJuego.verificar()){
      
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje("Sos un Genio, Ganaste 5 puntos!!!",true);
      this.nuevoJuego.numeroSecreto=0;
      
      this.fbListadoResultados.AgregarResultadoSinID("Adivina el nro", usuario.email, "Gano");
      this.fbRegistroUsuario.ActualizarPuntaje(usuario.email, 5);

    }else{

      let mensaje:string;
      switch (this.contador) {
        case 1:
          mensaje="No, intento fallido, animo";
          break;
          case 2:
          mensaje="No,Te estaras Acercando???";
          break;
          case 3:
          mensaje="No es, Yo crei que la tercera era la vencida.";
          break;
          case 4:
          mensaje="No era el  "+this.nuevoJuego.numeroIngresado;
          break;
          case 5:
          mensaje=" intentos y nada.";
          break;
          case 6:
          mensaje="Afortunado en el amor";
          break;
          case 7:
            mensaje= "Te queda un intento";
            break;
          case 8:
            this.nuevoJuego.numeroSecreto=0;
            this.perdio = true;
            this.fbListadoResultados.AgregarResultadoSinID("Adivina el nro", usuario.email, "Perdio");
            break;
        default:
            mensaje="Ya le erraste "+ this.contador+" veces";
          break;
      }
      if(!this.perdio){
        this.MostarMensaje("#"+this.contador+" "+mensaje+" ayuda :"+this.nuevoJuego.retornarAyuda());
      }           

    }
    console.info("numero Secreto:",this.nuevoJuego.gano);  
  }  

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar=false;
     }, 2000);
    console.info("objeto",x);
  
   }  
  ngOnInit() {
  }

}
