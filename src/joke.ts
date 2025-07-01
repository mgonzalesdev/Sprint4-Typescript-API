export type Record = { joke: string; score: number, date: string };
const reportJoke: Record[] = [];

export async function getJoke() {
    try {
        const resp = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!resp.ok) {
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        }
        const data = await resp.json(); // data.joke contiene el texto del chiste, convierte la respuesta del servidor en un json, se colocaun await porque la funcion va ha tardar x tiempo
        return data.joke;
    } catch (error) {
        console.error('Error al consultar la API: icanhazdadjoke', error);
        return null;
    }
}

export async function getJokeOfficialJoke() {
    try {
        const resp = await fetch('https://official-joke-api.appspot.com/random_joke', {
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!resp.ok) {
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);

        }
        const data = await resp.json();
        let joke = `- ${data.setup} <br>- ${data.punchline}`;
        return joke;
    } catch (error) {
        console.error('Error al consultar la API: Official Joke', error);
        return null;
    }
}

export function saveReportJoke(joke: string, score: number): void {
    let currentDate = new Date().toISOString();
    const newRecord: Record = { joke: joke, score: score, date: currentDate };
    reportJoke.push(newRecord);
}

export function deleteLastRecord(text: string): boolean {
    if (reportJoke[reportJoke.length - 1].joke === text) {
        reportJoke.pop();
        return true;
    } else
        return false;
}

export function showHistory(): Record[] {
    return reportJoke;
}