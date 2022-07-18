/** @format */

const IMG_URL = `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature&query=city`;
const body = document.querySelector("body");
const imgAuthor = document.querySelector(".img-author");
const imgLocation = document.querySelector(".img-location");
const exchangeRate = document.querySelector(".exchange-rate");
const defaultImg = `/ghibli-pic.jpg`;

//* MAIN SECTION (background content)
function getBackgroundContent() {
  fetch(IMG_URL)
    .then(res => res.json())
    .then(data => {
      const { user, urls } = data;
      body.style.backgroundImage = `url(${urls.full}), linear-gradient(rgba(0, 0, 0, 0.575), rgba(0, 0, 0, 0.569))`;
      imgAuthor.textContent = `Image by ${user.name}`;
      imgLocation.textContent = `${!user.location ? "" : user.location}`;
    })
    .catch(err => {
      body.style.backgroundImage = `url(${defaultImg})`;
      imgAuthor.textContent = `Default Image`;
      imgLocation.textContent = "";
    });
}
getBackgroundContent();

//* TOP SECTION
function getExchangeRate() {
  fetch(`https://api.exchangerate.host/latest?base=AUD&places=2`)
    .then(res => res.json())
    .then(data => {
      exchangeRate.innerHTML = `
      <h4 class="currency">🇺🇸 AUD/USD: $${data.rates.USD}</h4>
      <h4 class="currency">🇬🇧 AUD/GPB: $${data.rates.GBP}</h4>
      <h4 class="currency">🇨🇦 AUD/CAD: $${data.rates.CAD}</h4>
      `;
    })
    .catch(err => alert("Couldn't get your data"));
}
getExchangeRate();

navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`
  )
    .then(res => {
      if (!res.ok) throw Error(`Could not get your location`);
      return res.json();
    })
    .then(data => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.querySelector(".weather").innerHTML = `
      <div class="weather-container">
      <img src="${iconUrl}" class="weather-icon" alt="">
      <h3 class="weather-temp">${Math.round(data.main.temp)}ºC</h3>
      <p class="weather-city">${data.name}</p>
      </div>
      `;
    })
    .catch(err => console.error(err.message));
});

//* MIDDLE SECTION
function getTime() {
  // Get + Display Time
  const currentTime = new Date().toLocaleTimeString("fr", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.querySelector(".current-time").textContent = currentTime;

  // Get hours + display timeData
  const timeData = [
    [22, "Working late 🌚"],
    [18, "Good evening 🌚"],
    [12, "Good afternoon 🌤"],
    [5, "Good morning ☀️"],
    [3, "Whoa, early bird ☀️"],
    [0, "Sleep well 💤"],
  ];

  const currentHrs = new Date().getHours();
  for (let i = 0; i < timeData.length; i++) {
    if (currentHrs >= timeData[i][0]) {
      document.querySelector(".time-of-day").textContent = timeData[i][1];
      break;
    }
  }
}
getTime();

function getQuotes() {
  fetch(`http://api.quotable.io/random`)
    .then(res => res.json())
    .then(data => {
      document.querySelector(
        ".quotes"
      ).innerHTML = `<h3 class="quote"><em>${data.content}</em></h3>`;
    });
}

getQuotes();
