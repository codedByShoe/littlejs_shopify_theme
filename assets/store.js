import { reactive, readonly } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' 
 const state = reactive({
    greeting: 'Hello from store',
    
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

const addToCart = (e, selectedProduct) => {
    e.preventDefault();

    let data = {
        id: selectedProduct.id,
        quantity: selectedProduct.quantity
    }

    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        }
        console.log(response.text()); 
    })
    .then(responseData => {
        console.log(responseData); // Handle the response data
    })
    .catch(error => {
        console.log(`There was a problem with the fetch operation: ${error}`);
    });
    // check quantity_rule before submitting
}
export default {
    state: readonly(state),
    url,
    money,
    setQueryParam,
    getQueryParam,
    addToCart
}
