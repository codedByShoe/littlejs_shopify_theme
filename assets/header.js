
(async () => {
    const response = await fetch('/cart.js');
    const response_1 = await response.json();
    updateCartCount(response_1.item_count);
})();

const updateCartCount = (count = 0) => {
document.getElementById('counter').innerHTML = count;
}

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


