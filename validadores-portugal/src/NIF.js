import Validador from "./Validador"

class NIF extends Validador{
    static validate(nif) {
        if (nif != null) {
            // O NIF - Número de Identificação de Fiscal português é constituído por 9 dígitos, sendo o primeiro dígito da esquerda o algarismo 1, 2 ou 8
            if (String(nif).match("^[1-3,8][0-9]{8}$")) {

                // multplicar cada dígito por 10-N e somar o resultado de cada soma. Onde N é a posição do dígito e D o valor do dígito.
                // Depois dividir o resultado da soma por 11 e encontrar o resto da divisão
                // Exemplo: {(D1 * (10-N1)) + (D2 * (10-N2)) ... (D9 * (10-N9)} / 11
                let soma = 0
                const divisor = 11
                 for (let [index] of [...Array(8).keys()].entries()) {
                     soma = soma + parseInt(String(nif).charAt(index)) * (10 - (index + 1))
                 }

                let resto = soma % divisor
                console.debug(`O resto é igual a: ${resto}`)

                // Se o resto for 0 ou 1 o último dígito DO nif deve ser igual a 0.
                // Se o retso for entre 0 a 10 então o último dígito do NIF deve ser R - 11, onde R é o resto da divisão na operação anterior
                let checkDigit = resto >= 0 && resto <= 1 ? 0 : resto >= 2 && resto <= 10 ? divisor - resto : -99999

                console.debug(`O checkDigit é igual a: ${checkDigit}`)

                return parseInt(String(nif).charAt(8)) == checkDigit;
            }
        }
        return false

    }
}

export default NIF