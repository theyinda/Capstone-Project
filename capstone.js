// To ensure the web contents are fully loaded before the script file
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemIcons = document.getElementsByClassName('remove')
    for (var i = 0; i < removeCartItemIcons.length; i++) {
        var icon = removeCartItemIcons[i]
        icon.addEventListener('click', removeCartItem)
    }
    
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('mybutton')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementById("item-count").textContent = countCartItems();

}

// ADD TO CART 
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('name')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText.split("N")[1];
    var imageSrc = shopItem.getElementsByClassName('shop-image')[0].src
    addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc) {

    //Increase the cart count
    var itemCountDiv = document.getElementById("item-count")

    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].title == title) {
            cartItems[i].count += 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            itemCountDiv.textContent = countCartItems();
            return;
        }
    }

    cartItems.push({title: title, price: price, imageSrc: imageSrc, count: 1});
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    itemCountDiv.textContent = countCartItems();
    return;

}

function countCartItems()
{
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || 0;
    let count = 0;
    for(i = 0; i < cartItems.length; i++){
        count += parseInt(cartItems[i].count);
    }
    return count;
}
