const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector("#search");
const weatherIcon = document.querySelector(".weather-icon");
const appContainer = document.querySelector(".app-container");

// weather api
const weatherApiKey = "b745dd26b8cfa0799abbd529b98b4286";
const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?id=524901`;

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector("#preloader").style.display = "none";
  }, 1500);
});
