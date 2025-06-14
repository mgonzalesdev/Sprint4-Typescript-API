import { getJoke } from './joke.ts';

const contentJoke = document.querySelector("#content-joke");

async function nextJoke() {
    try {
        const data = await getJoke();
        contentJoke.textContent = data.joke;
        console.log(data.joke);
    } catch (error) {
        // console.error('Error al obtener chiste:', error);
        contentJoke.innerHTML = `<p class="text-red-500">Error al cargar chiste ${error}</p>`;
    }
}

nextJoke();

const btn = document.getElementById('next-joke');
btn?.addEventListener('click', nextJoke);