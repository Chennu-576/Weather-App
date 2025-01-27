 

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = "224002910529121f18d589294da6171d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const { name } = data;
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    weatherResult.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity} %</p>
        <p>Wind Speed: ${speed} m/s</p>
    `;
}