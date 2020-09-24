import { Juego } from './juego';

export class JuegoAhorcado extends Juego{
    palabras: Array<string>;
    palabraSecreta: string;

    constructor(nombre?:string, gano?:boolean, jugador?:string){
        super(nombre,gano,jugador);
        this.palabras = [
                            'Ahorcado',
                            'Licenciado',
                            'Manzana',
                            'especialista',
                            'transportador',
                            'licuadora'
                        ]
    }

    DevolverPalabraSecreta(){
        this.palabraSecreta = this.palabras[Math.floor(Math.random()*(this.palabras.length))];
        return this.palabraSecreta;
    }
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }
}
