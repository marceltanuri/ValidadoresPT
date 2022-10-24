export class SelectLoader {

    constructor(data, value, label) {

        this.data = data
        this.value = value
        this.label = label
    }

    filterFn = null
    selector = ""
    _config = {}
    optionalColumns = []

    into(selector) {
        this.selector = selector
        return this
    }

    config(config) {
        this._config = config
        return this
    }

    getFilter() {
        return x => this.filterFn(x[this.value])
    }

    load() {

        let instance = this

        const selects = document.querySelectorAll(this.selector)
        let list = this.data
        if(this._config.orderByValue)
            list = this.data.sort((x, y) => { return x[this.value].localeCompare(y[this.value]) })
        else
            list = this.data.sort((x, y) => { return x[this.label].localeCompare(y[this.label]) })

        if (this.filterFn != null) {
            list = list.filter(this.getFilter())
        }

        selects.forEach(_select => {
            _select.innerHTML = ''
            let _option = document.createElement("option")
            _option.value = ""

            if(instance.optionalColumns != null){
                instance.optionalColumns.forEach(col=>{
                    _option.dataset[col.toLowerCase()] = ""
                })
            }

            _option.innerHTML = ""
            if(instance._config.placeholder)
                _option.innerHTML = instance._config.placeholder
            _select.appendChild(_option)
        })

        list.forEach(x => {
            selects.forEach(_select => {
                let _option = document.createElement("option")
                _option.value = x[instance.value]
                let label = x[instance.label]
                
                
                if(instance._config.customLabel){
                    label = instance._config.customLabel(label, x[instance.value])
                }
                
                _option.innerHTML = label
                
                if(instance.optionalColumns != null){
                    instance.optionalColumns.forEach(col=>{
                        _option.dataset[col.toLowerCase()] = x[col]
                    })
                }

                if(instance._config.concatValueWithLabel)
                    _option.innerHTML = `${x[instance.value]} - ${label}`
                _select.appendChild(_option)
            })
        })
    }

    filter(filterFn) {
        this.filterFn = filterFn
        return this
    }

}