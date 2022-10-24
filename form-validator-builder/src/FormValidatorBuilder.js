class FormValidatorBuilder {

    constructor() {
    }

    rules = [];
    #form = "";
    #callbackError = null;
    #callbackSuccess = null;

    #initalRule() {
        this.rules.push({ "name": "default", "when": () => { return true }, "operations": [{ "fields": [], "verify": { "fn": "", "msg": "" } }] });
    }

    #newRule(conditions) {
        this.rules.push({ "name": "custom", "when": conditions, "operations": [{ "fields": [], "verify": { "fn": "", "msg": "" } }] });
    }

    to(form) {
        if (!(form instanceof Element)) {
            this.#form = document.getElementById(form);
        } else {
            this.#form = form;
        }
        return this;
    }

    field(fields) {
        if (Array.isArray(this.rules) && !this.rules.length) {
            this.#initalRule();
        }
        this.#processFields(fields);
        return new Field(this);
    }

    when(conditions) {
        this.#newRule(conditions);
        return new Field(this);
    }

    period() {
        this.#initalRule();
        return this;
    }

    always() {
        this.#initalRule();
        return new Field(this);
    }


    verify(fn, msg) {
        this.#processThenCallback(fn, msg);
        return this;
    }

    callbackError(callbackFn) {
        this.#callbackError = callbackFn;
        return this;
    }

    callbackSuccess(callbackFn) {
        this.#callbackSuccess = callbackFn;
        return this;
    }


    build() {
        let instance = this;
        this.#form.addEventListener("submit", function (e) {
            e.preventDefault();
            const errors = instance.validate();
            if (errors && errors.length && errors.length > 0) {
                e.preventDefault();
                instance.#callbackError(errors);
                return;
            }
            instance.#callbackSuccess();
        })
        return this;
    }


    validate() {

        let instance = this;

        // reset campo withError
        instance.rules.forEach(rule => { rule.operations.forEach(op => { op.fields.forEach(field => { field.withError = false }) }) })

        for (let rule of instance.rules) {
            if (rule.when()) {
                for (let operation of rule.operations) { // lê cada validação do array
                    for (let field of operation.fields) {
                        console.debug(`debug: validating field: ${field.element.id}`)
                        if (document.getElementById(field.element.id) == null) {
                            console.error("No element found with the id: " + field.element.id)
                        }
                        let elementRefreshValue = document.getElementById(field.element.id).value;
                        console.debug(`debug: validating field: ${field.element.id} with value = ${elementRefreshValue}`)
                        field.withError = !operation.verify.fn(elementRefreshValue); // atribui ao objeto validação o resultado (true/false) retornado pela função de validação "_function(element.value)" associada
                        console.debug("=======================")
                    }
                }
            }
        }

        let doesFormContainAnyError = instance.rules
            .some(i => {
                return i.operations
                    .some(x => {
                        return x.fields
                            .some(y => { return y.withError; })
                    })
            })

        if (doesFormContainAnyError) {

            let errors = [];
            console.debug(instance.rules.map(x => x.operations).flat());
            instance.rules.map(x => x.operations).flat().forEach(op => {
                op.fields.forEach(field => {
                    if (field.withError) {
                        errors.push({ "id": field.element.id, "msg": op.verify.msg });
                    }
                })
            })
            console.debug(errors);

            //let errors = instance.rules.map(x => x.operations.map(y => y.fields)).flat().flat().filter(x => x.withError)


            errors.forEach(e => {
                console.debug(`The value of the field '${e.id}' is invalid`);
            })

            return errors;
        }
        return [];
    }

    #processFields(ids) {
        if (!Array.isArray(ids)) {
            let value = ids;
            ids = [value];
        }

        this.#getCurrentRule().operations.push({ "fields": [], "verify": { "fn": "", "msg": "" } });

        for (let fieldId of ids) {
            console.debug("id: " + fieldId)
            const elem = document.getElementById(fieldId);
            if (elem == null) {
                console.error("No element found with the id: " + fieldId)
            }
            this.#getCurrentOperation()
                .fields
                .push({
                    "element": elem,
                    "withError": false
                });
        }
    }

    #processThenCallback(callbackFn, msg) {
        this.#getCurrentOperation().verify = { "fn": callbackFn, "msg": msg };
    }

    #getCurrentRule() {
        return this.rules[this.rules.length - 1];
    }

    #getCurrentOperation() {
        return this.#getCurrentRule()
            .operations[this.#getCurrentRule().operations.length - 1];
    }
}

class Field {

    #instance;

    constructor(instance) {
        this.#instance = instance;
    }

    verify(fn, msg) {
        if (this.#instance instanceof FormValidatorBuilder) {
            this.#instance.verify(fn, msg);
            return this.#instance;
        }
        return new FormValidatorBuilder();
    }

    field(field) {
        if (this.#instance instanceof FormValidatorBuilder) {
            this.#instance.field(field);
            return this.#instance;
        }
        return new FormValidatorBuilder();
    }
}

export default FormValidatorBuilder;