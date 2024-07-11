import scrapeData from './scraping.js';

const materiasSection = document.querySelector('.materias');
const filtroNombre = document.querySelector('#nombre');
const filtroAlfabetico = document.querySelector('#alfabetico');
const filtroYearSelectAll = document.querySelector('#select-all');
const filtroYearCheckboxes = document.querySelectorAll('#filtro-year input[type="checkbox"]');


let years = [
    'PRIMER AÑO',
    'SEGUNDO AÑO',
    'TERCER AÑO',
    'CUARTO AÑO',
    'QUINTO AÑO'
  ];
let semestres = [
    'PRIMER SEMESTRE',
    'SEGUNDO SEMESTRE',
    'TERCER SEMESTRE',
    'CUARTO SEMESTRE',
    'QUINTO SEMESTRE',
    'SEXTO SEMESTRE',
    'SÉPTIMO SEMESTRE',
    'OCTAVO SEMESTRE',
    'NOVENO SEMESTRE'
  ];
let materiasDB = [ 
    {
        nombre: 'Fundamentos de Organización de Datos',
        year: '2',
        semestre: '3',
        github: 'https://github.com/TaielNxz/FOD',
        drive: 'https://drive.google.com/fundamentos',
        notion: 'https://notion.so/fundamentos'
    },
    {
        nombre: 'Conceptos de Organización de Computadoras',
        year: '1',
        semestre: '1',
        github: 'https://github.com/computadoras',
        drive: 'https://drive.google.com/computadoras',
        notion: 'https://notion.so/computadoras'
    },
    {
        nombre: 'Expresión de Problemas y Algoritmos',
        year: '1',
        semestre: '1',
        github: 'https://github.com/algoritmos',
        drive: 'https://drive.google.com/algoritmos',
        notion: 'https://notion.so/algoritmos'
    },
];



function eventListeners() {

    // Imprimir materiasl al cargar la pagina
    document.addEventListener('DOMContentLoaded', mostrarMaterias(materiasDB));

    // Filtrar Materias
    filtroNombre.addEventListener('input', leerDatos);
    filtroAlfabetico.addEventListener('change', leerDatos);
    filtroYearCheckboxes.forEach(checkbox => checkbox.addEventListener('change', leerDatos));  
    filtroYearSelectAll.addEventListener('change', seleccionarYears);

}
eventListeners();


function mostrarMaterias( materias ) {

    limpiarHTML( materiasSection );

    materias.forEach( materia => {

        let divMateria = document.createElement('div');
        divMateria.innerHTML = 
        `
        <div class="materia">
            <li><a href="#">${materia.nombre}</a></li>
            <div class="links">
                <a href="${materia.github}">Github</a>
                <a href="${materia.drive}">Drive</a>
                <a href="${materia.notion}">Notion</a>
                <a href="#">✏️</a>
            </div>
        </div>
        `

        materiasSection.appendChild( divMateria );

    })

}


// Estado global de los filtros
let datosBusqueda = {
    nombre: '',
    alfabetico: ''
};

function leerDatos(e) {

    if ( e.target.id === 'nombre' ) {
        datosBusqueda.nombre =  e.target.value.toLowerCase();
    }

    if ( e.target.id === 'alfabetico' ) {
        datosBusqueda.alfabetico =  e.target.value;
    }

    filtrarMaterias();

}

function filtrarMaterias() {

    const materiasFiltradas = materiasDB.filter( filtrarNombre )
                                        .filter( filtrarYears )
                                        .sort( ordenarAlfabeticamente );

    mostrarMaterias(materiasFiltradas);

}

function filtrarNombre( materia ) {

    const textoFiltro = datosBusqueda.nombre;

    if ( textoFiltro ) {
        return materia.nombre.toLocaleLowerCase().includes(textoFiltro)
    }

    return materia;

}

function filtrarYears( materia ) {

    // Obtener los valores de los checkbox seleccionados
    let yearsSeleccionados = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach( checkbox => yearsSeleccionados.push(checkbox.value) );

    // Verificar si la materia pertenece a uno de los años seleccionados
    return yearsSeleccionados.includes(materia.year);

}

function ordenarAlfabeticamente( a , b ) {

    const orden = datosBusqueda.alfabetico;

    if ( orden === 'ascendente' ) {
        return a.nombre.localeCompare(b.nombre);
    }

    if ( orden === 'descendente') {
        return b.nombre.localeCompare(a.nombre);
    }

    return '';

}

function seleccionarYears() {

    // selecciona todos los checkbox de los años y los marca
    const checkboxes = document.querySelectorAll('#filtro-year input[type="checkbox"]:not(#select-all)');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });

    filtrarMaterias();

}

function limpiarHTML( parent ) {
    while ( parent.firstChild ) {
        parent.removeChild( parent.firstChild );
    }
}