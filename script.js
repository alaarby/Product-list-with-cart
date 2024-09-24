var removeCartButtons = document.getElementsByClassName('remove-item-btn');
for(var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i];
    button.addEventListener("click", deleteCartItem);
}
// delete item from cart
function deleteCartItem(event){
    var buttonClicked = event.target;
    var elementToRemove = buttonClicked.parentElement.parentElement;
    var title = elementToRemove.getElementsByClassName('item-name')[0].innerText;
    
    var product = document.getElementById(title).parentElement.parentElement;
    product.getElementsByClassName('add-to-cart')[0].style.display = 'flex';
    product.getElementsByClassName('increment-decrement-toCart')[0].style.display = 'none';
    product.getElementsByClassName('amount')[0].innerText = 1;
    
    elementToRemove.remove();
    
    if(document.getElementsByClassName('item').length === 0){
        document.getElementsByClassName('cart-info')[0].style.display = 'none';
        document.getElementsByClassName('empty-cart')[0].style.display = 'block';
    }
    
    document.getElementsByClassName('number-of-items-in-cart')[0].innerText =
    +document.getElementsByClassName('number-of-items-in-cart')[0].innerText -
    +elementToRemove.getElementsByClassName('item-quantity')[0].innerText.replace('x',"");
    updateTotal();
}

// Update Total
function updateTotal(){
    var cart = document.getElementsByClassName('cart-items')[0];
    var cartItems = cart.getElementsByClassName('item');
    var total = 0;
    for(let i = 0; i < cartItems.length; i++){  
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByClassName('item-price')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantitiyElement = cartItem.getElementsByClassName('item-quantity')[0];
        var quantity = quantitiyElement.innerText.replace('x',"");
        var totalOfItem = price * quantity;
        cartItem.getElementsByClassName('item-total-price')[0].innerText = '$' + totalOfItem.toFixed(2);
        console.log(totalOfItem);
        total = total + totalOfItem;        
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toFixed(2);
    
}
// Add To Cart
var addCart = document.getElementsByClassName('add-to-cart');
for(var i = 0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
}
function addCartClicked(event){
    document.getElementsByClassName('cart-info')[0].style.display = 'block';
    document.getElementsByClassName('empty-cart')[0].style.display = 'none';
    var button = event.target;
    var product = button.parentElement.parentElement;
    var title = product.getElementsByClassName('title')[0].innerText;
    var price = product.getElementsByClassName('product-price')[0].innerText;
    product.getElementsByClassName('add-to-cart')[0].style.display = 'none';
    product.getElementsByClassName('increment-decrement-toCart')[0].style.display = 'flex';
    addProductToCart(title, price,);
}
function addProductToCart(title, price){
    var cart = document.getElementsByClassName('cart-items')[0];
    var cartBoxContent = 
                        `
                        <h5 class="item-name">${title}</h5>
                        <h5 class="item-quantity">1<span>x</span></h5>
                        <span>@</span>
                        <p class="item-price">${price}</p>
                        <p class="item-total-price">${price}</p>
                        <button class="remove-item-btn"><img src="images/icon-remove-item.svg" alt=""></button>`;
    var cartBox = document.createElement("div");
    cartBox.classList.add('item');
    cartBox.innerHTML = cartBoxContent;
    cart.append(cartBox);
    cartBox.getElementsByClassName('remove-item-btn')[0].addEventListener('click', deleteCartItem);
    document.getElementsByClassName('number-of-items-in-cart')[0].innerText =
    +document.getElementsByClassName('number-of-items-in-cart')[0].innerText + 1;
    updateTotal();
}

// increase qyantity of product
var increaseQuantity = document.getElementsByClassName('increment');
for(var i = 0; i < increaseQuantity.length; i++){
    var button = increaseQuantity[i];
    button.addEventListener("click", increment);
}
function increment(event){
    var buttonClicked = event.target;
    var amount= buttonClicked.parentElement.getElementsByClassName('amount')[0];
    amount.innerText = +amount.innerText + 1;
    document.getElementsByClassName('number-of-items-in-cart')[0].innerText =
    +document.getElementsByClassName('number-of-items-in-cart')[0].innerText + 1; 
    changeQuantity(amount);
    updateTotal();
}
// decrease qyantity of product
var decreaseQuantity = document.getElementsByClassName('decrement');
for(var i = 0; i < decreaseQuantity.length; i++){
    var button = decreaseQuantity[i];
    button.addEventListener("click", decrement);
}
function decrement(event){
    var buttonClicked = event.target;
    var amount = buttonClicked.parentElement.getElementsByClassName('amount')[0];
    amount.innerText = amount.innerText > 1 ? (+amount.innerText-1) : alert('Can not set amount less than One'); 
    
    changeQuantity(amount);
    document.getElementsByClassName('number-of-items-in-cart')[0].innerText =
    +document.getElementsByClassName('number-of-items-in-cart')[0].innerText - 1;
    updateTotal();
}

// Change quantity
function changeQuantity(amount){
    var cartItems = document.getElementsByClassName('item');
    for(var i = 0; i < cartItems.length; i++){
        if(amount.id == cartItems[i].getElementsByClassName('item-name')[0].innerText){  
            cartItems[i].getElementsByClassName('item-quantity')[0].innerText = amount.innerText + 'x';
        }
    }
}

// Confirm Order
var confirmOrder = document.getElementsByClassName('confirm-order-btn')[0];
confirmOrder.addEventListener('click', orderConfirmed);
function orderConfirmed(){
    var cartItems = document.getElementsByClassName('item');
    var products = document.getElementsByClassName('box');
    var confirmCart = document.getElementsByClassName('confirm-cart')[0]; 
    for(var i =  0; i < cartItems.length; i++){
        for(var j = 0; j < products.length; j++){
            if(cartItems[i].getElementsByClassName('item-name')[0].innerText == 
                products[j].getElementsByClassName('title')[0].innerText){
                    var image = products[j].getElementsByTagName('img')[0].src;
                    var title = cartItems[i].getElementsByClassName('item-name')[0].innerText;
                    var quantity = cartItems[i].getElementsByClassName('item-quantity')[0].innerText;
                    var price = cartItems[i].getElementsByClassName('item-price')[0].innerText;
                    var totalPrice = cartItems[i].getElementsByClassName('item-total-price')[0].innerText;
                    console.log(title, quantity, price,totalPrice);
                    var content = `
                                    <img src="${image}"/>
                                    <div>
                                        <h5 class="title">${title}</h5>
                                        <h5 class="item-quantity">${quantity}</h5>
                                        <span>@</span>
                                        <p class="item-price">${price}</p>
                                    </div>
                                    <p class="item-total-price">${totalPrice}</p>`;
                    var cartItem = document.createElement("div");
                    cartItem.classList.add('confirm-cart-item')
                    cartItem.innerHTML = content;
                    confirmCart.append(cartItem);
                }
        }
    }
    document.getElementsByClassName('confirmation-box')[0].style.display = 'flex';
    document.getElementsByClassName('confirm-total-price')[0].innerText =
    document.getElementsByClassName('cart-total-price')[0].innerText;
    document.getElementsByTagName('main')[0].classList.add('blur');
}

// Start new order
var resetButton = document.getElementsByClassName('start-new-order-btn')[0];
resetButton.addEventListener('click', reset);
function reset(){
    location.reload();
}