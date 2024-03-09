const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '51d3c1efdf5768127346ca010e8b9688';

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temp');
const speedElement = document.getElementById('speed');
const directionElement = document.getElementById('direction');
const descriptionElement = document.getElementById('description');
const iconElement = document.querySelector('.weather-icon');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
        locationElement.innerHTML = "Sijaintitieto ei ole käytettävissä tässä selaimessa.";
    }
}

function getWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `${API_ENDPOINT}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            locationElement.innerHTML = data.name;
            temperatureElement.innerHTML = data.main.temp + '°C';
            speedElement.innerHTML = data.wind.speed + ' m/s';
            directionElement.innerHTML = data.wind.deg + ' degrees';
            descriptionElement.innerHTML = data.weather[0].description;
            iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        })
        .catch(error => {
            console.error('Virhe säätietojen hakemisessa:', error);
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationElement.innerHTML = "Käyttäjä kieltäytyi sijaintitiedon antamisesta."
            break;
        case error.POSITION_UNAVAILABLE:
            locationElement.innerHTML = "Sijaintitieto ei ole saatavilla."
            break;
        case error.TIMEOUT:
            locationElement.innerHTML = "Sijaintitiedon haku aikakatkaistiin."
            break;
        case error.UNKNOWN_ERROR:
            locationElement.innerHTML = "Tuntematon virhe tapahtui."
            break;
    }
}

getLocation();