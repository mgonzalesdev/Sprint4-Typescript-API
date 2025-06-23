export async function getForecast() {
    try {
        const latitude: number = 41.38879;
        const longitude: number = 2.15899;
        const timezone: string = "Europe/Berlin";
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${timezone}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);

        }
        const data = await response.json();
        let dataForecast = {
            temperature: data.current_weather.temperature + " " + data.current_weather_units.temperature,
            date: data.current_weather.time,
            windspeed: data.current_weather.windspeed + " " + data.current_weather_units.windspeed,
            icon: data.current_weather.weathercode
        }
        return dataForecast;

    } catch (error) {
        console.error('Error al consultar la API Weather:', error);
        return null;
    }
}

