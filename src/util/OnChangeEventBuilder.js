class OnChangeEventBuilder {

    constructor() {
    }

    #operations = []
    #elem = ""
    #selector = ""

    id(elemId) {
        this.#elem = document.getElementById(elemId)
        if (this.#elem==null){
            console.error("No element found with the id: " + elemId)
        }
        this.#selector = "#"+elemId
        return this
    }


    elem(selector) {
        this.#elem = document.querySelector(selector)
        if (this.#elem==null){
            console.error("No element found with the selector: " + selector)
        }
        this.#selector = selector
        return this
    }

    when(conditions) {
        this.#processWhenConditions(conditions)
        return new When(this)
    }

    else() {
        this.#processWhenConditions(() => { return true })
        return new When(this)
    }



    always(callbackFn) {
        this.#activateAlwaysCondition()
        if (callbackFn != null)
            this.#processThenCallback(callbackFn)
        return this
    }

    then(callbackFn) {
        this.#processThenCallback(callbackFn)
        return this
    }

    #showHide(selector, showHide) {
        let instance = this
        for (const elem of document.querySelectorAll(selector)) {
            instance.#processThenCallback(() => { elem.style.display = showHide })
        }
        return this
    }

    hide(selector) {
        this.#showHide(selector, "none")
        return this
    }

    clear(selector) {
        let instance = this
        for (const elem of document.querySelectorAll(selector)) {
            instance.#processThenCallback(() => { elem.value = "" })
        }
        return this
    }

    show(selector) {
        this.#showHide(selector, "block")
        return this
    }

    #activateAlwaysCondition() {
        this.#operations.push({ "when": () => { return true }, "then": [] })
    }

    #processWhenConditions(conditionalFn) {
        this.#operations.push({ "when": conditionalFn, "then": [] })
    }

    #processThenCallback(callbackFn) {
        this.#operations[this.#operations.length - 1].then.push(callbackFn)
    }


    build() {
        let instance = this // a variável this perde a referência dentro do escopo de uma nova function, é recomendável uma referÊncia de outro nome.
        this.#elem.addEventListener("change", function (e) {
            
            
            const elem = document.querySelector(instance.#selector)

            for (let operation of instance.#operations) {
                if (operation.when(elem)) {
                    for (let then of operation.then) {
                        then(elem)
                    }
                    break
                }
            }
        })
    }
}

class When {

    #instance

    constructor(instance) {
        this.#instance = instance
    }

    then(then) {
        if (this.#instance instanceof OnChangeEventBuilder) {
            this.#instance.then(then)
            return this.#instance
        }
        return new OnChangeEventBuilder()
    }
    show(selector) {
        if (this.#instance instanceof OnChangeEventBuilder) {
            this.#instance.show(selector)
            return this.#instance
        }
        return new OnChangeEventBuilder()
    }
    hide(selector) {
        if (this.#instance instanceof OnChangeEventBuilder) {
            this.#instance.hide(selector)
            return this.#instance
        }
        return new OnChangeEventBuilder()
    }
}

export default OnChangeEventBuilder