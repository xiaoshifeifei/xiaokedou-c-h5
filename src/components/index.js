import Vue from "vue"

const arr = require.context('./',false,/\.vue$/)
var publicComonent = null
arr.keys().map(v=>{
    publicComonent = arr(v).default
    v = v.replace(".vue","").replace("./","")
    Vue.component(publicComonent.name,publicComonent)
})

