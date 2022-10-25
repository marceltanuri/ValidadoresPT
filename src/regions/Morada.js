import OnChangeEventBuilder from '../util/OnChangeEventBuilder';

import { Concelhos } from './Concelhos';
import { Distritos } from './Distritos';
import { Freguesias } from './Freguesias';

export class Morada {

    config = {
        elements: {
            distrito: ".select-distrito",
            concelho: "#select-concelho",
            freguesia: "#select-freguesia"
        }
    }

    constructor(config) {
        this.config = config
    }

    load(callbackFn) {

        if (document.querySelector("select" + this.config.elements.distrito) != null) {
            new Distritos().into("select" + this.config.elements.distrito).load()


            if (document.querySelector("select" + this.config.elements.concelho) != null) {
                //when distritos changes loads concelhos
                new OnChangeEventBuilder()
                    .elem("select" + this.config.elements.distrito)
                    .always((distritoValue) => {
                        new Concelhos().from(distritoValue).into("select" + this.config.elements.concelho).load()

                        document.querySelectorAll(this.config.elements.concelho).forEach(i => {
                            i.style.display = "block"
                        })
                    })
                    .build()


                if (document.querySelector("select" + this.config.elements.freguesia) != null) {
                    //when concelhos changes loads freguesias
                    new OnChangeEventBuilder()
                        .elem("select" + this.config.elements.concelho)
                        .always((concelhoValue) => {

                            const distritoId = document.querySelector("select" + this.config.elements.distrito).value
                            new Freguesias().from(distritoId, concelhoValue).into("select" + this.config.elements.freguesia).load()

                            document.querySelectorAll(this.config.elements.freguesia).forEach(i => {
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