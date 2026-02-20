const url = `https://api.openweathermap.org/data/2.5/weather?q=city&appid=[yourapi]&units=metric`;

const input = document.querySelector(".input");
const btn = document.querySelector("#searchIcon");
const namePara = document.querySelector("#name p");
const tempPara = document.querySelector("#temp p");
const condPara = document.querySelector("#condition p");
const humidityPara = document.querySelector("#humidity p");
const img = document.querySelector("#condImg");
const info = document.querySelector(".info");

const getWeather = async (city) => {
  try {
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=[yourapi]&units=metric`,
    );

    if (!data.ok) {
      alert("City not found!");
      return;
    }

    let response = await data.json();
    console.log(response);

    // for city
    let respName = response.name;
    namePara.innerText = respName;

    // for temperature
    let temp = response.main.temp;
    tempPara.innerText = temp + "\u00B0C";

    // for condition
    let condition = response.weather[0]["description"];
    condPara.innerText = condition;

    // for icon
    let icon = response.weather[0]["icon"];
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // for humidity
    let humidity = response.main.humidity;
    humidityPara.innerText = humidity + "%";

    info.style.visibility = "visible";
    input.value = "";
  } catch (error) {
    alert("Something went wrong!");
    console.log(error);
  }
};

btn.addEventListener("click", () => {
  let city = input.value.trim();
  if (city === "") {
    input.value = "";
    return;
  }
  console.log(city);
  getWeather(city);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let city = input.value.trim();
    if (city === "") {
      input.value = "";
      return;
    }
    console.log(city);
    getWeather(city);
  }
});
