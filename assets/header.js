import { createApp, ref, provide, inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' 
import store from './store.js'

 const header = createApp({
    delimiters: ['${', '}'],
    setup() {
        const store = inject("store");
        const menuOpen = ref(false)
        const mobile_dropdown_3 = ref(false)
        const dropdown_3 = ref(false)
        const searchMenuOpen = ref(false)

        function toggleMenu() {
            menuOpen.value = !menuOpen.value
        }

        return {
        toggleMenu,
        menuOpen,
        mobile_dropdown_3,
        dropdown_3,
        searchMenuOpen,
        store

        }
    }
});
header.provide('store', store);
header.mount('#header')
