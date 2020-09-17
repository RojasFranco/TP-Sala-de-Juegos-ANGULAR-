import { Juego } from './juego';

export class JuegoAnagrama extends Juego{
    public palabraSecreta: string;
    public palabraIngresada: string;
    public cantidadIntentos: number;
    private palabrasDisponibles: Array<string>;

    constructor(nombre?: string, gano?: boolean,jugador?:string){
        super(nombre , gano, jugador);
        this.palabrasDisponibles = ["elefante",
                                        "perro",
                                        "gato",
                                        "licenciado",
                                        "naturaleza",
                                        "computadora"];
    }

    public verificar(): boolean {
        return this.palabraIngresada.toLowerCase()==this.palabraSecreta;
    } 
    
    public GenerarPalabra(){        
        this.palabraSecreta = this.palabrasDisponibles[Math.floor(Math.random()*(this.palabrasDisponibles.length))];
        return this.palabraSecreta;        
    }
    
}
