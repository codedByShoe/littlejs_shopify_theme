
getData('/cart.js')
.then(response => {
    fetchMinicart(response);
});


//grab dropdowns on mobile and desktop
document.querySelectorAll('#menu-btn-3').forEach(btn => {
    const childMenu = document.querySelectorAll('#child-dropdown-1');
    btn.addEventListener('click', () => {
        childMenu.forEach(child => {
            if(child.classList.contains('hidden')) {
            child.classList.remove('hidden');
            child.classList.add('absolute');
            }else {
            child.classList.add('hidden');
            child.classList.remove('absolute');
            }
            
        })
    })
})

const toggleMinicart = () => {
const overlay = document.getElementById('minicart-overlay');
const minicart = document.getElementById('minicart');
if(minicart.classList.contains('hidden')) {
    minicart.classList.remove('hidden')
    overlay.classList.remove('hidden')
    overlay.classList.add('fixed')
    minicart.classList.add('fixed')
}else {
    minicart.classList.add('hidden')
    overlay.classList.add('hidden')
    overlay.classList.remove('fixed')
    minicart.classList.remove('fixed')
}
}

const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('block');
    }else {
        mobileMenu.classList.remove('block');
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

// remove item from minicart
const minicartRemoveItem = (key) => {

    let data = {
        id: key,
        quantity: 0
    }

    sendPost('/cart/change.js', data) 
    .then((response) => {
        if(response.item_count === 0) {
            document.querySelector('#minicart-container').remove();
            const html = document.createElement('div');
            html.innerHTML = `
                <h1 class="text-center">Your cart is empty</h1>
            `;
            document.querySelector('#minicart-main').appendChild(html); 
        }else {
            document.getElementById(`minicart-item-${key}`).remove();
        }
        fetchMinicart(response);
    })

}
