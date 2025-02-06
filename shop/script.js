// nav bar menu
let menuBtn = document.getElementById('menu');
let menuBox = document.getElementById('menu-box');

menuBtn.addEventListener('click',()=>{
    if(menuBtn.getAttribute('src') == '../menu.png'){
        menuBtn.setAttribute('src','../close.png');
        menuBox.style.right = '0px';
        menuBox.style.display = 'block';
        
    }
    else{
        menuBtn.setAttribute('src','../menu.png');
        menuBox.style.right = '-65px';
        menuBox.style.display = 'none';
    }
});
// search items 
let products = JSON.parse(localStorage.getItem('products'));
let searchInput = document.getElementById('search-items');
let filterData;
searchInput.addEventListener('keyup',()=>{
    filterData = products.filter((item)=> item.title.toLowerCase().includes(searchInput.value.toLowerCase()));
    let mensss = filterData.filter((item)=> item.category == "men's clothing");
    let womenss = filterData.filter((item)=> item.category == "women's clothing");
    let jeweleryy = filterData.filter((item)=> item.category == "jewelery");
    let electronicss = filterData.filter((item)=> item.category == "electronics");
    let pppp = [mensss,womenss,jeweleryy,electronicss];
    let clothingsItems = document.getElementsByClassName('clothing-items');
    for(let j = 0; j<clothingsItems.length; j++){
        clothingsItems[j].innerHTML = '';
        
    }
    for(let i = 0; i<pppp.length; i++){
        if(pppp[i].length == 0){
            clothingsItems[i].innerHTML = `<div class="not-found">No Searched data found </div>`;
        }
        pppp[i].forEach((item)=>{
            let itemDiv = document.createElement('div');
            itemDiv.className = 'items';
            let colorElement = document.createElement('div');
            colorElement.className = 'color-item';
            colorElement.innerHTML = "Colors : "
            let colorDiv = item.colors;
            colorDiv.forEach((clr)=>{
                let clrSpan = document.createElement('span');
                clrSpan.style.backgroundColor = clr;
                colorElement.appendChild(clrSpan);
            })
            itemDiv.innerHTML = `
                        <div class="img-item"><img src="${item.image}" alt="ss" width="100%" height="100%"></div>
                        <div class="price-item">
                                <span>$${item.price}</span>
                                <span>${item.sizes}</span>
                        </div>
                        ${colorElement.outerHTML}
                        <div class="ratings-item">Ratings : <span>${item.rating.rate}</span></div>
                        <div class="add-item"><button>Add to cart</button></div>
                        
            `;
            clothingsItems[i].appendChild(itemDiv);
        });
    }

});



// tabs
let tabLinks = document.getElementsByClassName('tab-links');
let clothingContainers = document.getElementsByClassName('clothing');

function handleTab(ev,box){
    let i ;
    if(box == 'All'){
        for(i=0; i<clothingContainers.length; i++){
            clothingContainers[i].style.display = "block";
        }
        for(i=0; i<tabLinks.length ; i++){
            tabLinks[i].className = tabLinks[i].className.replace(" active","");
        }
    }
    else{
        for(i=0; i<clothingContainers.length; i++){
            clothingContainers[i].style.display = "none";
        }
    
        for(i=0; i<tabLinks.length ; i++){
            tabLinks[i].className = tabLinks[i].className.replace(" active","");
        }
        document.getElementById(box).style.display = "block";
    }

   
    ev.currentTarget.className += " active";

}




//item box.
// clothing items

let colors = ["red","black","blue","green"];
let sizes = ['s','l','m','xl'];
if(localStorage.getItem('products')){
    let products = JSON.parse(localStorage.getItem('products'));
    
    console.log(products)
    let mensProducts = products.filter((item)=> item.category == "men's clothing");
    let womensProducts = products.filter((item)=> item.category == "women's clothing");
    let jewelery = products.filter((item)=> item.category == "jewelery");
    let electronics = products.filter((item)=> item.category == "electronics");
    let pp = [mensProducts,womensProducts,jewelery,electronics];

    let clothingsItems = document.getElementsByClassName('clothing-items');
    for(let i = 0; i<pp.length; i++){
        pp[i].forEach((item)=>{
            let itemDiv = document.createElement('div');
            itemDiv.className = 'items';
            itemDiv.dataset.id = item.id;
            let colorElement = document.createElement('div');
            colorElement.className = 'color-item';
            colorElement.innerHTML = "Colors : "
            let colorDiv = item.colors;
            colorDiv.forEach((clr)=>{
                let clrSpan = document.createElement('span');
                clrSpan.style.backgroundColor = clr;
                colorElement.appendChild(clrSpan);
            })
            itemDiv.innerHTML = `
                        <div class="img-item"><img src="${item.image}" alt="ss" width="100%" height="100%"></div>
                        <div class="price-item">
                                <span>$${item.price}</span>
                                <span>${item.sizes}</span>
                        </div>
                        ${colorElement.outerHTML}
                        <div class="ratings-item">Ratings : <span>${item.rating.rate}</span></div>
                        <div class="add-item"><button onclick="addedFunction(event)">Add to cart</button></div>
                        </div>
            `;
            clothingsItems[i].appendChild(itemDiv);
        });
    }

    //adddfsdf
    let addedItems = [];
    function addedFunction(eve){
        
        let parentId = parseInt(eve.target.parentElement.parentElement.dataset.id);
        console.log(parentId)
        let itemFound = addedItems.findIndex((value)=> value.id == parentId);
        
        if(itemFound<0){
            for(let i =0; i<products.length; i++){
                
                if(products[i].id == parentId){
                    products[i].quantity = 1;
                    addedItems.push(products[i]);
                   
                    
                }
            }
        }else{ 
            addedItems[itemFound].quantity = addedItems[itemFound].quantity+1;
            // addedItems[itemFound].price = addedItems[itemFound].price *addedItems[itemFound].quantity; 
        }
        localStorage.setItem('added',JSON.stringify(addedItems));
    }
     
    
}
else{
    fetch('https://fakestoreapi.com/products').then((res)=>{
        return res.json();
    }).then((data)=>{
        let newData = data.map((item)=>{
            item.colors = colors.slice(Math.floor(Math.random()*4));
            item.sizes = sizes.slice(Math.floor(Math.random()*3));
            return item;
        })
        console.log(newData);
        localStorage.setItem("products",JSON.stringify(newData));
    });
}

// added items
// close filtered container
let closeFilteredContainer = document.getElementById('close-filtered-container');
let filteredContainer = document.querySelector('.filtered-container');
closeFilteredContainer.addEventListener('click',()=>{
    console.log(filteredContainer)
    filteredContainer.style.left = '-860px';
  
})

document.getElementById('apply-filter').addEventListener('click',()=>{
    filteredContainer.style.left = '140px';
    document.querySelector('.filtered-items').innerHTML = '';

    // checkbox
    let red = document.getElementById('red');
    let blue = document.getElementById('blue');
    let black = document.getElementById('black');
    let green = document.getElementById('green');
    let white = document.getElementById('white');
    let s = document.getElementById('s');
    let l = document.getElementById('l');
    let m = document.getElementById('m');
    let xl = document.getElementById('xl');
    let range = document.getElementById('range');
    let _0to25 = document.getElementById('0-25');
    let _25to50 = document.getElementById('25-50');
    let _50to100 = document.getElementById('50-100');
    let _100onwards = document.getElementById('100-onwards');
    let filtedItemArray =[];


    if((red.checked && white.checked && green.checked && black.checked && blue.checked) || (s.checked && l.checked && m.checked && xl.checked) || (range.value >4 && range.value <= 5) || (_0to25.checked && _25to50.checked && _50to100.checked && _100onwards.checked) ){
        let allChecked = products.map((item)=>{
            return item;
        });
        filtedItemArray.push(allChecked);
    }
    else{  
    if(red.checked && white.checked && green.checked && black.checked && blue.checked){
        let colorsChecked = products.map((item)=> item);
        filtedItemArray.push(colorsChecked);
    }
    else{
        if(red.checked){

            let redItemArray = products.filter((value)=>{
                for(let i = 0; i<value.colors.length;i++){
                    if(value.colors[i] == 'red'){
                        return value;
                    }
                }
                
            })
            filtedItemArray.push(redItemArray);    
        }
    
        if(blue.checked){
    
            let blueItemArray = products.filter((value)=>{
                for(let i = 0; i<value.colors.length;i++){
                    if(value.colors[i] == 'blue'){
                        return value;
                    }
                }
                
            })
            filtedItemArray.push(blueItemArray);    
        }
    
        if(white.checked){
    
            let whiteItemArray = products.filter((value)=>{
                for(let i = 0; i<value.colors.length;i++){
                    if(value.colors[i] == 'white'){
                        return value;
                    }
                }
                
            })
            filtedItemArray.push(whiteItemArray);    
        }
    
        
        if(black.checked){
    
            let blackItemArray = products.filter((value)=>{
                for(let i = 0; i<value.colors.length;i++){
                    if(value.colors[i] == 'black'){
                        return value;
                    }
                }
                
            })
            filtedItemArray.push(blackItemArray);    
        }
        
        
        if(green.checked){
    
            let greenItemArray = products.filter((value)=>{
                for(let i = 0; i<value.colors.length;i++){
                    if(value.colors[i] == 'green'){
                        return value;
                    }
                }
                
            })
            filtedItemArray.push(greenItemArray);   
        }
    }


    if(s.checked && l.checked && m.checked && xl.checked){
        let allSizes = products.map((value)=> value);
        filtedItemArray.push(allSizes);
    }
    else{
        if(s.checked){
            let sItemArray = products.filter((value)=>{
                for(let i = 0; i<value.sizes.length;i++){
                    if(value.sizes[i] == 's'){
                        return value;
                    }
                }
                
            })
            filtedItemArray.push(sItemArray);   
        }
        if(l.checked){
            let lItemArray = products.filter((value)=>{
                for(let i = 0; i<value.sizes.length;i++){
                    if(value.sizes[i] == 'l'){
                        return value;
                    }
                }
                
            })
            filtedItemArray.push(lItemArray);   
        }
        if(m.checked || xl.checked){
            let mItemArray = products.filter((value)=>{
                for(let i = 0; i<value.sizes.length;i++){
                    if(value.sizes[i] == 'm'){
                        return value;
                    }
                }
                
            })
            filtedItemArray.push(mItemArray);   
        }
    }

    if(range.value > 0 && range.value<=1){
        let range0 = products.filter((item)=>{
            if(item.rating.rate <=1){
                return item;
            }
        })
        filtedItemArray.push(range0);
    }
    if(range.value > 1 && range.value<=2){
        let range0 = products.filter((item)=>{
            if(item.rating.rate <=2){
                return item;
            }
        })
        filtedItemArray.push(range0);
    }
    if(range.value > 2 && range.value<=3){
        let range0 = products.filter((item)=>{
            if(item.rating.rate <=3){
                return item;
            }
        })
        filtedItemArray.push(range0);
    }
    if(range.value > 3 && range.value<=4){
        let range0 = products.filter((item)=>{
            if(item.rating.rate <=4){
                return item;
            }
        })
        filtedItemArray.push(range0);
    }
    if(range.value > 4 && range.value<=5){
        let range0 = products.filter((item)=>{
            if(item.rating.rate <=5){
                return item;
            }
        })
        filtedItemArray.push(range0);
    }


    if(_0to25.checked && _25to50.checked && _50to100.checked && _100onwards.checked){
        let allPrices = products.map((item)=> item);
        filtedItemArray.push(allPrices);
    }
    else{

        if(_0to25.checked){
            let price = products.filter((item)=>{
                if(item.price > 0 && item.price <=25){
                    return item;
                }
            })
            filtedItemArray.push(price);
        }
        if(_25to50.checked){
            let price = products.filter((item)=>{
                if(item.price > 25 && item.price <=50){
                    return item;
                }
            })
            filtedItemArray.push(price);
        }
        if(_50to100.checked){
            let price = products.filter((item)=>{
                if(item.price > 50 && item.price <=100){
                    return item;
                }
            })
            filtedItemArray.push(price);
        }
        if(_100onwards.checked){
            let price = products.filter((item)=>{
                if(item.price > 100){
                    return item;
                }
            })
            filtedItemArray.push(price);
        }


    }
    }

    console.log(filtedItemArray)

    filtedItemArray.forEach((value)=>{
        value.forEach((item)=>{
            let itemDiv = document.createElement('div');
            itemDiv.className = 'items items-filtered';
            itemDiv.dataset.id = item.id;
            let colorElement = document.createElement('div');
            colorElement.className = 'color-item';
            colorElement.innerHTML = "Colors : "
            let colorDiv = item.colors;
            colorDiv.forEach((clr)=>{
                let clrSpan = document.createElement('span');
                clrSpan.style.backgroundColor = clr;
                colorElement.appendChild(clrSpan);
            })
            itemDiv.innerHTML = `
                        <div class="img-item"><img src="${item.image}" alt="ss" width="100%" height="100%"></div>
                        <div class="price-item">
                                <span>$${item.price}</span>
                                <span>${item.sizes}</span>
                        </div>
                        ${colorElement.outerHTML}
                        <div class="ratings-item">Ratings : <span>${item.rating.rate}</span></div>
                        <div class="add-item"><button onclick="addedFunction(event)">Add to cart</button></div>
                        </div>
            `;
            document.querySelector('.filtered-items').appendChild(itemDiv);
        })
    })
});

// filtered items
    // checkbox



 