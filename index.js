import data from '/data.json' assert {type: 'json'};

const xIcon = document.querySelector('#x-icon');
const barsIcon = document.querySelector('#bars-icon');
const menuMobile = document.querySelector('.menu-mobile');
const headerMobile = document.querySelector('.header-mobile');
const inputSearch = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');
const principalSection = document.querySelector('.principal-section');
const menuCategories = document.querySelector('#categories');

// listeners del menu lateral en mobile
barsIcon.addEventListener('click', abrirAside);
xIcon.addEventListener('click', cerrarAside);
btnSearch.addEventListener('click', buscar);
menuCategories.addEventListener('click', crearCategorias);
menuCategories.addEventListener('click', cerrarAside);

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
    let datos = data;
    let categoria;
    let productos = [];

    //obteniendo lista de categorias y cantidad de productos
    for(let dato of datos) {
        categoria = dato.categoryName;
        productos = dato.productos;
        console.log(productos);
        if(categoria.includes(valorInput)) {
            crearProductos();//crear esta funcion para renderizar los productos de dicha categoria
            cerrarAside();
        } // else if para en el caso de que se especifique un producto mostras solo ese producto. y ocultar el aside.
    }


    

    
    principalSection.classList.remove('inactive');
}

//renderizando dinamicamente las categorias en la seccion principal
function crearCategorias() {
    let datos = data;
    principalSection.innerHTML = '';
    for(let dato of datos) {
        principalSection.innerHTML += `
        <div class="categories" id="categories">
            <img src="${dato.img}" alt="${dato.categoryName}" title="${dato.categoryName}" class="categories__img">
            <p class="categories__name">${dato.categoryName}</p>
        </div>
        `;
    }


}