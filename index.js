import OnChangeEventBuilder from './src/util/OnChangeEventBuilder';

import { Concelhos } from './src/regions/Concelhos';
import { Distritos } from './src/regions/Distritos';
import { Freguesias } from './src/regions/Freguesias';

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
        new Distritos().into("select" + this.config.elements.distrito).load()

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

        //when concelhos changes loads freguesias
        new OnChangeEventBuilder()
            .elem("select" + this.config.elements.concelho)
            .always((concelhoValue) => {

                const distritoId = document.querySelector("select" + this.config.elements.distrito).value
                new Freguesias().from(distritoId, concelhoValue).into("select" + this.config.elements.freguesia).load()

                document.querySelectorAll(this.config.elements.freguesia).forEach(i => {
                    i.style.display = "block"
                })

                if(callbackFn instanceof Function){
                    callbackFn()
                }

            })
            .build()

    }
}

export { Validadores } from './src/validadores-portugal/Validadores';

