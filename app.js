      const API_KEY = "c5a91ef967a3b809c668659217fd4834";
      const input = document.getElementById("searchinput");
      const showDiv = document.getElementById("showDiv");

      const searchData = async () => {

        try {
                showDiv.innerHTML = `  <div style="margin-top: 25px; padding: 20px; color:  #007BFF !important;" class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div>`;
          const city = input.value.trim();
          if (!city) {
            showDiv.innerHTML = `<p style="color: yellow;">Please enter a city name.</p>`;
            return;
          }

          const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
          const response = await fetch(API_URL);
          const data = await response.json();

          if (data.cod !== 200) {
            showDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
          } else {
            showWeatherData(data);
          }
        } catch (error) {
          console.log(error);
          showDiv.innerHTML = `<p style="color: red;">Something went wrong.</p>`;
        }
      };

      const showWeatherData = (data) => {
        console.log(data);
         if (data.cod == "404") {
        showDiv.innerHTML =  `<h1>${data.message}</h1>`;
        } else{
                    
        showDiv.innerHTML = `<div style=" background: linear-gradient(to bottom,
    #74b9ff 0%,     
    #74b9ff 80%, 
#d6ecfa00 
  );
  padding-bottom: 50px; border-radius: 10px 10px;">
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />
           <h4 style="font-size: 18px; position: relative; right: 80px; top: 20px;">Now</h4>
          <h3>${data.main.temp.toFixed()}°C</h3>
          <h2 style="padding-bottom: 5px;">${data.weather[0].main}</h2>
           <p>Feels_like :  ${data.main.feels_like.toFixed()}°C</p>
           <p>Humidity :  ${data.main.humidity}</p>
         <p>Degree :  ${data.wind.deg}°</p>
          <h4 style="padding-top: 5px  !important;">${data.name}, ${data.sys.country}</h4>
        </div>`;
        }
        

      };