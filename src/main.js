const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const menuHamIcon = document.querySelector('.menu');
const menuCarritoIcon = document.querySelector('.navbar-shopping-cart');
const productDetailCloseIcon = document.querySelector('.product-detail-secondary-close')
const shoppingCartCloseIcon = document.querySelector('.title-container img');
const productInfoSecondary = document.querySelector('.product-info-secondary');
const mobileMenu = document.querySelector('.mobile-menu');
const shoppingCart = document.querySelector('.product-detail');
const productDetailContainer = document.querySelector('.product-detail-secondary');
const mainContainer = document.querySelector('.main-container');
const cardsContainer = document.querySelector('.cards-container');
const categoryAll = document.getElementById('all');
const categoryClothes = document.getElementById('clothes');
const categoryElectronics = document.getElementById('electronics');
const categoryFurnitures = document.getElementById('furnitures');
const categoryOthers = document.getElementById('others');
const categoryToys = document.getElementById('toys');
const myOrderContent = document.querySelector('.my-order-content')
const order = document.querySelector('.order')
const addToCartSecondary = document.querySelector('#add-to-cart-secondary-button')



menuEmail.addEventListener('click', toggleDesktopMenu);
menuHamIcon.addEventListener('click',toggleMobileMenu );
menuCarritoIcon.addEventListener('click', toggleCarritoMenu);
productDetailCloseIcon.addEventListener('click',closeProductDetailAside);
shoppingCartCloseIcon.addEventListener('click', closeShoppingCart);


function toggleDesktopMenu(){
    const isShoppingCartClosed = !shoppingCart.classList.contains('inactive');
    if(isShoppingCartClosed) shoppingCart.classList.add('inactive');
    desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu(){
    const isShoppingCartClosed = !shoppingCart.classList.contains('inactive');
    if(isShoppingCartClosed) shoppingCart.classList.add('inactive');
    mobileMenu.classList.toggle('inactive');
    closeProductDetailAside();
}

function toggleCarritoMenu(){
    const isMobileMenuClosed = !mobileMenu.classList.contains('inactive');
    const isDesktopMenuClosed = !desktopMenu.classList.contains('inactive');
    const isProductDetailAsideClosed = !productDetailContainer.classList.contains('inactive');
    if(isMobileMenuClosed) mobileMenu.classList.add('inactive');
    if(isDesktopMenuClosed) desktopMenu.classList.add('inactive');
    if(isProductDetailAsideClosed) productDetailContainer.classList.add('inactive');
    shoppingCart.classList.toggle('inactive');    
}

function renderProducts(arr){

    for(product of arr){
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
        
    const img = document.createElement('img');
    img.setAttribute('src', product.image);
    img.setAttribute('onclick', `openProductDetailAside("${product.name}")`);
   
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    
    const productInfoDiv = document.createElement('div');
    
    const productPrice = document.createElement('p');
    productPrice.innerText = '$' + product.price;
    
    const productName = document.createElement('p');
    productName.innerText = product.name;
    
    const productInfoFigure = document.createElement('figure');
    const productImgCart = document.createElement('img');
    productImgCart.setAttribute('src','./icons/bt_add_to_cart.svg');
    productImgCart.setAttribute('onclick', `addItemToCart("${product.name}")`)
    
    
    productCard.append(img, productInfo);
    productInfo.append(productInfoDiv,productInfoFigure);
    productInfoFigure.append(productImgCart);
    productInfoDiv.append(productPrice, productName);
    cardsContainer.appendChild(productCard);
   
    }   
}

let totalShoppingCart = [];

function addItemToCart(productName){
    let productDescriptionObject;
    for(item of filteredProductList){
        if(item.name === productName){
            productDescriptionObject = item;
        }
    }
    
    const shoppingCartProduct = document.createElement('div');
    shoppingCartProduct.classList.add('shopping-cart');

    const shoppingCartProductFigure = document.createElement('figure');
        const shoppingCartProductImg = document.createElement('img');
        shoppingCartProductImg.setAttribute('src', productDescriptionObject.image)
        shoppingCartProductImg.setAttribute('alt', productDescriptionObject.name)

    const shoppingCartName = document.createElement('p');
    shoppingCartName.innerText = productDescriptionObject.name;
    const shoppingCartPrice = document.createElement('p');
    shoppingCartPrice.innerText = `$${productDescriptionObject.price},00`;

    const shoppingCartDelete = document.createElement('img')
    shoppingCartDelete.setAttribute('src', './icons/icon_close.png')
    shoppingCartDelete.setAttribute('onclick', `deleteShoppingCartItem("${productDescriptionObject.name}")`)

    myOrderContent.appendChild(shoppingCartProduct)
    shoppingCartProductFigure.appendChild(shoppingCartProductImg)
    shoppingCartProduct.appendChild(shoppingCartProductFigure)
    shoppingCartProduct.appendChild(shoppingCartName)
    shoppingCartProduct.appendChild(shoppingCartPrice)
    shoppingCartProduct.appendChild(shoppingCartDelete)

    totalShoppingCart.push(productDescriptionObject.price)
    totalRefreshShoppingCart();
    refreshShoppingCartIcon();
}

function totalRefreshShoppingCart(){
    const shoppingCartTotalContainer = document.querySelector('#total')
    const total = totalShoppingCart.reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0)
    const displayTotal = document.createElement('p');
    displayTotal.setAttribute('id', 'total')
    displayTotal.innerText = `$${total},00`
    order.replaceChild(displayTotal, shoppingCartTotalContainer);
}

function refreshShoppingCartIcon(){
    
    const shoppingCartCounterContainer = document.querySelector('.navbar-shopping-cart')
    const shoppingCartCounter = document.querySelector('.navbar-shopping-cart div');
    const totalItems = `${totalShoppingCart.length}`;
    const totalItemsIcon = document.createElement('div');
    totalItemsIcon.innerText = totalItems;
    shoppingCartCounterContainer.replaceChild(totalItemsIcon, shoppingCartCounter)
    totalItemsIcon.setAttribute = ('id', 'shopping-cart-counter')
}

function deleteShoppingCartItem(productName){
    const elementToDelete = document.querySelectorAll('.shopping-cart');
    const arrayElementToDelete = [...elementToDelete];
    const newArray = arrayElementToDelete.map(element => [... element.childNodes]);
    console.log(newArray)
    const eliminar = newArray.findIndex(element => element[1].textContent === productName);
    arrayElementToDelete[eliminar].remove();
    totalShoppingCart.splice(eliminar, 1);
    totalRefreshShoppingCart();
    refreshShoppingCartIcon();
}

function renderSecondaryProductDetail(productName){
    const imgSecondary = document.querySelector('.product-detail-secondary > img:nth-child(2)');
    const secondaryPrice = document.querySelector('#secondary-price');
    const secondaryName = document.querySelector('#secondary-name');
    const secondaryDescription = document.querySelector('#secondary-description');

    let productDescription;
    for(item of filteredProductList){
        if(item.name === productName){
            productDescription = item;
        }
    }
    const productImageSecondary = document.createElement('img');
    productImageSecondary.setAttribute('src', productDescription.image);
    productImageSecondary.setAttribute('alt', `${productDescription.name}`);

    const productPriceSecondary = document.createElement('p');
    productPriceSecondary.setAttribute('id', 'secondary-price');
    productPriceSecondary.innerText = `$${productDescription.price}`;
    
    const productNameSecondary = document.createElement('p');
    productNameSecondary.setAttribute('id', 'secondary-name');
    productNameSecondary.innerText = productDescription.name;

    const productDescriptionSecondary = document.createElement('p')
    productDescriptionSecondary.setAttribute('id', 'secondary-description')
    productDescriptionSecondary.innerText = `With its practical position, this ${productDescription.name.toLowerCase()} also fulfills a decorative function, add your hall or workspace.`;

    productDetailContainer.replaceChild(productImageSecondary, imgSecondary);
    productInfoSecondary.replaceChild(productPriceSecondary, secondaryPrice);
    productInfoSecondary.replaceChild(productNameSecondary, secondaryName);
    productInfoSecondary.replaceChild(productDescriptionSecondary, secondaryDescription);

    addToCartSecondary.setAttribute('onclick', `addItemToCart("${productDescription.name}")`)

}

function openProductDetailAside(name){
    const isShoppingCartClosed = !shoppingCart.classList.contains('inactive');
    if(isShoppingCartClosed) shoppingCart.classList.add('inactive');
    productDetailContainer.classList.remove('inactive');
    renderSecondaryProductDetail(name);
}

function closeProductDetailAside(){
    productDetailContainer.classList.add('inactive');
}

function closeShoppingCart(){
    shoppingCart.classList.add('inactive');
}

const productList = [];
productList.push ({
    category: 'toys', name: 'Bike',
    price: 130,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
});
productList.push ({
    category: 'electronics', name: 'Screen',
    price: 120,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
});
productList.push ({
    category: 'electronics', name: 'Portatil',
    price: 300,
    image: "https://images.pexels.com/photos/4058226/pexels-photo-4058226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
});
productList.push ({
    category: 'toys', name: 'Skate',
    price: 20,
    image: "https://images.pexels.com/photos/1373085/pexels-photo-1373085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
});
productList.push ({
    category: 'clothes', name: 'Jacket',
    price: 50,
    image: "https://images.pexels.com/photos/887898/pexels-photo-887898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
});
productList.push ({
    category: 'furnitures', name: 'Sofa',
    price: 280,
    image: "https://images.pexels.com/photos/3965534/pexels-photo-3965534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
});
productList.push ({
    category: 'others', name: 'Piano',
    price: 500,
    image: "https://images.pexels.com/photos/1021142/pexels-photo-1021142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
});

renderProducts(productList)

let filteredProductList = [...productList];
const filterProductList = (categoria) => {
    if(categoria == 'all' ){
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
        return renderProducts(productList);
    }
        filteredProductList = productList.filter((product) => product.category.includes(categoria));
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
        renderProducts(filteredProductList); 
    };

const filterProductListMobile = (categoria) => {
    mobileMenu.classList.toggle('inactive');
    filterProductList(categoria);
}

