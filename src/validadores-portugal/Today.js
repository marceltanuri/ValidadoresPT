import Validador from "./Validador"

class Today extends Validador {
    static gtEq(dateStr) {
        let isBlank = !(dateStr != null && String(dateStr).trim().length > 0)

        if (isBlank) {
            return false
        }

        try { 
            let _today = new Date()
            _today.setMilliseconds(0)
            _today.setSeconds(0)
            _today.setMinutes(0)
            _today.setHours(0)

            return new Date(dateStr).getTime() >= _today.getTime()
        }
        catch (e) {
            return false
        }
    }


    static lwEq(dateStr) {
        console.debug(`validating ${dateStr}...`)
        let isBlank = !(dateStr != null && String(dateStr).trim().length > 0)

        if (isBlank) {
            return false
        }

        try { 
            let _today = new Date()
            _today.setMilliseconds(0)
            _today.setSeconds(0)
            _today.setMinutes(0)
            _today.setHours(0)

            return new Date(dateStr).getTime() <= _today.getTime()
        }
        catch (e) {
            return false
        }
    }
}



export default Today