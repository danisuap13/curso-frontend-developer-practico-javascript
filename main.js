const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const menuHamIcon = document.querySelector('.menu');
const menuCarritoIcon = document.querySelector('.navbar-shopping-cart');
const mobileMenu = document.querySelector('.mobile-menu');
const shoppingCart = document.querySelector('.product-detail');
const cardsContainer = document.querySelector('.cards-container');

menuEmail.addEventListener('click', toggleDesktopMenu);
menuHamIcon.addEventListener('click',toggleMobileMenu );
menuCarritoIcon.addEventListener('click', toggleCarritoMenu);

function toggleDesktopMenu(){
    const isShoppingCartClosed = !shoppingCart.classList.contains('inactive');
    if(isShoppingCartClosed) shoppingCart.classList.add('inactive');
    desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu(){
    const isShoppingCartClosed = !shoppingCart.classList.contains('inactive');
    if(isShoppingCartClosed) shoppingCart.classList.add('inactive');
    mobileMenu.classList.toggle('inactive');
}

function toggleCarritoMenu(){
    const isMobileMenuClosed = !mobileMenu.classList.contains('inactive');
    const isDesktopMenuClosed = !desktopMenu.classList.contains('inactive');
    if(isMobileMenuClosed) mobileMenu.classList.add('inactive');
    if(isDesktopMenuClosed) desktopMenu.classList.add('inactive');
    shoppingCart.classList.toggle('inactive');
}

const productList = [];
productList.push ({
    name: 'Bike',
    price: 120,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
});
productList.push ({
    name: 'Screen',
    price: 120,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
});
productList.push ({
    name: 'Compu',
    price: 300,
    image: "https://media.istockphoto.com/id/1389603578/es/foto/pantalla-en-blanco-de-la-computadora-port%C3%A1til-en-la-mesa-de-madera-con-fondo-interior-de.jpg?s=612x612&w=is&k=20&c=It8bdNPAR-pIBEzDvWO4WwDpV9ptcjDGde2nTvl4b6g=",
});
productList.push ({
    name: 'Skate',
    price: 20,
    image: "https://media.istockphoto.com/id/500062008/es/foto/ni%C3%B1o-sentado-en-la-rampa-hacia-abajo-en-monopat%C3%ADn.jpg?s=612x612&w=is&k=20&c=-LTCYPfTPQnrqrFq8KuH7o2Po3SpHg1oD1gI8sFrYfw=",
});

function renderProducts(arr){
    
    for(product of productList){
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const img = document.createElement('img');
    img.setAttribute('src', product.image);
    
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
    
    productCard.append(img, productInfo);
    productInfo.append(productInfoDiv,productInfoFigure);
    productInfoFigure.append(productImgCart);
    productInfoDiv.append(productPrice, productName);
    cardsContainer.appendChild(productCard);
    }   
}

renderProducts(productList);