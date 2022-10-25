import OnChangeEventBuilder from '../util/OnChangeEventBuilder';

import { Concelhos } from './Concelhos';
import { Distritos } from './Distritos';
import { Freguesias } from './Freguesias';

export class Morada {

    _config = {
        elements: {
            distrito: ".select-distrito",
            concelho: "#select-concelho",
            freguesia: "#select-freguesia"
        },
        config: {
            labelAsValue: false,
            customLabel: null,
            concatValueWithLabel: false,
            orderByValue: false,
            placeholder: null
        }

    }

    constructor(config) {
        this._config = config
    }

    load(callbackFn) {

        if (document.querySelector("select" + this._config.elements.distrito) != null) {
            new Distritos(this._config.config).into("select" + this._config.elements.distrito).load()


            if (document.querySelector("select" + this._config.elements.concelho) != null) {
                //when distritos changes loads concelhos
                new OnChangeEventBuilder()
                    .elem("select" + this._config.elements.distrito)
                    .always((distrito) => {
                        new Concelhos(this._config.config).from(distrito.selectedOptions[0].dataset["id"]).into("select" + this._config.elements.concelho).load()
                        document.querySelectorAll(this._config.elements.concelho).forEach(i => {
                            i.style.display = "block"
                        })
                    })
                    .build()


                if (document.querySelector("select" + this._config.elements.freguesia) != null) {
                    //when concelhos changes loads freguesias
                    new OnChangeEventBuilder()
                        .elem("select" + this._config.elements.concelho)
                        .always((concelho) => {

                            const distritoId = document.querySelector("select" + this._config.elements.distrito).selectedOptions[0].dataset["id"]
                            new Freguesias(this._config.config).from(distritoId, concelho.selectedOptions[0].dataset["id"]).into("select" + this._config.elements.freguesia).load()

                            document.querySelectorAll(this._config.elements.freguesia).forEach(i => {
                                i.style.display = "block"
                            })

                            if (callbackFn instanceof Function) {
                                callbackFn()
                            }

                        })
                        .build()
                }
            }
        }
    }
}