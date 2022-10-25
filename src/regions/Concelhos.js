import concelhos from './data/pt/concelhos.json'
import { SelectLoader } from './SelectLoader'

export class Concelhos extends SelectLoader {

    constructor(config) {
        super(concelhos, "concelhoId", "nome")
        this._config = config
    }

    distritoId = null

    getFilter() {
        let instance = this
        return this.filterFn = (x) =>  x.distritoId == instance.distritoId 
    }

    from(distritoId) {
        this.distritoId = distritoId
        this.filterFn = true
        return this
    }

}

