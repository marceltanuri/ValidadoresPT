import Validador from "./Validador"

class Telemovel extends Validador {
    static validate(numeroTelemovel) {
        var telemovelValidationRegex = /^[0-9]{9}$/
        return telemovelValidationRegex.test(numeroTelemovel)
    }
}

export default Telemovel