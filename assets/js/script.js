// Strict mode
// Modo estrito
"use strict";

// Creating products array
// Criando array de produtos
const productsArray = [
    {
        id: 1,
        src: "assets/images/cpu-01.jpg",
        name: "CPU - Ryzen",
        price: 120,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 2,
        src: "assets/images/graphic-card-01.jpg",
        name: "Graphic Card",
        price: 200,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 3,
        src: "assets/images/headphone-01.jpg",
        name: "Headphone",
        price: 50,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 4,
        src: "assets/images/keyboard-01.jpg",
        name: "Keyboard",
        price: 40,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 5,
        src: "assets/images/monitor-01.jpg",
        name: "Monitor",
        price: 200,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 6,
        src: "assets/images/mouse-01.jpg",
        name: "Mouse",
        price: 30,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 7,
        src: "assets/images/cpu-02.jpg",
        name: "CPU - Ryzen",
        price: 120,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 8,
        src: "assets/images/graphic-card-02.jpg",
        name: "Graphic Card",
        price: 200,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 9,
        src: "assets/images/headphone-02.jpg",
        name: "Headphone",
        price: 50,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 10,
        src: "assets/images/keyboard-02.jpg",
        name: "Keyboard",
        price: 40,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 11,
        src: "assets/images/monitor-02.jpg",
        name: "Monitor",
        price: 200,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
    {
        id: 12,
        src: "assets/images/mouse-02.jpg",
        name: "Mouse",
        price: 30,
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit."
    },
];

// Selecting elements
// Selecionando elementos
const favoriteBtn = document.querySelector(".header .icons-box .fa-heart");
const counterElement = document.querySelector(".header .icons-box .counter");
const productBox = document.querySelector(".header .product-cart .product-box");
const cartText = document.querySelector(".header .product-cart .cart-text");
const checkElement = document.querySelector(".header .product-cart .check");
const totalElement = document.querySelector(".header .product-cart .check .total");
const favoritesContent = document.querySelector(".header .favorites-products");
const favoritesText = document.querySelector(".header .favorites-products .favorites-text");
const favoritesBox = document.querySelector(".header .favorites-products .favorites-box");
const inputElement = document.querySelector(".home .input-field input");
const filterButton = document.querySelector(".home .input-field button");
const homeContent = document.querySelector(".home .home-content");

// Variable for product list starting with empty array
// Variável para lista de produtos iniciando com array vazio
let productsList = [];

// Variable for favorites list starting with empty array
// Variável para lista de favoritos iniciando com array vazio
let favoritesList = [];

// Variable for product cart starting with empty array
// Variável para o carrinho de produtos iniciando com array vazio
let productsCart = [];

let favoriteListAlternated = [];

// Function to display products in the page
// função para exibir os produtos na página
function loadProductsInDocument() {
    productsList = productsArray;
    homeContent.innerHTML = "";

    if(productsList.length > 0) {
        productsList.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("box");
            productCard.dataset.id = product.id;
            productCard.dataset.name = product.name;
            productCard.innerHTML = `
            <img src="${product.src}" alt="${product.name}">
            <h3>${product.name}</h3>
            <h4>$${product.price}</h4>
            <p>${product.description}</p>
            <i class="fa fa-heart"></i>
            <button type="button" class="add-btn">Add to cart</button>`;
            homeContent.appendChild(productCard);
        });
    }
}
loadProductsInDocument();

// Selecting the add to cart buttons and assigning a function
// Selecionando os botões de adicionar ao carrinho e atribuindo uma funcão
homeContent.addEventListener("click", function(event) {
    const element = event.target;
    
    if(element.classList.contains("add-btn")) {
        const productId = element.parentElement.dataset.id;
        addToCart(productId);
    }
    else if(element.classList.contains("fa-heart")) {
        const productId =  element.parentElement.dataset.id;
        addToFavorites(productId);
        changeFavoriteIconColor(productId, element);
    }
});

// Function to add to cart
// Função para adicionar ao carrinho
function addToCart(productId) {
    const positionId = productsCart.findIndex((value) => value.productId == productId);

    if(positionId < 0) {
        productsCart.push({
            productId: productId,
            quantity: 1
        });
    }
    loadProductsInCart();
    addCartInMemory();
}

// Function to display products in the cart
// Função para exibir produtos no carrinho
function loadProductsInCart() {
    productBox.innerHTML = "";
    let total = 0;
    
    if(productsCart.length === 0) {
        cartText.textContent = "No products";
        checkElement.style.display = "none";
    }
    else if(productsCart.length > 0) {
        productsCart.forEach((cart) => {
            const newCart = document.createElement("div");
            newCart.classList.add("box");
            newCart.dataset.id = cart.productId;
            let positionId = productsList.findIndex((value) => value.id == cart.productId);
            let info = productsList[positionId];
            newCart.innerHTML = `
            <div class="info">
                <img src="${info.src}" alt="${info.name}">
                <div>
                    <h4>${info.name}</h4>
                    <h5>$${info.price * cart.quantity}</h5>
                </div>
            </div>
            <div class="arrows">
                <i class="fa fa-arrow-left"></i>
                <span>${cart.quantity}</span>
                <i class="fa fa-arrow-right"></i>
            </div>
            <i class="fa fa-times"></i>`;
            
            if(cart.quantity === 1) {
                newCart.innerHTML = `
                <div class="info">
                    <img src="${info.src}" alt="${info.name}">
                    <div>
                        <h4>${info.name}</h4>
                        <h5>$${info.price * cart.quantity}</h5>
                    </div>
                </div>
                <div class="arrows">
                    <i class="fa fa-arrow-left disable"></i>
                    <span>${cart.quantity}</span>
                    <i class="fa fa-arrow-right"></i>
                </div>
                <i class="fa fa-times"></i>`;
            }
            else {
                newCart.innerHTML = `
                <div class="info">
                    <img src="${info.src}" alt="${info.name}">
                    <div>
                        <h4>${info.name}</h4>
                        <h5>$${info.price * cart.quantity}</h5>
                    </div>
                </div>
                <div class="arrows">
                    <i class="fa fa-arrow-left"></i>
                    <span>${cart.quantity}</span>
                    <i class="fa fa-arrow-right"></i>
                </div>
                <i class="fa fa-times"></i>`;
            }
            productBox.appendChild(newCart);
            total = (info.price * cart.quantity) + total;
            totalElement.textContent = "$" + total + ".00";
        });
        cartText.textContent = "Your cart";
        checkElement.style.display = "flex";
    }
    counterElement.textContent = productsCart.length;
}

// Selecting the add, remove and delete products buttons in the cart and assigning a function
// Selecionando os botões de adicionar, remover e excluir produto no carrinho e atribuindo uma função
productBox.addEventListener("click", function(event) {
    const element = event.target;

    if(element.classList.contains("fa-arrow-left") || element.classList.contains("fa-arrow-right")) {
        let productId = element.parentElement.parentElement.dataset.id;
        let type = "fa-arrow-left";
        if(element.classList.contains("fa-arrow-right")) {
            type = "fa-arrow-right";
        }
        changeQuantityProduct(productId, type);
    }
    else if(element.classList.contains("fa-times")) {
        let productId = element.parentElement.dataset.id;
        removeProductFromCart(productId);
    }
});

// Function to increase and decrease quantity of product in the cart
// Função para aumentar e diminuir quantidade de produto no carrinho
function changeQuantityProduct(productId, type) {
    const positionProductInCart = productsCart.findIndex((value) => value.productId == productId);

    if(positionProductInCart >= 0) {
        switch(type) {
            case "fa-arrow-right":
                productsCart[positionProductInCart].quantity = productsCart[positionProductInCart].quantity + 1;
                break;
            default:
                let valueChange = productsCart[positionProductInCart].quantity - 1;
                if(valueChange > 0) {
                    productsCart[positionProductInCart].quantity = valueChange;
                }
                break;
        }
    }
    loadProductsInCart();
    addCartInMemory();
}

// Function to remove product from cart
// Função para remover produto do carrinho
function removeProductFromCart(productId) {
    let positionProductId = productsCart.findIndex((value) => value.productId == productId);

    if(positionProductId >= 0) {
        productsCart.splice(positionProductId, 1);
    }
    loadProductsInCart();
    addCartInMemory();
}

// Function to add products from cart to local storage
// Função para adicionar produtos do carrinho ao armazenamento local
function addCartInMemory() {
    localStorage.setItem("cart", JSON.stringify(productsCart));
}

// Function for products to remain saved in the cart
// Função para que os produtos permaneçam salvos no carrinho
function saveProductInCart() {
    if(localStorage.getItem("cart")) {
        productsCart = JSON.parse(localStorage.getItem("cart"));
    }
    loadProductsInCart();
}
saveProductInCart();

// Function for add to favorites
// Função para adicionar aos favoritos
function addToFavorites(productId) {
    const positionId = favoritesList.findIndex((value) => value.productId == productId);

    if(positionId < 0) {
        favoritesList.push({productId: productId});
    }
    else {
        let positionId = favoritesList.findIndex((value) => value.productId == productId);
        if(positionId >= 0) {
            favoritesList.splice(positionId, 1);
        }
    }
    loadFavorites();
    addFavoritesInMemory();
}

// Function to display favorites
// Função para exibir favoritos
function loadFavorites() {
    favoritesBox.innerHTML = "";
    
    if(favoritesList.length === 0) {
        favoritesText.textContent = "No favorites";
    }   
    else if(favoritesList.length > 0) {
        favoritesList.forEach((favorite) => {
            const newFavorite = document.createElement("div");
            newFavorite.classList.add("box");
            newFavorite.dataset.id = favorite.productId;
            let productId = productsList.findIndex((value) => value.id == favorite.productId);
            let info = productsList[productId];
            newFavorite.innerHTML = `
            <div class="info">
                <img src="${info.src}" alt="${info.name}">
                <div>
                    <h4>${info.name}</h4>
                    <h5>$${info.price}</h5>
                </div>
            </div>
            <i class="fa fa-times"></i>`;
            favoritesBox.appendChild(newFavorite);
        });
        favoritesText.textContent = "Your favorites";
    }
}
loadFavorites();

// Selecting product delete buttons in favorites and assigning a function
// Selecionando os botões de excluir produto nos favoritos e atribuindo uma função
favoritesBox.addEventListener("click", function(event) {
    const element = event.target;

    if(element.classList.contains("fa-times")) {
        let positionId = element.parentElement.dataset.id;
        removeFavoriteProduct(positionId);
    }
});

// Function to remove product from favorites
// Função para remover produto dos favoritos
function removeFavoriteProduct(positionId) {
    const productFavoriteId = favoritesList.findIndex((value) => value.productId == positionId);

    if(productFavoriteId >= 0) {
        favoritesList.splice(productFavoriteId, 1);
    }
    loadFavorites();
    addFavoritesInMemory();
}

// Function to add favorite products to local storage
// Função para adicionar produtos favoritos ao armazenamento local
function addFavoritesInMemory() {
    localStorage.setItem("favorites", JSON.stringify(favoritesList));
}

// Function so that favorite products remain saved in the document
// Função para que os produtos favoritos permaneçam salvos no documento
function saveFavoritesInDocument() {
    if(localStorage.getItem("favorites")) {
        favoritesList = JSON.parse(localStorage.getItem("favorites"));
    }
    loadFavorites();
}
saveFavoritesInDocument();

// Function to change color of the favorite icon productId
// Função para alterar a cor do ícone de favoritos
function changeFavoriteIconColor(positionId, element) {
    const positionFavoriteId = favoritesList.findIndex((value) => value.productId == positionId);

    if(positionFavoriteId < 0) {
        element.classList.remove("favorite");
    }
    else if(positionFavoriteId >= 0) {
        element.classList.add("favorite");
    }
}

// Selecting elements
// Selecionando elementos
const cartIcon = document.querySelector(".header .icons-box .fa-shopping-cart");
const cartBox = document.querySelector(".header .product-cart");
const cards = document.querySelectorAll(".home .home-content .box");

// Display products
// Exibir produtos
cards.forEach((card) => card.classList.remove("hide"));

// Filter products pressing the ENTER key
// Filtrar produtos pressionando a tecla ENTER
inputElement.addEventListener("keydown", function(event) {
    if(event.code === "Enter") {
        filterProducts();
    }
});

// Display products if input field is empty
// Exibir produtos se o campo de entrada estiver vazio
inputElement.addEventListener("input", function() {
    if(!inputElement.value) {
        cards.forEach((card) => card.classList.remove("hide"));
    }
});

// Function to filter product by name
// Função para filtrar produtos por nome
function filterProducts() {
    if(inputElement.value) {
        cards.forEach((card) => {
            let dataName =card.getAttribute("data-name").toLowerCase();
            if(dataName.includes(inputElement.value.toLowerCase())) {
                card.classList.remove("hide");
            }
            else {
                card.classList.add("hide");
            }
        });
    }
}

// Function to toggle between showing and hiding the cart
// Função para alternar entre mostar e ocultar o carrinho
function toggleCart() {
    cartBox.classList.toggle("open");
    favoritesContent.classList.remove("open");
}

// Function to toggle between showing and hiding favorites
// Função para alternar entre mostrar e ocultar favoritos
function toggleFavorites() {
    favoritesContent.classList.toggle("open");
    cartBox.classList.remove("open");
}

// Adding events
// Adicionando eventos
favoriteBtn.addEventListener("click", toggleFavorites);
cartIcon.addEventListener("click", toggleCart);
filterButton.addEventListener("click", filterProducts);