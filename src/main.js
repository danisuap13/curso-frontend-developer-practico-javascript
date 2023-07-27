const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const menuHamIcon = document.querySelector('.menu');
const menuCarritoIcon = document.querySelector('.navbar-shopping-cart');
const productDetailCloseIcon = document.querySelector('.product-detail-secondary-close')
const shoppingCartCloseIcon = document.querySelector('.title-container img');
const productInfoSecondary = document.querySelector('.product-info-secondary')
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
    productCard.setAttribute('onclick', `openProductDetailAside("${product.name}")`);
   
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

function renderSecondaryProductDetail(productName){
    let productDescription;
    for(item of filteredProductList){
        if(item.name === productName){
            productDescription = item;
        }
    }
    console.log(productDescription.image)
    const productImage = document.createElement('img');
    productImage.setAttribute('src', productDescription.image);
    /* productDetailContainer.append(productImage); */
    productDetailContainer.insertBefore(productImage, productInfoSecondary)
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
    price: 30,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
});
productList.push ({
    category: 'electronics', name: 'Screen',
    price: 120,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
});
productList.push ({
    category: 'electronics', name: 'Computer',
    price: 300,
    image: "https://media.istockphoto.com/id/1389603578/es/foto/pantalla-en-blanco-de-la-computadora-port%C3%A1til-en-la-mesa-de-madera-con-fondo-interior-de.jpg?s=612x612&w=is&k=20&c=It8bdNPAR-pIBEzDvWO4WwDpV9ptcjDGde2nTvl4b6g=",
});
productList.push ({
    category: 'toys', name: 'Skate',
    price: 20,
    image: "https://media.istockphoto.com/id/500062008/es/foto/ni%C3%B1o-sentado-en-la-rampa-hacia-abajo-en-monopat%C3%ADn.jpg?s=612x612&w=is&k=20&c=-LTCYPfTPQnrqrFq8KuH7o2Po3SpHg1oD1gI8sFrYfw=",
});
productList.push ({
    category: 'clothes', name: 'Jacket',
    price: 20,
    image: "https://media.istockphoto.com/id/500062008/es/foto/ni%C3%B1o-sentado-en-la-rampa-hacia-abajo-en-monopat%C3%ADn.jpg?s=612x612&w=is&k=20&c=-LTCYPfTPQnrqrFq8KuH7o2Po3SpHg1oD1gI8sFrYfw=",
});
productList.push ({
    category: 'furnitures', name: 'Sofa',
    price: 20,
    image: "https://media.istockphoto.com/id/500062008/es/foto/ni%C3%B1o-sentado-en-la-rampa-hacia-abajo-en-monopat%C3%ADn.jpg?s=612x612&w=is&k=20&c=-LTCYPfTPQnrqrFq8KuH7o2Po3SpHg1oD1gI8sFrYfw=",
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

