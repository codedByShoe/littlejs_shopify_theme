
const getCartItemsCount =  async () => {
    const response = await fetch('/cart.js');
    const response_1 = await response.json();
    return response_1.item_count;
}

getCartItemsCount()
.then(itemCount => {
    document.getElementById('counter').innerHTML = itemCount
})


const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('absolute');
    }else {
        mobileMenu.classList.remove('absolute');
        mobileMenu.classList.add('hidden');
    }
}

const toggleSearchMenu = () => {
    const searchMenu = document.getElementById('search-menu');
    if(searchMenu.classList.contains('hidden')) {
        searchMenu.classList.remove('hidden');
        searchMenu.classList.add('absolute');
    }else {
        searchMenu.classList.remove('absolute');
        searchMenu.classList.add('hidden');
    }
}


