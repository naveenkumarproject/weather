document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    if (city) {
        getWeatherByCity(city);
    } else {
        alert('Please enter a city name');
    }
});

document.getElementById('getLocationWeather').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByLocation(latitude, longitude);
        }, error => {
            alert('Error getting location: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function getWeatherByCity(city) {
    const apiKey = https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}
    const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric;
    fetchWeather(url);
}

function getWeatherByLocation(lat, lon) {
    const apiKey = https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}
    const url = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric;
    fetchWeather(url);
}

function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
                getForecast(data.coord.lat, data.coord.lon);
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function getForecast(lat, lon) {
    const apiKey = https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}
    const url = https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastInfo = document.createElement('div');
    forecastInfo.innerHTML = '<h3>4-Day Forecast</h3>';

    // Filter the forecast data to get one entry per day at 12:00 PM
    const dailyData = data.list.filter(entry => entry.dt_txt.includes('12:00:00'));
    dailyData.slice(0, 4).forEach(day => {
        const date = new Date(day.dt_txt);
        forecastInfo.innerHTML += `
            <div>
                <h4>${date.toDateString()}</h4>
                <p>Temperature: ${day.main.temp}°C</p>
                <p>Weather: ${day.weather[0].description}</p>
                <p>Humidity: ${day.main.humidity}%</p>
                <p>Wind Speed: ${day.wind.speed} m/s</p>
            </div>
        `;
    });

    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.appendChild(forecastInfo);
}
