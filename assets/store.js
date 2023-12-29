import { reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' 
 const store = reactive({
    cart: {
        cartCount: 0
    },
    greeting: 'Hello from store',
    async getCart() {
        const response = await fetch('/cart.js');
        const response_1 = await response.json();
        this.cart.cartCount = response_1.item_count;
    },
})


const url = new URL(window.location);

const money = (value) => {
    if(!value) return 0;
    return '$' + (value/100).toFixed(2);
}

const setQueryParam = (key, value) => {
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
}

const getQueryParam = (value) => {
    return url.searchParams.has(value) ? url.searchParams.get(value) : null;
}

const addToCart = async (e, selectedProduct) => {
    e.preventDefault();

    let data = {
        id: selectedProduct.id,
        quantity: selectedProduct.quantity
    }

    try {
        const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(`There was a problem with the fetch operation: ${error}`);
    }
}


const updateCart = async (data) => {
    try {
        const response = await fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(`There was a problem with the fetch operation: ${error}`);
    }
}



export default {
    state: store,
    url,
    money,
    setQueryParam,
    getQueryParam,
    addToCart,
    updateCart,
}
