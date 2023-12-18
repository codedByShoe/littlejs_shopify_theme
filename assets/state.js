import { reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' 
 const store = reactive({
    greeting: 'Hello from store'
})

 function money(value) {
    if(!value) return 0;
    return '$' + (value/100).toFixed(2);
}

export {
    store,
    money
}
