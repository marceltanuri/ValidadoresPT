import distritos from './data/pt/distritos.json'
import { SelectLoader } from './SelectLoader'

export class Distritos extends SelectLoader {

    constructor() {
        super(distritos, "CODIGO", "DISTRITO")
    }

}

