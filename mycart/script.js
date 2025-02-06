// nav bar menu
let menuBtn = document.getElementById('menu');
let menuBox = document.getElementById('menu-box');

menuBtn.addEventListener('click',()=>{
    if(menuBtn.getAttribute('src') == '../loginSignup/menu.png'){
        menuBtn.setAttribute('src','../loginSignup/close.png');
        menuBox.style.right = '0px';
        menuBox.style.display = 'block';
        
    }
    else{
        menuBtn.setAttribute('src','../loginSignup/menu.png');
        menuBox.style.right = '-65px';
        menuBox.style.display = 'none';
    }
});

// add item to box
let addedItemsContainer = document.getElementsByClassName('added-items');
let checkoutPriceList = document.getElementsByClassName('added-list');

let addedToCart = JSON.parse(localStorage.getItem('added'));
console.log(addedToCart)

addedToCart.forEach((value)=>{
    let itemContainer = document.createElement('div');
    itemContainer.dataset.id= value.id;
    let priceContainer = document.createElement('li');
    priceContainer.className = "added-price-items";
    priceContainer.dataset.id = value.id;
    itemContainer.className = 'items';
    itemContainer.innerHTML = `
                <div class="img-item"><img src="${value.image}" alt="ss" width="100%" height="100%"></div>
                <div class="ratings-item" id="titel">${value.category} </div>
                <div class="price-item">
                    <span>Price :$${value.price} </span>
                </div>
                <div class="add-item">
                    <button onclick="removeItem(event)">Remove from cart</button>
                </div>

    `;
    priceContainer.innerHTML = `
                <div>Quantity : ${value.quantity}</div>
                <div>$${value.price * value.quantity}</div>

    `
    addedItemsContainer[0].appendChild(itemContainer);
    checkoutPriceList[0].appendChild(priceContainer);

});
totalPrice(addedToCart);

function removeItem(eve){
    let parentId = parseInt(eve.target.parentElement.parentElement.dataset.id);
    eve.target.parentElement.parentElement.remove();
    let priceItems = document.getElementsByClassName('added-price-items');
    for(let i=0;i<priceItems.length;i++){
        if(priceItems[i].dataset.id == parentId){
            priceItems[i].remove();
        }
    }
    if(addedToCart.length>0){
        for(let i = 0; i<addedToCart.length; i++){
            if(addedToCart[i].id == parentId){
                console.log(addedToCart[i]);
                addedToCart.splice(i,1);
                localStorage.setItem('added',JSON.stringify(addedToCart));
                totalPrice(addedToCart);
            }
        }
    }
    
}

function totalPrice(ad){
    let sum = 0;
    for(let i = 0; i<ad.length; i++){
        sum = sum + (ad[i].price *ad[i].quantity);
    }
    document.getElementById('total-of-items').innerHTML = `${sum}`;
}

// 

