class WhenThenBuilder {

    constructor() {

    }

    processWhenConditions(conditions) {

    }

    activateAlwaysCondition() {

    }

    callbackError() {
        return this
    }

    callbackSuccess() {
        return this
    }

    build() {
        return this
    }


    when(conditions) {
        this.processWhenConditions(conditions)
        return new When(this)
    }

    else() {
        this.processWhenConditions(() => { return true })
        return new When(this)
    }



    always(callbackFn) {
        this.activateAlwaysCondition()
        this.processThenCallback(callbackFn)
        return this
    }


    processThenCallback(callbackFn) {

    }


    then(callbackFn) {
        this.processThenCallback(callbackFn)
        return this
    }

}

export default WhenThenBuilder