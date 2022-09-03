function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let text = `${day} ${hours}:${min}, ${month} ${date}`;
  return text;
}

function showTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = celsiusTemperature.toFixed(0);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed.toFixed(0);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "3e5761385c02293899defe61082c2901";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function submit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

function temperatureLondon(event) {
  event.preventDefault();
  search("London");
}

function temperatureParis(event) {
  event.preventDefault();
  search("Paris");
}

function temperatureRome(event) {
  event.preventDefault();
  search("Rome");
}

function temperatureBerlin(event) {
  event.preventDefault();
  search("Berlin");
}

function temperatureWarsaw(event) {
  event.preventDefault();
  search("Warsaw");
}

function changeFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = fahrenheiTemperature.toFixed(0);
}

function changeCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = celsiusTemperature.toFixed(0);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);

let linkLondon = document.querySelector("#link-London");
linkLondon.addEventListener("click", temperatureLondon);

let linkParis = document.querySelector("#link-Paris");
linkParis.addEventListener("click", temperatureParis);

let linkRome = document.querySelector("#link-Rome");
linkRome.addEventListener("click", temperatureRome);

let linkBerlin = document.querySelector("#link-Berlin");
linkBerlin.addEventListener("click", temperatureBerlin);

let linkWarsaw = document.querySelector("#link-Warsaw");
linkWarsaw.addEventListener("click", temperatureWarsaw);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeCelsius);

search("Kyiv");
