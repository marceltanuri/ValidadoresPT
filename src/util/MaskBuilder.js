export class MaskBuilder {

    operations = [{ "fields": [], "mask": "" }];

    field(fields) {
        this.#processFields(fields);
        return this;
    }

    number(opts) {
        this.#getCurrentOperation().mask = /[A-z]|[$&+,:;=?@#|'<>.^*()%!-]/g;
        return this;
    }

    letters() {
        this.#getCurrentOperation().mask = /[^a-zA-z]+$/;
        return this;
    }

    custom(mask) {
        this.#getCurrentOperation().mask = mask;
        this.operations.push({ "fields": [], "mask": "" });
        return this;
    }

    build() {

        this.operations.forEach(op => {
            op.fields.forEach(field => {
                field.addEventListener("keydown", function (e) {
                    let value = document.getElementById(field.id).value;
                    value = value.replaceAll(op.mask, '');
                    field.value = value;
                })
            })
        })

    }

    #processFields(ids) {

        if (!Array.isArray(ids)) {
            let value = ids;
            ids = [value];
        }

        for (let fieldId of ids) {
            const elem = document.getElementById(fieldId);
            if (elem == null) {
                console.error("No element found with the id: " + fieldId)
            }
            this.#getCurrentOperation().fields.push(elem);
        }

    }

    #getCurrentOperation() {
        return this.operations[this.operations.length - 1];
    }
}