async function fetchWeather(city) {
  const apiKey = "17ed2db35533377d79567eb13b85103a";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
const getImageTime = (time) => {
  switch (time) {
    case "Clear":
      return `<img src="images/clear.png" alt=""></img>`;
    case "Clouds":
      return `<img src="images/clouds.png" alt=""></img>`;
    case "Drizzle":
      return `<img src="images/drizzle.png" alt=""></img>`;
    case "Humidity":
      return `<img src="images/humidity.png" alt=""></img>`;
    case "Mist":
      return `<img src="images/mist.png" alt=""></img>`;
    case "Rain":
      return `<img src="images/rain.png" alt=""></img>`;
    case "Snow":
      return `<img src="images/snow.png" alt=""></img>`;
    default:
      break;
  }
};

const submit = document.querySelector(".submit");

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const countryName = document.querySelector(".input");
  const result = await fetchWeather(countryName.value);
  if (countryName.value.trim() !== "" && result !== null) {
    const { main, name, sys, wind, weather } = result;
    const imageTMPL = getImageTime(weather[0].main);
    document.querySelector(".img").innerHTML = imageTMPL;
    document.querySelector(".city").innerHTML = `${name}, ${sys.country}`;
    document.querySelector(".temp").innerHTML = `${Math.round(main.temp)} °C`;
    document.querySelector(
      ".humidity"
    ).innerHTML = `<img class='freshimg' src="images/humidity.png" alt=""></img> <div class='infocontainer'> <div> ${main.humidity} % </div> <div>Humidity</div></div> `;
    document.querySelector(
      ".wind"
    ).innerHTML = `<img class='freshimg' src="images/wind.png" alt=""></img> <div class='infocontainer'> <div> ${wind.speed} m/s </div> <div>Wind Speed</div></div> `;
  } else {
    document.querySelector(".error").innerHTML = "Oupss try again";
  }
});
