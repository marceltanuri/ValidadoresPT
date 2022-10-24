import prefixos from './data/prefixos.json'
import { SelectLoader } from './SelectLoader'

export class Prefixos extends SelectLoader {

    constructor() {
        super(prefixos, "COUNTRY CODE", "ISO CODES")
    }
}