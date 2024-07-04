const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const card = document.getElementById("card");
const apiKey = "22009312ab4cf25e30e4517f7ead7090";

let cityDisplayStyle = ["text-[35px]", "font-bold"];
let tempDisplayStyle = ["text-[35px]"];
let humidityDisplayStyle = ["font-bold"];
let cloudDisplayStyle = ["font-bold", "text-[18px]"];
let emojiDisplayStyle = ["text-[7rem]"];


weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value;

    if (city)
    {
        try {
            const weatherData = await getWeather(city);
            displayWeatherInfo(weatherData);
            console.log(weatherData);
        }
        catch {
            displayError("Not found");
        }
    }
    else
    {
        displayError("Please enter a city");
    }
})

async function getWeather(city)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch data");
    }
    else
        return await response.json();
}

function displayWeatherInfo(data)
{
    const {name: city,
         main: {temp, humidity}, 
         weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    let cityDisplay = document.createElement("p");
    let tempDisplay = document.createElement("p");
    let humidityDisplay = document.createElement("p");
    let cloudDisplay = document.createElement("p");
    let emojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.floor(temp - 273.15)}\u00B0`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    cloudDisplay.textContent = description;
    emojiDisplay.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add(...cityDisplayStyle);
    tempDisplay.classList.add(...tempDisplayStyle);
    humidityDisplay.classList.add(...humidityDisplayStyle);
    cloudDisplay.classList.add(...cloudDisplayStyle);
    emojiDisplay.classList.add(...emojiDisplayStyle);
    


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(emojiDisplay);
    card.appendChild(cloudDisplay);
}

function getWeatherEmoji(id)
{
    if (id >= 200 && id < 300)
    {
        return "⛈️";
    }
    else if (id >= 300 && id < 400)
    {
        return "🌧️";
    }
    else if (id >= 500 && id < 600)
    {
        return "🌦️";
    }
    else if (id >= 600 && id < 700)
    {
        return "❄️";
    }
    else if (id >= 700 && id < 800)
    {
        return "🌫️";
    }
    else if (id == 800)
    {
        return "☀️";
    }
    else if (id >= 801 && id < 810)
    {
        return "🌥️";
    }
    else
        return "🛸";
}

function displayError(message)
{
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";

    errorDisplay.classList.add(...["text-[18px]", "font-bold", "text-gray-600"]);

    card.textContent = "";
    
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}