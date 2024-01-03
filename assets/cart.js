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
        let data = {
            id: key,
            quantity: 0
        }
        try {
            fetch('/cart/change.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
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
                    const totalDiscount = '$' + (response.total_discount/100).toFixed(2);
                    const subtotal = '$' + (response.items_subtotal_price/100).toFixed(2);
                    document.getElementById('cart-subtotal').textContent = subtotal;
                    document.getElementById('cart-discount').textContent = totalDiscount;
                    item.remove()
                }
                updateCartCount(response.item_count);
        })
        } catch (error) {
            console.log(`There was a problem with the fetch operation: ${error}`);
        }
    })
})

// update cart notes
document.querySelector('[name=note]').addEventListener('keyup', debounce((e) => {
    try {
        fetch('/cart/update.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({note: e.target.value})
        })
        .then(response => response.json())
    } catch (error) {
        console.log(`There was a problem with the fetch operation: ${error}`);
    }
}));

// debounce input on textarea
function debounce(func, timeout = 500){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

// update cart on quantity input change
function changeItemQuantity(key, quantity) {
    let data = {
        id: key, 
        quantity: quantity
    };

    try {
        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            const totalDiscount = '$' + (response.total_discount/100).toFixed(2);
            const subtotal = '$' + (response.items_subtotal_price/100).toFixed(2);
            const item = response.items.find(item => item.key === key);
            const itemPrice = '$' + (item.final_line_price/100).toFixed(2);
            document.getElementById('cart-subtotal').textContent = subtotal;
            document.getElementById('cart-discount').textContent = totalDiscount;
            document.querySelector(`[data-key="${key}"] .line-item-price`).textContent = itemPrice;
            updateCartCount(response.item_count);
        })
    } catch (error) {
        console.log(`There was a problem with the fetch operation: ${error}`);
    }
}
