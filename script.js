const getData = async (country) => {
  const url = `https://open-weather13.p.rapidapi.com/city/${country}/FR`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "169271ca4fmshfa9a8e317e276bfp1aa705jsn7e23adf443a7",
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.json();
      return result;
    }
    throw new Error(response.status, response.text);
  } catch (error) {
    console.error(error);
  }
};

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
  const result = await getData(countryName.value);
  console.log(result.cod);
  if (countryName.value.trim() !== "" && result.cod !== 404) {
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
    ).innerHTML = `<img class='freshimg' src="images/wind.png" alt=""></img> <div class='infocontainer'> <div> ${wind.speed} km/h </div> <div>Wind Speed</div></div> `;
  } else {
    console.log("ici");
    document.querySelector(".error").innerHTML = "Oupss try again";
  }
});
