import Validador from "./Validador"

class Email extends Validador {
    static validate(emailAdress) {
        console.debug(`validating ${emailAdress}...`)
        var emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailValidationRegex.test(emailAdress)
    }
}


export default Email