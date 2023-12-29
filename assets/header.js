import { createApp, ref, provide, inject, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' 
import store from './store.js'

 const header = createApp({
    delimiters: ['${', '}'],
    setup() {
        const store = inject("store");
        const menuOpen = ref(false)
        const mobile_dropdown_3 = ref(false)
        const dropdown_3 = ref(false)
        const searchMenuOpen = ref(false)
        const cartCount = ref(0)

        onMounted(async () => {
            console.log(store.state.cart.cartCount)
        })

        function toggleMenu() {
            menuOpen.value = !menuOpen.value
        }

        return {
        toggleMenu,
        menuOpen,
        mobile_dropdown_3,
        dropdown_3,
        searchMenuOpen,
        store,
        cartCount
        }
    }
});
header.provide('store', store);
header.mount('#header')
