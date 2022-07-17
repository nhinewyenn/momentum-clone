/** @format */

const IMG_URL = `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`;
const body = document.querySelector("body");
const imgAuthor = document.querySelector(".img-author");
const imgLocation = document.querySelector(".img-location");
const exchangeRate = document.querySelector(".exchange-rate");
const defaultImg = `/ghibli-pic.jpg`;

function getBackgroundContent() {
  fetch(IMG_URL)
    .then(res => res.json())
    .then(data => {
      const { user, urls } = data;
      body.style.backgroundImage = `url(${urls.regular}), linear-gradient(rgba(0, 0, 0, 0.575), rgba(0, 0, 0, 0.569))`; //change to data.urls.full when finish
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

function getExchangeRate() {
  fetch(`https://api.exchangerate.host/latest?base=AUD&places=2`)
    .then(res => res.json())
    .then(data => {
      exchangeRate.innerHTML = `
      <h4 class="currency">AUD/USD: ${data.rates.USD}</h4>
      <h4 class="currency">AUD/GPB: ${data.rates.GBP}</h4>
      <h4 class="currency">AUD/CAD: ${data.rates.CAD}</h4>
      `;
    })
    .catch(err => alert("Couldn't get your data"));
}
getExchangeRate();

// function getGeolocation(position) {
//   const { latitude, longitude } = position.coords;
//   console.log(latitude, longitude);
// }

function getTime() {
  const currentTime = new Date().toLocaleTimeString("fr", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.querySelector(".current-time").textContent = currentTime;
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
