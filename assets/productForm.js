let product =  {}; 
const url = new URL(window.location);
const productUrl = url.pathname + '.js';
const productPrice = document.querySelector('.product-price');
const productComparePrice = document.querySelector('.product-compare-at-price');
let variantId;

(async () => {
    try {
        const response = await fetch(productUrl);
        const response_1 = await response.json();
        product = response_1;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
})();

document.querySelectorAll('.product-option input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        let selectedOptions = []
        document.querySelectorAll('.product-option input[type="radio"]:checked').forEach(radio => {
            selectedOptions.push(radio.value)
        })

         // Clear previous selections
        document.querySelectorAll('.product-option label').forEach(label => {
            if (label.id.split('-')[0] === radio.id.split('-')[0]){
            label.classList.remove('bg-gray-900');
            label.classList.remove('text-white'); 
            }
        });

        let selectedLabel = document.querySelector(`label[for=${radio.id}]`)
        if (selectedLabel) {
            selectedLabel.classList.add('bg-gray-900')
            selectedLabel.classList.add('text-white')
        }

        let matchedVariant = product.variants.find(variant => {
            let pass = true
            for(let i = 0; i < selectedOptions.length; i++) {
                if(selectedOptions.indexOf(variant.options[i]) === -1) {
                    pass = false
                    break
                }
            }
            return pass
        })

        // update hidden input value
        document.querySelector('#product-id').value = matchedVariant.id
        // update url based on selected option
        url.searchParams.set('variant' ,matchedVariant.id)
        window.history.pushState({}, '', url.toString())
        variantId = matchedVariant.id;

        // change prices based on selected option
        const money = (value) => {
            if(!value) return 0;
            return '$' + (value/100).toFixed(2);
        }

        productPrice.textContent = money(matchedVariant.price);
        productComparePrice.textContent = money(matchedVariant.compare_at_price);
        // hide the compare at price if the item is not marked down
        matchedVariant.compare_at_price > matchedVariant.price ? productComparePrice.classList.remove('hidden') :
        productComparePrice.classList.add('hidden')
    })
})

document.getElementById('add-to-cart-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const quantity = document.getElementById('product-quantity').value

    let data = {
        id: variantId,
        quantity: quantity
    }

    try {
        let response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        }
        document.getElementById('view-cart-btn').classList.remove('hidden');
        return await response.json();
    } catch (error) {
        console.log(`There was a problem with the fetch operation: ${error}`);
    }
})