if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartsportButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartsportButtons.length; i++) {
        var button = removeCartsportButtons[i]
        button.addEventListener('click', removeCartsport)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-sport-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartsports = document.getElementsByClassName('cart-sports')[0]
    while (cartsports.hasChildNodes()) {
        cartsports.removeChild(cartsports.firstChild)
    }
    updateCartTotal()
}

function removeCartsport(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopsport = button.parentElement.parentElement
    var title = shopsport.getElementsByClassName('shop-sport-title')[0].innerText
    var price = shopsport.getElementsByClassName('shop-sport-price')[0].innerText
    var imageSrc = shopsport.getElementsByClassName('shop-sport-image')[0].src
    addsportToCart(title, price, imageSrc)
    updateCartTotal()
}

function addsportToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartsports = document.getElementsByClassName('cart-sports')[0]
    var cartsportNames = cartsports.getElementsByClassName('cart-sport-title')
    for (var i = 0; i < cartsportNames.length; i++) {
        if (cartsportNames[i].innerText == title) {
            alert('This sport is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-sport cart-column">
            <img class="cart-sport-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-sport-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartsports.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartsport)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartsportContainer = document.getElementsByClassName('cart-sports')[0]
    var cartRows = cartsportContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

