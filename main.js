const searchBar = document.querySelector('#searchBar');
const weatherCard = document.getElementById('weatherCard');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading')

const API_KEY = '3SNK35PV53ZPWKQ4WX4HFVRGV';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';


 const weatherIcons = {
            "clear-day": "☀️",
            "clear-night": "🌙",
            rain: "🌧️",
            snow: "❄️",
            sleet: "🌨️",
            wind: "💨",
            fog: "🌫️",
            cloudy: "☁️",
            "partly-cloudy-day": "⛅",
            "partly-cloudy-night": "🌤️",
            thunderstorm: "⛈️",
            hail: "🌨️"
        };



searchBar.addEventListener('keypress', (e)=> {
    if(e.key ==='Enter'){
        searchWeather();
    }
});


async function searchWeather(){
    const location = searchBar.value.trim();

try {
const url = `${BASE_URL}/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`;
const response = await fetch(url);

if(!response.ok){
    throw new Error(`Weather data not found for "${location}"`);
}

const data = await response.json();
console.log(data)
displayWeather(data);
}catch(e){
    console.log(e)
}
}

function displayWeather(data){
    const current = data.currentConditions;
    const today = data.days[0];

    document.querySelector('#locationName').textContent = data.resolvedAddress;
     document.querySelector('#currentDate').textContent = formatDate(new Date());


}


function formatDate(date){
 const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };

            return date.toLocaleDateString('en-US', options);
         
}