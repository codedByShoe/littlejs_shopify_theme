// update quantity input buttons
document.querySelectorAll('.cart-quantity-selector button').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        const value = Number(input.value);
        const key = button.closest('.cart-item').getAttribute('data-key');
        if(button.id === 'cart-btn-plus') {
            const newValue = value + 1;
            input.value = newValue;
            changeItemQuantity(key, newValue);
        }else if(value > 1) {
            const newValue = value - 1;
            input.value = newValue;
            changeItemQuantity(key, newValue);
        }
    })
})

// remove item from cart
document.querySelectorAll('#cart-remove-item').forEach(remove => {
    remove.addEventListener('click', (e) => {
        e.preventDefault();
        const item = remove.closest('.cart-item');
        const key = item.getAttribute('data-key')
        sendPost('/cart/change.js', {id: key, quantity})
        .then((response) => {
            if(response.item_count === 0) {
                document.querySelector('#cart-container').remove();
                const html = document.createElement('div');
                html.innerHTML = `
                    <div class="max-w-6xl h-60 my-4 mx-auto flex items-center justify-center">
                        <div class="text-center">
                            <h1 class="text-3xl my-4">Your cart is empty</h1>
                            <div class="my-4 py-4">
                            <a href="/collections/all" class="border border-gray-600 text-white bg-gray-600 px-8 py-3">
                                Continue shopping
                            </a>
                            </div>
                        </div>
                    </div> 
                `;
            document.querySelector('#cart-main').appendChild(html); 
            }else {
                document.getElementById('cart-subtotal').textContent ='$' + (response.items_subtotal_price/100).toFixed(2); 
                document.getElementById('cart-discount').textContent ='$' + (response.total_discount/100).toFixed(2); 
                item.remove()
            }
            fetchMinicart(response);
        })
    })
})

// update cart notes
document.querySelector('[name=note]').addEventListener('keyup', debounce((e) => {
    sendPost('/cart/update.js', e.target.value)
}));

// update cart on quantity input change
function changeItemQuantity(key, quantity) {

    sendPost('/cart/change.js', {id: key, quantity: quantity})
    .then((response) => {
        const item = response.items.find(item => item.key === key);
        document.getElementById('cart-subtotal').textContent ='$' + (response.items_subtotal_price/100).toFixed(2); 
        document.getElementById('cart-discount').textContent = '$' + (response.total_discount/100).toFixed(2);
        document.querySelector(`[data-key="${key}"] .line-item-price`).textContent ='$' + (item.final_line_price/100).toFixed(2); 
        fetchMinicart(response);
    })
}
