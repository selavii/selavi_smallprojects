const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

searchButton.addEventListener('click', () => {

    const APIKey = '234dff1aabdd4bc7f2634ad0d4027223';
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value.trim();

    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            let weatherImageSrc = '';
            switch (json.weather[0].main) {
                case 'Clear':
                    weatherImageSrc = 'images/sunny.png';
                    break;
                case 'Rain':
                    weatherImageSrc = 'images/rainy.png';
                    break;
                case 'Snow':
                    weatherImageSrc = 'images/snowyx2.png';
                    break;
                case 'Clouds':
                    weatherImageSrc = 'images/cloudy.png';
                    break;
                case 'Haze':
                case 'Mist':
                    weatherImageSrc = 'images/fog.png';
                    break;
                default:
                    weatherImageSrc = 'images/default.png';
            }

            image.src = weatherImageSrc;
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            container.style.height = '450px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
        });
});
