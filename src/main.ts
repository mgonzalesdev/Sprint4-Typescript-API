import { getJoke, getJokeOfficialJoke, saveAcudits, deleteLastRecord, showHistory } from './joke.ts';
import { getForecast } from './weatherForecast.ts';

import type { Record } from './joke.ts';

const contentJoke = document.querySelector("#content-joke") as HTMLElement;
const weather = document.querySelector("#weather") as HTMLElement;
const weatherIcon = document.querySelector("#weatherIcon") as HTMLElement;
const apiJokes: Array<() => Promise<string>> = [getJoke, getJokeOfficialJoke];
const backgrounds: string[] = [
    "bg-[url('/public/blob_1.svg')]",
    "bg-[url('/public/blob_2.svg')]",
    "bg-[url('/public/blob_3.svg')]",
    "bg-[url('/public/blob_4.svg')]",
    "bg-[url('/public/blob_5.svg')]"];

let current = 0;
let isSaved: boolean = false;
let joke: string = "";

async function getRandomApi(): Promise<string> {
    let index = Math.floor(Math.random() * apiJokes.length);
    return await apiJokes[index]();
}

async function nextJoke(): Promise<void> {
    try {
        setBackground();
        joke = await getRandomApi();
        if (joke) {
            isSaved = false;
            contentJoke.innerHTML = joke;
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
        if (dataForecast) {
            weather.textContent = dataForecast.temperature;
            weatherIcon.classList.add(weatherCodeMap[dataForecast.icon]);
        }
        else
            throw new Error(`Error al obtener los datos del tiempo.`);

    } catch (error) {
        weather.textContent = "Error al consultar el tiempo: " + error;
        console.error("Error al consultar el tiempo:", error);
    }
}

function saveScore(event: MouseEvent): void {
    const target = event.currentTarget as HTMLButtonElement;
    let score = parseInt(target.value);
    let currentDate = new Date().toISOString();
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
    getWeather();
    nextJoke();

    document.getElementById('next-joke')?.addEventListener('click', nextJoke);

    document.querySelectorAll('.record').forEach(btn =>
        btn.addEventListener("click", saveScore)
    );
    document.body.classList.add(backgrounds[current]);
}

document.addEventListener("DOMContentLoaded", initApp);

type Icon = { [code: number]: string };
const weatherCodeMap: Icon = {
    0: "wi-day-sunny",
    1: "wi-day-sunny-overcast",
    2: "wi-day-cloudy",
    3: "wi-cloudy",
    45: "wi-fog",
    48: "wi-fog",
    51: "wi-sprinkle",
    53: "wi-sprinkle",
    55: "wi-showers",
    56: "wi-sleet",
    57: "wi-sleet",
    61: "wi-rain",
    63: "wi-rain",
    65: "wi-rain-wind",
    66: "wi-rain-mix",
    67: "wi-rain-mix",
    71: "wi-snow",
    73: "wi-snow",
    75: "wi-snow",
    77: "wi-snowflake-cold",
    80: "wi-showers",
    81: "wi-showers",
    82: "wi-showers",
    85: "wi-snow",
    86: "wi-snow",
    95: "wi-thunderstorm",
    96: "wi-thunderstorm",
    99: "wi-thunderstorm"
};

function setBackground(): void {
    document.body.classList.remove(backgrounds[current]); 
    (current === backgrounds.length - 1) ? current = 0 : current++;
    document.body.classList.add(backgrounds[current]);
}