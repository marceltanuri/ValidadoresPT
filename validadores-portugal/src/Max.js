import Validador from "./Validador"

class Max extends Validador {
    static validate(value, maxVal) {
        let isBlank = !(value != null && String(value).trim().length > 0)

        if (isBlank) {
            return true
        }
        return String(value).length <= maxVal
    }
}

export default Max