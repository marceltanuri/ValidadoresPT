import Validador from "./Validador"

class CodigoPostal extends Validador {
    static validate(CodigoPostal) {
        var codigoPostalValidationRegex = /^[0-9]{4}-[0-9]{3}$/
        return codigoPostalValidationRegex.test(CodigoPostal)
    }
}

export default CodigoPostal