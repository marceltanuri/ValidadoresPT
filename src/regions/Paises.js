import paises from './data/paises.json'
import { SelectLoader } from './SelectLoader'

export class Paises extends SelectLoader {

    constructor(selector) {
        super(paises, "CODIGO_PAIS", "DESIGNACAO_PAIS")
        super.optionalColumns = ["DESIGNACAO_PAIS_EN"]
        this.selector = selector
    }

}

