import { createApp, ref, onMounted, provide, inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' 
import store from './store.js'

const cart = createApp({
delimiters: ['${', '}'],
setup() {
    const store = inject("store");
    const cartSubtotal = ref(0);
    const cartItems = ref([]);

onMounted(() => {
    fetch('/cart.js')
    .then(response => response.json())
    .then((response) => {
        response.items.forEach(item => {
        cartItems.value.push({
            id: item.variant_id,
            url: item.url,
            key: item.key,
            title: item.product_title,
            quantity: item.quantity,
            price: item.line_price,
            image: item.featured_image.url,
            image_alt: item.featured_image.alt,
            item_options: item.options_with_values
        })
    })
    cartSubtotal.value = response.items_subtotal_price
    });
    
});

function incrementQuantity(key, quantity) {
    let newQuantity = quantity + 1
    changeItemQuantity(key, newQuantity)
    return newQuantity;
}

function decrementQuantity(key, quantity) {
    let newQuantity = quantity
    if(quantity > 1) {
        newQuantity = quantity - 1;
        changeItemQuantity(key, newQuantity);
    } 
    return newQuantity;
}

function changeItemQuantity(key, quantity) {
    let data = {
        id: key,
        quantity: quantity
    }
   store.updateCart(data)
   .then(response => {
    cartSubtotal.value = response.items_subtotal_price
    let updatedItem = response.items.find((item) => item.key === key);
    let itemToChange = cartItems.value.find((item) => item.key === key);
    itemToChange.price = updatedItem.line_price
   })
   .catch(error => {
        console.error(error);
    });
}

function removeFromCart(e, key) {
    e.preventDefault();
    let data = {
        id: key,
        quantity: 0
    }
    store.updateCart(data)
    .then(response => {
    cartSubtotal.value = response.items_subtotal_price
    let deletedItem = cartItems.value.findIndex((item) => item.key === key);
    cartItems.value.splice(deletedItem, 1);
    console.log(cartItems.value)
    })
    .catch(error => {
        console.error(error);
    });
}


    return {
        store,
        cartItems,
        cartSubtotal,
        incrementQuantity,
        decrementQuantity,
        removeFromCart
    }
},
    
})
cart.provide('store', store);
cart.mount('#cart')