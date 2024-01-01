const url = new URL(window.location)
const productUrl = url.pathname + '.js';
let product =  {}; 
const productPrice = document.querySelector('.product-price')
const productComparePrice = document.querySelector('.product-compare-at-price')

async function fetchProduct() {
    const response = await fetch(productUrl);
    const response_1 = await response.json();
    return response_1
}
fetchProduct()
.then(response => {
    product = response
    console.log(product)
});

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