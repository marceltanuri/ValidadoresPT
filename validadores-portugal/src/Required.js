import Validador from "./Validador"

class Required extends Validador {
    static validate(value, opts) {
        let isBlank = !(value != null && String(value).trim().length > 0)
        console.debug(isBlank)
        if (isBlank) {
            return false
        }
        
        if(opts!=null){
            if (opts['min'] && !isNaN(opts['min'])) {
                return String(value).length >= opts['min']
            } 
    
            
            if (opts['max'] && !isNaN(opts['max'])) {
                return String(value).length <= opts['max']
            } 
        }
        return true

    }
}

export default Required