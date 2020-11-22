
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsDiv = document.querySelector('.cart-items')

  cartItems.map( (item, index) => {
    cartItemsDiv.innerHTML += `
    <div class="cart-row row${index}">
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${item.imageSrc}" width="100" height="100">
          <span class="cart-item-title">${item.title}</span>
      </div>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="${item.count}">
          <span class="cart-price">N${item.price}</span>
          <i class="fa fa-times remove" aria-hidden="true"></i>
      </div>
  </div>
    
    `
  });

  const cartItemDiv = cartItemsDiv.children;
  for(i = 0; i< cartItemDiv.length; i++){
    cartItemDiv[i].querySelector('.remove').addEventListener('click', removeCartItem)
    cartItemDiv[i].querySelector('.cart-quantity-input').addEventListener('change', quantityChanged)
  }
  updateCartTotal();
}

// UPDATE CART TOTAL FUNCTION
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.innerText.replace('N', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = 'N' + total

  var itemCountDiv = document.getElementById("item-count")
  itemCountDiv.textContent = countCartItems()
}

// REMOVE ITEM FROM CART
function removeCartItem(event) {
  var iconClicked = event.target
  const title = event.target.parentNode.parentNode.querySelector(".cart-item-title").textContent
  iconClicked.parentElement.parentElement.remove()
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
  cartItems = cartItems.filter( item => item.title !== title);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartTotal()
}

// UPDATE NUMBER OF QUANTITY OF ITEM
function quantityChanged(event) {
  var input = event.target
  const title = event.target.parentNode.parentNode.querySelector(".cart-item-title").textContent;
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
  for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].title == title) {
          cartItems[i].count = input.value;
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          break;
      }
  }
  updateCartTotal()
}