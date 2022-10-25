import prefixos from './data/prefixos.json'
import { SelectLoader } from './SelectLoader'

export class Prefixos extends SelectLoader {

    selector = ""

    constructor(selector) {
        super(prefixos, "COUNTRY CODE", "ISO CODES")
        this.selector = selector
    }
}