document.getElementById('hotdogs-button').addEventListener('click', function() {
    document.querySelector('.hotdogitemcontainer').style.display = 'grid';
    document.querySelector('.burgeritemcontainer').style.display = 'none';
    document.querySelector('.sidemealitemcontainer').style.display = 'none';
    document.querySelector('.ricemealitemcontainer').style.display = 'none';
    document.querySelector('.drinksitemcontainer').style.display = 'none';
    document.querySelector('.bundlesitemcontainer').style.display = 'none';
    document.querySelector('.pastamealitemcontainer').style.display = 'none';

});

document.getElementById('burgers-button').addEventListener('click', function() {
    document.querySelector('.burgeritemcontainer').style.display = 'grid';
    document.querySelector('.hotdogitemcontainer').style.display = 'none';
    document.querySelector('.sidemealitemcontainer').style.display = 'none';
    document.querySelector('.ricemealitemcontainer').style.display = 'none';
    document.querySelector('.drinksitemcontainer').style.display = 'none';
    document.querySelector('.bundlesitemcontainer').style.display = 'none';
    document.querySelector('.pastamealitemcontainer').style.display = 'none';

});

document.getElementById('sidemeal-button').addEventListener('click', function() {
    document.querySelector('.sidemealitemcontainer').style.display = 'grid';
    document.querySelector('.burgeritemcontainer').style.display = 'none';
    document.querySelector('.hotdogitemcontainer').style.display = 'none';
    document.querySelector('.ricemealitemcontainer').style.display = 'none';
    document.querySelector('.drinksitemcontainer').style.display = 'none';
    document.querySelector('.bundlesitemcontainer').style.display = 'none';
    document.querySelector('.pastamealitemcontainer').style.display = 'none';

});

document.getElementById('ricemeal-button').addEventListener('click', function() {
    document.querySelector('.ricemealitemcontainer').style.display = 'grid';
    document.querySelector('.hotdogitemcontainer').style.display = 'none';
    document.querySelector('.burgeritemcontainer').style.display = 'none';
    document.querySelector('.sidemealitemcontainer').style.display = 'none';
    document.querySelector('.drinksitemcontainer').style.display = 'none';
    document.querySelector('.bundlesitemcontainer').style.display = 'none';
    document.querySelector('.pastamealitemcontainer').style.display = 'none';

});

document.getElementById('drinks-button').addEventListener('click', function() {
    document.querySelector('.drinksitemcontainer').style.display = 'grid';
    document.querySelector('.ricemealitemcontainer').style.display = 'none';
    document.querySelector('.hotdogitemcontainer').style.display = 'none';
    document.querySelector('.burgeritemcontainer').style.display = 'none';
    document.querySelector('.sidemealitemcontainer').style.display = 'none';
    document.querySelector('.bundlesitemcontainer').style.display = 'none';
    document.querySelector('.pastamealitemcontainer').style.display = 'none';
});

document.getElementById('bundles-button').addEventListener('click', function() {
    document.querySelector('.bundlesitemcontainer').style.display = 'grid';
    document.querySelector('.hotdogitemcontainer').style.display = 'none';
    document.querySelector('.burgeritemcontainer').style.display = 'none';
    document.querySelector('.sidemealitemcontainer').style.display = 'none';
    document.querySelector('.ricemealitemcontainer').style.display = 'none';
    document.querySelector('.drinksitemcontainer').style.display = 'none';
    document.querySelector('.pastamealitemcontainer').style.display = 'none';
});

document.getElementById('pastameal-button').addEventListener('click', function() {
    document.querySelector('.pastamealitemcontainer').style.display = 'grid';
    document.querySelector('.bundlesitemcontainer').style.display = 'none';
    document.querySelector('.hotdogitemcontainer').style.display = 'none';
    document.querySelector('.burgeritemcontainer').style.display = 'none';
    document.querySelector('.sidemealitemcontainer').style.display = 'none';
    document.querySelector('.ricemealitemcontainer').style.display = 'none';
    document.querySelector('.drinksitemcontainer').style.display = 'none';
});


document.getElementById('addcart-btn').addEventListener('click', function() { 
    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer.style.display === 'block') {
        cartContainer.style.display = 'none';
    } else {
        cartContainer.style.display = 'block';
    }
});

document.getElementById('addcart-btn').addEventListener('click', function() { 
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.classList.toggle('show');
});



/* get cart total from session on load */
updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() { addToCart(this); });
}

/* ADD TO CART functions */
function addToCart(elem) {
    var getprice;
    var getproductName;
    var cart = [];
    var stringCart;
    
    // Check if the previous sibling is a select element
    if (elem.previousElementSibling && elem.previousElementSibling.tagName === 'SELECT') {
        var priceSelect = elem.previousElementSibling;
        getprice = priceSelect.options[priceSelect.selectedIndex].value;
        getproductName = priceSelect.previousElementSibling.innerText;
    } else {
        getprice = elem.previousElementSibling.getAttribute('data-price');
        getproductName = elem.previousElementSibling.previousElementSibling.innerText;
    }

    // Create product object
    var product = {
        productname: getproductName,
        price: "₱" + getprice
    };
    
    // Convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    
    if (!sessionStorage.getItem('cart')) {
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    } else {
        cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}

/* Calculate Cart Total */
function updateCartTotal() {
    var total = 0;
    var items = 0;
    var carttable = "";
    
    if (sessionStorage.getItem('cart')) {
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        items = cart.length;
        
        for (var i = 0; i < items; i++) {
            var x = JSON.parse(cart[i]);
            var price = parseFloat(x.price.split('₱')[1]);
            var productname = x.productname;
            carttable += "<tr><td>" + productname + "</td><td>₱" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
    }
    
    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById("carttable").innerHTML = carttable;
    document.getElementById("itemsquantity").innerHTML = items;
    document.getElementById("cart-count").innerHTML = items;
}

function addedToCart(pname) {
    var message = pname + " was added to the cart";
    var alerts = document.getElementById("alerts");
    alerts.innerHTML = message;
    if (!alerts.classList.contains("message")) {
        alerts.classList.add("message");
    }
}

function emptyCart() {
    if (sessionStorage.getItem('cart')) {
        sessionStorage.removeItem('cart');
        updateCartTotal();
        var alerts = document.getElementById("alerts");
        alerts.innerHTML = "";
        if (alerts.classList.contains("message")) {
            alerts.classList.remove("message");
        }
    }
}


