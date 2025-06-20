const searchBar = document.querySelector("#searchBar");
const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");


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
  hail: "🌨️",
};

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

async function searchWeather() {
  const location = searchBar.value.trim();

  showLoading(true);
  hideError();
  hideWeatherCard();
  clearInput()
  try {
    const url = `/.netlify/functions/get-weather?location=${encodeURIComponent(
      location
    )}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather data not found for "${location}"`);
    }

    const data = await response.json();
    displayWeather(data);
  } catch (e) {
    console.log(e);
    showError(e.message || 'Failed to fetch weather data. pls try again')
  }finally {
    showLoading(false);
  }
}

function displayWeather(data) {
  const current = data.currentConditions;
  const today = data.days[0];

  document.querySelector("#locationName").textContent = data.resolvedAddress;
  document.querySelector("#currentDate").textContent = formatDate(new Date());

  document.querySelector("#temperature").textContent = `${Math.round(
    current.temp
  )}°C`;
  document.querySelector("#weatherIcon").textContent =
    weatherIcons[current.icon] || "";
  document.querySelector("#weatherDescription").textContent =
    current.conditions;

  document.querySelector("#feelsLike").textContent = `${Math.round(
    current.feelslike
  )}°C`;
  document.querySelector("#humidity").textContent = `${current.humidity}%`;
  document.querySelector("#windSpeed").textContent = `${Math.round(
    current.windspeed
  )} km/h`;
  document.querySelector(
    "#visibility"
  ).textContent = `${current.visibility} km`;
  document.querySelector("#uvIndex").textContent = current.uvindex || "N/A";
  document.querySelector("#pressure").textContent = `${Math.round(
    current.pressure
  )} hPa`;

  showWeatherCard();
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}


function showError(message){
    errorMessage.textContent = message;
    errorMessage.classList.add('show')
    setTimeout(()=>hideError(),1000 )
}

function hideError(){
    errorMessage.classList.remove('show')
}

function showWeatherCard(){
    weatherCard.classList.add('show')
}

function hideWeatherCard(){
    weatherCard.classList.remove('show')
}


function showLoading(show){
    if(show){
        loading.classList.add('show')
    }
    else{
        loading.classList.remove('show')
    }
}

function clearInput(){
    searchBar.value='';
}