import { chromium } from "playwright";


const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// URL de la página a la que deseas hacer scraping
const url = 'https://www.info.unlp.edu.ar/licenciatura-en-informatica-plan-2021/';
await page.goto(url);


// Recorremos la tabla hasta llegar a los <td> que contienen los años y extraemos los textos
const years = await page.$$eval('.table-bordered .tabla-titulo-tr td', elements => {
    return elements.map(element => element.innerText.trim());
});


// Recorremos la tabla hasta llegar a los <strong> que contienen los semestres y extraemos los textos
const semestres = await page.$$eval('.table-bordered .tabla-separador-tr strong', elements => {
    return elements.map(element => element.innerText.trim());
});


// Seleccionar todos los elementos <a> que contienen los nombres de las materias y extraer sus textos
const materias = await page.$$eval('.table-bordered a', elements => {
    return elements.map(element => element.innerText.trim());
});


// Excluimos strings vacios del arreglo de materias
const nombresMaterias = materias.filter( text => {
    return text.length > 0;
});


console.log(years);
console.log(semestres);
console.log(nombresMaterias);

await browser.close();