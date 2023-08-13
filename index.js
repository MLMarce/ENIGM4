import data from '/data.json' assert {type: 'json'};
const datos = data;

const remeras = datos[0];
const camperas = datos[1];
const pantalones = datos[2];
const ropaInterior = datos[3];
const calzados = datos[4];
const accesorios = datos[5];

const xIcon = document.querySelector('#x-icon');
const barsIcon = document.querySelector('#bars-icon');
const menuMobile = document.querySelector('.menu-mobile');
const headerMobile = document.querySelector('.header-mobile');
const inputSearch = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');
const principalSection = document.querySelector('.principal-section');
const menuCategoriesMobile = document.querySelector('#categories');
const menuCategoriesDesktop = document.querySelector('#categories-desktop');
const menuInicioMobile = document.querySelector('#inicio');
const menuInicioDesktop = document.querySelector('#inicio-desktop');
const menuPoliticaCambiosMobile = document.querySelector('#politica-cambios');
const menuPoliticaCambiosDesktop = document.querySelector('#politica-cambios-desktop');
const menuCuidadoPrendasMobile = document.querySelector('#cuidado-prendas');
const menuCuidadoPrendasDesktop = document.querySelector('#cuidado-prendas-desktop');
const menuEnvioMobile = document.querySelector('#envio');
const menuEnvioDesktop = document.querySelector('#envio-desktop');
const menuterminosMobile = document.querySelector('#terminos');
const menuterminosDesktop = document.querySelector('#terminos-desktop');

// listeners del menu lateral en mobile 
barsIcon.addEventListener('click', abrirAside);
xIcon.addEventListener('click', cerrarAside);
btnSearch.addEventListener('click', buscar);
menuCategoriesMobile.addEventListener('click', crearCategorias);
menuCategoriesMobile.addEventListener('click', cerrarAside);
menuInicioMobile.addEventListener('click', crearTodosLosProductos);
menuInicioMobile.addEventListener('click', cerrarAside);

//listeners del menu escritorio
menuInicioDesktop.addEventListener('click', crearTodosLosProductos);
menuCategoriesDesktop.addEventListener('click', crearCategorias);

function cerrarAside() {
    menuMobile.classList.add("inactive");
    principalSection.classList.remove('inactive');
    headerMobile.classList.remove('inactive');
}

function abrirAside() {
    menuMobile.classList.remove('inactive');
    principalSection.classList.add('inactive');
    headerMobile.classList.add('inactive');
}

function buscar() { //renombrar y mejorar para que se pueda buscar cualquier producto.
    let valorInput = inputSearch.value;
    console.log(valorInput);
    let categoria;
    principalSection.innerHTML = '';

    //obteniendo lista de categorias y cantidad de productos
    if(valorInput == "categorias" || valorInput == "Categoria") {
        crearCategorias();
        cerrarAside()
    } else {
        for(let dato of datos) {
            let i = 0;
            categoria = dato.categoryName;
            let producto = dato.productos;
            console.log(producto)
            if(categoria.includes(valorInput)) {
                crearProductos(dato);//crear esta funcion para renderizar los productos de dicha categoria
                cerrarAside();
            } else if(producto[i].name.includes(valorInput) && i < producto.length) {
                crearProductos(dato);
                i++;
                cerrarAside()
            }
        }
    }


    

    
}

//renderizando dinamicamente las categorias en la seccion principal
function crearCategorias() {
    principalSection.innerHTML = '';
    for(let dato of datos) {
        principalSection.innerHTML += `
        <div class="categories" id="categories">
            <img src="${dato.img}" alt="${dato.categoryName}" title="${dato.categoryName}" class="categories__img">
            <p class="categories__name" id='${dato.categoryName}'>${dato.categoryName}</p>
        </div>
        `;
    }

    //accediendo a los productos de cada categoria al darles click
    const btnRemeras = document.querySelector('#Remeras');
    btnRemeras.addEventListener('click', crearRemeras);
    const btnCamperas = document.querySelector('#Camperas');
    btnCamperas.addEventListener('click', crearCamperas);
    const btnPantalones = document.querySelector('#Pantalones');
    btnPantalones.addEventListener('click', crearPantalones)
    const btnRopaInterior = document.querySelector('#RopaInterior');
    btnRopaInterior.innerText = 'Ropa Interior';
    btnRopaInterior.addEventListener('click', crearRopaInterior);
    const btnCalzados = document.querySelector('#Calzados');
    btnCalzados.addEventListener('click', crearCalzados);
    const btnAccesorios = document.querySelector('#Accesorios');
    btnAccesorios.addEventListener('click', crearAccesorios);

}

//renderizando dinamicamente los productos de una categoria

function crearProductos(categoria) {
    let productos = categoria.productos;
    console.log(productos);
    
    for(let producto of productos) {
        console.log(producto);
        principalSection.innerHTML += `
            <div class="product-list">
                <img class="product-list__img" src="${producto.img}" alt="${producto.img}">
                <div class="product-list__data">
                    <h4 class="product-list__name">${producto.name}</h4>
                    <p class="product-list__price"><span class="product-card__span">Precio:</span> $${producto.price}</p>
                    <p class="product-list__talle"><span class="product-card__span span-talle">Talle:</span> ${producto.talle}</p>
                    <p class="product-list__description"><span class="product-card__span">Descripcion:</span> ${producto.description}.</p>
                </div>
            </div>
        `;
        const productList = document.querySelectorAll('.product-list');
        productList.forEach(element => {
            element.addEventListener('click', agrandarProducto);
        });;
    }
}

//renderizar todos los productos de la tienda
function crearTodosLosProductos() {
    principalSection.innerHTML = '';
    let categoryList = [remeras, camperas, pantalones, ropaInterior, calzados, accesorios];

    for( let category of categoryList) {
        crearProductos(category);
    }
}

//funciones para crear cada categoria por separado
function crearRemeras() {
    principalSection.innerHTML = '';
    crearProductos(remeras);
}
function crearCamperas() {
    principalSection.innerHTML = '';
    crearProductos(camperas);
}
function crearPantalones() {
    principalSection.innerHTML = '';
    crearProductos(pantalones);
}
function crearRopaInterior() {
    principalSection.innerHTML = '';
    crearProductos(ropaInterior);
}
function crearCalzados() {
    principalSection.innerHTML = '';
    crearProductos(calzados);
}
function crearAccesorios() {
    principalSection.innerHTML = '';
    crearProductos(accesorios);
}

//funcion para mostrar en grande el producto seleccionado
function agrandarProducto() {
    const spanPrice = document.createElement('product-card__span');
    spanPrice.innerText = '$5553';
    const spanTalle = document.createElement('product-card__span');
    spanTalle.innerText = '32';
    const spanDescription = document.createElement('product-card__span');
    spanDescription.innerText = 'Descripción del producto';
    const productCardDescription = document.createElement('p');
    productCardDescription.classList.add('product-card__description');
    productCardDescription.innerText = 'Descripción: ';
    productCardDescription.appendChild(spanDescription);
    const productCardTalle = document.createElement('p');
    productCardTalle.classList.add('product-card__talle');
    productCardTalle.innerText = 'Talle: ';
    productCardTalle.appendChild(spanTalle);
    const productCardPrice = document.createElement('p');
    productCardPrice.appendChild(spanPrice);
    productCardPrice.classList.add('product-card__price');
    productCardPrice.innerText = 'Precio: ';
    productCardPrice.appendChild(spanPrice);
    const productCardName = document.createElement('h4');
    productCardName.classList.add('product-card__name');
    productCardName.innerText = 'Remera';
    const productCardData = document.createElement('div');
    productCardData.classList.add('product-card__data');
    productCardData.appendChild(productCardName)
    productCardData.appendChild(productCardPrice)
    productCardData.appendChild(productCardTalle)
    productCardData.appendChild(productCardDescription);
    const productCardImg = document.createElement('img');
    productCardImg.classList.add('product-card__img');
    productCardImg.setAttribute('src', '/img/pantalondragon.jpg')
    const xIconProduct = document.createElement('i');
    xIconProduct.classList.add('fa-solid');
    xIconProduct.classList.add('fa-x');
    xIconProduct.classList.add('fa-xm');
    xIconProduct.classList.add('product-card__close');
    xIconProduct.addEventListener('click', () => {
        principalSection.removeChild(productBacground);
    })
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.appendChild(xIconProduct);
    productCard.appendChild(productCardImg);
    productCard.appendChild(productCardData);
    const productBacground = document.createElement('div');
    productBacground.classList.add('product-background');
    productBacground.appendChild(productCard);

    principalSection.appendChild(productBacground);
}


