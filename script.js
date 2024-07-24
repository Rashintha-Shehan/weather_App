const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '47834b3ab51f1890709ca5daaee645a8';
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value.trim(); // Trim whitespace from input

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
        if (json.cod === '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .info-wind span');

        if (cityHide.textContent === city) {
            return;
        } else {
            cityHide.textContent = city;
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            
            switch(json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;
                case 'Rain':
                    image.src = 'img/rain.png';
                    break;
                case 'Snow':
                    image.src = 'img/snowy.png';
                    break;
                case 'Clouds':
                    image.src = 'img/cloudy.png';
                    break;
                case 'Mist':
                    image.src = 'img/mist.png';
                    break;
                case 'Haze':
                    image.src = 'img/haze.png';
                    break;
                default:
                    image.src = 'img/clear.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

           
        }
    }).catch(error => {
        console.error('Error fetching weather data:', error);
    });
});
