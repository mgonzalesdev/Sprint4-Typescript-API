import { getJoke, saveAcudits, deleteLastRecord, showHistory } from './joke.ts';
import { getForecast } from './weatherForecast.ts';

import type { Record } from './joke.ts';

const contentJoke = document.querySelector("#content-joke") as HTMLElement;
const weather = document.querySelector("#weather") as HTMLElement;
let isSaved: boolean = false;
let joke: string = "";

async function nextJoke(): Promise<void> {
    try {
        joke = await getJoke();
        if (joke) {
            isSaved = false;
            contentJoke.textContent = joke;
        } else
            throw new Error(`Error al obtener el chiste.`);
        console.log(joke);
    } catch (error) {
        // console.error('Error al obtener chiste:', error);
        contentJoke.innerHTML = `<p class="text-red-500">Error al cargar chiste ${error}</p>`;
    }
}

async function getWeather(): Promise<void> {
    try {
        let dataForecast = await getForecast();
        if (dataForecast)
            weather.textContent = dataForecast.temperature;
        else
            throw new Error(`Error al obtener los datos del tiempo.`);

    } catch (error) {
        weather.textContent = "Error al consultar el tiempo: " + error;
        console.error("Error al consultar el tiempo:", error);
    }
}

function saveScore(event: MouseEvent): void {
    const target = event.currentTarget as HTMLButtonElement;
    let score = parseInt(target.value);//Obtener la calificacion 
    let currentDate = new Date().toISOString();//obtener la fecha
    const newRecord: Record = { joke: joke, score: score, date: currentDate };
    if (isSaved === false) {
        saveAcudits(newRecord);
        isSaved = true;
        console.log(showHistory());
    } else {
        if (deleteLastRecord(joke))
            saveAcudits(newRecord);
        console.log(showHistory());
    }
};

function initApp(): void {
    getWeather();// carga el tiempo
    nextJoke();//carga el primer chiste


    document.getElementById('next-joke')?.addEventListener('click', nextJoke);

    document.querySelectorAll('.record').forEach(btn =>
        btn.addEventListener("click", saveScore)
    );
}
document.addEventListener("DOMContentLoaded", initApp);
