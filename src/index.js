function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
function sayTime(response) {
  let temperatureAnswer = Math.round(response.data.temperature.current);
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = temperatureAnswer;

  let cityAnswer = response.data.city;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = cityAnswer;

  let conditionAnswer = response.data.condition.description;
  let conditionElement = document.querySelector("#conditions");
  conditionElement.innerHTML = ` ${conditionAnswer}`;

  let humidityAnswer = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidityAnswer}%`;

  let windAnswer = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${windAnswer} km/h`;

  let timeElement = document.querySelector("#current-date");
  let dateAnswer = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(dateAnswer);

  let icon = document.querySelector("#emoji");
  let iconAnswer = `<img
                src="${response.data.condition.icon_url}"
                class="current-temperature-icon"
              />`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "o3bfb209f55e8951210f40e6476fat3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(sayTime);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
