import freguesias from './data/pt/freguesias.json'
import { SelectLoader } from './SelectLoader'

export class Freguesias extends SelectLoader {

    constructor() {
        super(freguesias, "freguesiaId", "nome")
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

