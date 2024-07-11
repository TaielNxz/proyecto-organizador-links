import { chromium } from "playwright";


const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// URL de la página a la que deseas hacer scraping
const url = 'https://www.info.unlp.edu.ar/licenciatura-en-informatica-plan-2021/';
await page.goto(url);


// Selecciona la tabla y revisa cada <tr>
const data = await page.$$eval('.table-bordered tr', rows => {

    const result = { years: [] , semestres: [] , materias: [] };
    
    let yearActual = '';
    let semestreActual = 'INGRESO';

    rows.forEach( row => {

        // seleccionamos los elementos del html
        const year = row.querySelector('.tabla-titulo-tr td');
        const semestre = row.querySelector('.tabla-separador-tr strong');
        const materia = row.querySelector('a');

        if (year) { 
            yearActual = year.innerText.trim();
            result.years.push( year.innerText.trim() )   
        };

        if (semestre) {
            semestreActual = semestre.innerText.trim();
            result.semestres.push( semestre.innerText.trim() );
        }

        if (materia) {

            // Actualizo los datos de la materia y lo agrego al arreglo
            const nuevaMateria = {
                nombre: materia.innerText.trim(),
                year: yearActual,
                semestre: semestreActual,
                github: '',
                drive: '',
                notion: ''
            };

            result.materias.push( nuevaMateria );

        }

    });

    return result;

});


console.log(data);

await browser.close();

// return { years, semestres, nombresMaterias };
