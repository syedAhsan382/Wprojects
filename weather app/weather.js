async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "de241a1cd45c24842eea59898601da96"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
  
      const data = await response.json();
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  
      document.getElementById("weatherResult").innerHTML = `
        <h2>${city}</h2>
        <img src="${iconUrl}" alt="${description}">
        <p><strong>${temp}°C</strong></p>
        <p>${description}</p>
      `;
    } catch (error) {
      document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  }
  