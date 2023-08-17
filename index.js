import data from '/data.json' assert {type: 'json'};
const datos = data;

const remeras = datos[0];
const camperas = datos[1];
const pantalones = datos[2];
const ropaInterior = datos[3];
const calzados = datos[4];
const accesorios = datos[5];
const categoryList = [remeras, camperas, pantalones, ropaInterior, calzados, accesorios];

const xIconAside = document.querySelector('#x-icon');
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
xIconAside.addEventListener('click', cerrarAside);
btnSearch.addEventListener('click', buscar);
menuCategoriesMobile.addEventListener('click', function () {
    crearCategorias();
    cerrarAside();
});
menuInicioMobile.addEventListener('click', crearTodosLosProductos);
menuInicioMobile.addEventListener('click', cerrarAside);

//listeners del menu escritorio
menuInicioDesktop.addEventListener('click', crearTodosLosProductos);
menuCategoriesDesktop.addEventListener('click', crearCategorias);

//abriendo los productos de las diferentes categorias
principalSection.addEventListener('click',  (event) => {
    if(event.target.classList.contains('categories__name')) {
        const categoryNameblock = event.target.id;
        for(let category of categoryList) {
            if(category.categoryName == categoryNameblock) {
                principalSection.innerHTML = '';
                crearProductos(category);
                principalSection.addEventListener('click', (event) => {
                    if (event.target.classList.contains('product-card__close')) {
                        principalSection.innerHTML = '';
                        crearProductos(category)
                    }
                })
            }
        }
    }
    
});

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
    const btnRopaInterior = document.querySelector('#RopaInterior');
    btnRopaInterior.innerText = 'Ropa Interior';

}

//renderizando dinamicamente los productos de una categoria

function crearProductos(categoria) {
    let productos = categoria.productos;
    for(let producto of productos) {
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
        `
    }
    const productList = document.querySelectorAll('.product-list');
    productList.forEach(element => {
        element.addEventListener('click', () => {
            const img = element.childNodes[1].src;
            const nameProduct = element.childNodes[3].childNodes[1].textContent;
            const priceProduct = element.childNodes[3].childNodes[3].textContent;
            const talleProduct = element.childNodes[3].childNodes[5].textContent;
            const descriptionProduct = element.childNodes[3].childNodes[7].textContent;

            agrandarProducto(img, nameProduct, priceProduct, talleProduct, descriptionProduct);
        })
    })
}

//funcion para mostrar en grande el producto seleccionado
function agrandarProducto(imagen, nombre, precio, talle, descripcion) {
    principalSection.innerHTML += `
    <div class="product-background">
        <div class="product-card">
            <i class="fa-solid fa-x fa-xm product-card__close" id="x-icon-product"></i>
            <img class="product-card__img" src="${imagen}" alt="${nombre}">
            <div class="product-card__data">
                <h4 class="product-card__name">${nombre}</h4>
                <p class="product-card__price"><span class="product-card__span">Precio:</span> $${precio}</p>
                <p class="product-card__talle"><span class="product-card__span span-talle">Talle:</span> ${talle}</p>
                <p class="product-card__description"><span class="product-card__span">Descripcion:</span> ${descripcion}.</p>
            </div>
        </div>
    </div>
    `;
}

//renderizar todos los productos de la tienda
function crearTodosLosProductos() {
    principalSection.innerHTML = '';

    for( let category of categoryList) {
        crearProductos(category);
        principalSection.addEventListener('click', (event) => {
            if (event.target.classList.contains('product-card__close')) {
                principalSection.innerHTML = '';
                crearTodosLosProductos;
            }
        })
    }
}






//funcion primera letra a minuscula

function firstLetterToLowerCase(string) {
    return string[0].toLowerCase() + string.slice(1);
}