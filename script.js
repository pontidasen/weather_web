let result = document.getElementById("result");
let searchBtn =document.getElementById("search-btn");
let cityRef = document.getElementById("city");
let shape1 = document.getElementById("shape_1");
let shape2 = document.getElementById("shape_2");
let arrow = document.getElementById("arrow")

//Function to fetch weather details from api and display
let getWeather =() =>{
    let cityValue = cityRef.value;
    //if input field empty
    if(cityValue.length==0)
        {
            result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`
        }
        else
        {   //Clear the  input feild 
            cityRef.value = "";
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
            fetch(url)
                .then((resp) =>resp.json())
                //if city name is valid
                .then(data =>{
                    console.log(data);
                    // console.log(data.weather[0].icon);
                    // console.log(data.weather[0].main);
                    // console.log(data.weather[0].description);
                    // console.log(data.name);
                    // console.log(data.main.temp_min);
                    // console.log(data.main.temp_max);
                    result.innerHTML = `
                    
                    <h2>${data.name}</h2>
                    <h4 class="weather">${data.weather[0].main}</h4>
                    <h4 class="desc">${data.weather[0].description}</h4>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
                    <h1>${data.main.temp} &#176; </h1>
                    <div class = "temp-container">
                        <div>
                            <h4 class="title">min</h4>
                            <h4 class="temp">${data.main.temp_min}</h4>
                        </div>
                        <div>
                            <h4 class="title">max</h4>
                            <h4 class="temp">${data.main.temp_max}</h4>
                        </div>
                    </div>
        
                    `;
                    shape1.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
                    shape2.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
                    shape1.classList.add("visible");
                    shape2.classList.add("visible");

                    arrow.classList.add("unvisible");
                })
                //if city name is not valid
                .catch(()=>{
                    result.innerHTML = `<h3 class="msg">City not found</h3>`
                    shape1.classList.remove("visible");
                    shape2.classList.remove("visible");

                    arrow.classList.remove("unvisible");
                });
        }
};

searchBtn.addEventListener("click", getWeather);
cityRef.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

// searchBtn.addEventListener("click",getWeather);
window.addEventListener("load",getWeather);