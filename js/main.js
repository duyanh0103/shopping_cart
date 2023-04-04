// cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add('active');
}

closeCart.onclick = () => {
    cart.classList.remove('active');
}

// cart working js
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// making function
function ready() {
    // remove item from cart
    var removeCartButton = document.getElementsByClassName('cart-remove')
    console.log(removeCartButton);
    for (var i = 0; i < removeCartButton.length; i++) {
        console.log(removeCartButton.length);
        var button = removeCartButton[i];
        button.addEventListener('click', removeCartItem)
    }
    // quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }
    // add to cart 
    var addCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCart.length; i++) {
        var btn = addCart[i];
        btn.addEventListener('click', addCartClicked);

    }
}
// remove item from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal()
}

// add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var imgProd = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, imgProd);
    updateTotal();
}

// add Product to cart
function addProductToCart(title, price, imgProd) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title');
    // check prod đã chọn rồi
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText.toLowerCase() == title.toLowerCase()) {
            alert('item has already been added');
            return;
        }

    }

    var cartBoxContent =
        `   <img src="${imgProd}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="bx bxs-trash cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener("click", removeCartItem)
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener("change", quantityChanged)

}





// quantity change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}


// update total 
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    if (cartBoxes.length == 0) {
        total = 0;
        document.getElementsByClassName("total-price")[0].innerText = total + "VND";
    }

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceEle = cartBox.getElementsByClassName('cart-price')[0];
        var quantityEle = cartBox.getElementsByClassName('cart-quantity')[0];
        // lay moi so chuyen VND thanh ''
        var price = parseFloat(priceEle.innerText.replace("VND", ""));
        var quantity = quantityEle.value;
        total = total + (quantity * price);
        // nêu bị dư
        total = Math.round(total * 100) / 100

        document.getElementsByClassName("total-price")[0].innerText = total + "VND";
        console.log(total);
    }


}