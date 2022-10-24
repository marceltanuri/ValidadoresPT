import FormValidatorBuilder from "./FormValidatorBuilder";
class Form {


    validator = new FormValidatorBuilder();

    config = {
        "html_attributes": {
            "id": "",
            "method": "",
            "action": "",
            "enctype" : ""
        },
        "portlet_namespace" : "",
        "captcha" : {
            enabled : true,
            publicKey : ""
        }
    };

    constructor(config) {
        this.config = config;
    }

    init() {
        this.validator
            .to(this.config.html_attributes.id)
            .callbackError(this.showValidationErrors.bind(this))
            .callbackSuccess(this.submit.bind(this));
        this.validate();
        this.validator.build();
        this.postInit();
    }

    showValidationErrors(errors) {
        throw 'unimplemented function, you should be using a subclass instead of the super class'
    }

    submit() {
        throw 'unimplemented function, you should be using a subclass instead of the super class'
    }

    postInit() {
        throw 'unimplemented function, you should be using a subclass instead of the super class'
    
    }
    reset() {
        throw 'unimplemented function, you should be using a subclass instead of the super class'
    }

    validate() {
        throw 'unimplemented function, you should be using a subclass instead of the super class'
    }



}

export default Form;