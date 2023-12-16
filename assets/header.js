import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' 
import { store } from './state.js'

 const header = createApp({
    delimiters: ['${', '}'],
    setup() {
        const menuOpen = ref(false)
        const mobile_dropdown_3 = ref(false)
        const dropdown_3 = ref(false)
        const searchMenuOpen = ref(false)
        const greeting = store.greeting

        function toggleMenu() {
            menuOpen.value = !menuOpen.value
        }
        

        return {
        toggleMenu,
        menuOpen,
        mobile_dropdown_3,
        dropdown_3,
        searchMenuOpen,
        greeting

        }
    }
}).mount('#header')
