import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AutenticacionService) { }

  ngOnInit() {
  }

  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
          this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'AgilidadaMasListado':
          this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
      case 'Anagrama':
          this.router.navigate(['/Juegos/Anagrama']);
          break;
      case 'Tateti':
           this.router.navigate(['/Juegos/Tateti']);
           break;
      case 'Memotest':
           this.router.navigate(['/Juegos/Memotest']);
           break;
      case 'Ahorcado':
         this.router.navigate(['/Juegos/Ahorcado']);
         break;                  
      case 'ppt':
          this.router.navigate(['/Juegos/PiedraPapelTijera']);
          break;          
    }
  }

  async CerrarSesion(){
    await this.auth.Desloguear();
  }

}
