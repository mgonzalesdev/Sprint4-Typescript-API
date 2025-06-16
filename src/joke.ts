export type Record = { joke: string; score: number, date: string };
const reportAcudits: Record[] = [];
// {
//  joke: "...",
//  score: 1,
//  date: ...
// }



export async function getJoke() {
    try {
        const res = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);

        }
        const data = await res.json(); // data.joke contiene el texto del chiste, convierte la respuesta del servidor en un json, se colocaun await porque la funcion va ha tardar x tiempo
        return data;
    } catch (error) {
        console.error('Error al consultar la API:', error);
    }
}

export function saveAcudits(record: Record): void {
    reportAcudits.push(record);
}

export function deleteLastRecord(): void {
    reportAcudits.pop();
}

export function showHistory(): Record[] {
    return reportAcudits;
}
//export { getJoke, saveAcudits, Record };