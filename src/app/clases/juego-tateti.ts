import { Juego } from './juego';

export class JuegoTateti extends Juego{
    
    constructor(nombre?:string, gano?:boolean, jugador?:string){
        super(nombre, gano, jugador);
    }
    
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }

}