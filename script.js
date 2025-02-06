const inputBox = document.querySelector('.input-box');
const weatherDisplay = document.querySelector('.weather-display');
const locationNotFound = document.querySelector('.location-not-found');
const weatherIcon = document.querySelector('.weather-icon img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

async function checkWeather(city) {
    const api_key = "29d7424e8a95db6bca9cce6d729c1c26";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();
        if(weather_data.cod === '404') {
            locationNotFound.style.display = "block";
            weatherDisplay.style.display = "none";
            return;
        }

        locationNotFound.style.display = "none";
        weatherDisplay.style.display = "block";

        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = weather_data.weather[0].description;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        windSpeed.innerHTML = `${Math.round(weather_data.wind.speed * 3.6)} km/h`;

        
        switch(weather_data.weather[0].main) {
            case 'Clear':
            weatherIcon.src = "/assets/clear.png";
                weatherIcon.style.color = '#FFD700';
                break;
            case 'Clouds':
            weatherIcon.src = "/assets/cloud.png";
                weatherIcon.style.color = '#A9A9A9';
                break;
            case 'Rain':
            weatherIcon.src = "/assets/rain.png";
                weatherIcon.style.color = '#4682B4';
                break;
            case 'Snow':
            weatherIcon.src = "/assets/snow.png";
                weatherIcon.style.color = '#FFFFFF';
                break;
            case 'Thunderstorm':
            weatherIcon.src = "/assets/mist.png";
                weatherIcon.style.color = '#FFD700';
                break;
            case 'Drizzle':
            weatherIcon.src = "/assets/mist.png";
                weatherIcon.style.color = '#87CEEB';
                break;
            case 'Mist':
            case 'Smoke':
            case 'Haze':
            case 'Dust':
            case 'Fog':
            weatherIcon.src = "/assets/mist.png";
                weatherIcon.style.color = '#D3D3D3';
                break;
            default:
            weatherIcon.src = "/assets/mist.png";
                weatherIcon.style.color = '#FFFFFF';
        }

        
        weatherIcon.style.animation = 'weatherIconAnimation 2s infinite ease-in-out';

    } catch(error) {
        console.error('Error fetching weather data:', error);
    }
}

inputBox.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});

weatherDisplay.style.display = "none";
locationNotFound.style.display = "none";