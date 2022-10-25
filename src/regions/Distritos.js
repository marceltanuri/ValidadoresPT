import distritos from './data/pt/distritos.json'
import { SelectLoader } from './SelectLoader'

export class Distritos extends SelectLoader {

    constructor(config) {
        super(distritos, "CODIGO", "DISTRITO")
        this._config = config
    }

}

