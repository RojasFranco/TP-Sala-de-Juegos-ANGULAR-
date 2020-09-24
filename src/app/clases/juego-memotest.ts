import { Juego } from './juego'

export class JuegoMemotest extends Juego{
    
    perro: string = "../../assets/imagenes/ParaMemotest/perro.jpg";
    tucan: string = "../../assets/imagenes/ParaMemotest/tucan.png";
    cebra: string = "../../assets/imagenes/ParaMemotest/cebra.jpg";
    // delfin: string = "../../assets/imagenes/ParaMemotest/delfin.png";
    // elefante: string = "../../assets/imagenes/ParaMemotest/elefante.jpg";
    jirafa: string = "../../assets/imagenes/ParaMemotest/jiraga.png";
    pinguino: string = "../../assets/imagenes/ParaMemotest/pinguino.jpg";
    tigre: string = "../../assets/imagenes/ParaMemotest/tigre.png";
    
    public verificar(): boolean {
        throw new Error('Method not implemented.');
    }

    public DevolverAnimales(){
        
        
        let listaAnimales = [{nombre:"perro", src: this.perro ,seleccionado: false},
                            {nombre:"tucan", src: this.tucan, seleccionado: false},
                            {nombre: "cebra", src: this.cebra, seleccionado: false},
                            // this.delfin,
                            // this.elefante,
                            {nombre: "jirafa", src: this.jirafa, seleccionado: false},
                            {nombre:"pinguino" ,src: this.pinguino, seleccionado: false},
                            {nombre: "tigre", src: this.tigre, seleccionado: false},
                            {nombre:"perro", src: this.perro ,seleccionado: false},
                            {nombre:"tucan", src: this.tucan, seleccionado: false},
                            {nombre: "cebra", src: this.cebra, seleccionado: false},
                            // this.delfin,
                            // this.elefante,
                            {nombre: "jirafa", src: this.jirafa, seleccionado: false},
                            {nombre:"pinguino" ,src: this.pinguino, seleccionado: false},
                            {nombre: "tigre", src: this.tigre, seleccionado: false}];

        return listaAnimales;
    }

}