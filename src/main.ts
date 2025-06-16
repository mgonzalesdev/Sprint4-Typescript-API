import { getJoke, saveAcudits, deleteLastRecord, showHistory } from './joke.ts';
import type { Record } from './joke.ts';

const contentJoke = document.querySelector("#content-joke");
let isSaved: boolean = false;

async function nextJoke() {
    try {
        const data = await getJoke();
        contentJoke.textContent = data.joke;
        isSaved = false;
        console.log(data.joke);
    } catch (error) {
        // console.error('Error al obtener chiste:', error);
        contentJoke.innerHTML = `<p class="text-red-500">Error al cargar chiste ${error}</p>`;
    }
}

nextJoke();//carga el primer chiste

const saveScore = (event: MouseEvent): void => {
    const target = event.currentTarget as HTMLButtonElement;
    let score = parseInt(target.value);//Obtener la calificacion 
    let divJoke = document.querySelector('#content-joke');
    let joke: string = "";

    if (divJoke) {
        joke = divJoke.textContent || ''; //obtener el chiste
        console.log(joke);
    }

    let currentDate = new Date().toISOString();//obtener la fecha
    const newRecord: Record = { joke: joke, score: score, date: currentDate };
    if (isSaved === false) {
        saveAcudits(newRecord);
        isSaved = true;
        console.log(showHistory());
    } else {
        deleteLastRecord();
        saveAcudits(newRecord);
        console.log(showHistory());
    }
};

const btns = document.querySelectorAll('.record');

btns.forEach(btn => {
    btn.addEventListener("click", saveScore);
});

const btn = document.getElementById('next-joke');
btn?.addEventListener('click', nextJoke);