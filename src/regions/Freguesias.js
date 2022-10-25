import freguesias from './data/pt/freguesias.json'
import { SelectLoader } from './SelectLoader'

export class Freguesias extends SelectLoader {

    constructor(config) {
        super(freguesias, "freguesiaId", "nome")
        this._config = config
    }

    distritoId = null
    concelhoId = null

    getFilter() {
        let instance = this
        return this.filterFn = (x) => x.distritoId == instance.distritoId && x.concelhoId == instance.concelhoId
    }

    from(distritoId, concelhoId) {
        this.distritoId = distritoId
        this.concelhoId = concelhoId
        this.filterFn = true
        return this
    }

}

