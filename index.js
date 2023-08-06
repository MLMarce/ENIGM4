import data from '/data.json' assert {type: 'json'};

const xIcon = document.querySelector('#x-icon');
const barsIcon = document.querySelector('#bars-icon');
const menuMobile = document.querySelector('.menu-mobile');
const headerMobile = document.querySelector('.header-mobile');
const inputSearch = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');
const form = document.querySelector('.form');
const principalSection = document.querySelector('.principal-section');
const menuCategories = document.querySelector('#categories');

// listeners del menu lateral en mobile
barsIcon.addEventListener('click', abrirAside);
xIcon.addEventListener('click', cerrarAside);
// btnSearch.addEventListener('click', buscarCategoria);
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

// function buscarCategoria() { //renombrar y mejorar para que se pueda buscar cualquier producto.
//     let dir = inputSearch.value;
//     if(inputSearch.value == "inicio") {
//         dir = "index";
//     }

//     form.setAttribute('action', `/${dir}.html`);
    
//     principalSection.classList.remove('inactive');
// }

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
        console.log(dato.img);
        console.log(dato.categoryName);
    }
}

crearCategorias();