const userLocation = document.getElementById("userLocation"),
 converter = document.getElementById("converter"),
 weatherIcon = document.querySelector(".weatherIcon"),
 temperature = document.querySelector(".temperature"),
 feelsLike = document.querySelector(".feelsLike"),
 description = document.querySelector(".description"),
 date = document.querySelector(".date"), 
 city = document.querySelector(".city"),

  HValue = document.getElementById("HValue"),
 WValue = document.getElementById("WValue"),
 SRValue = document.getElementById("SRValue"),
 SSValue = document.getElementById("SSValue"),
 CValue = document.getElementById("CValue"),
 UValue = document.getElementById("UValue"),
 PValue = document.getElementById("PValue"),

 Forecast  = document.querySelector(".Forecast");

WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=687231bb013910ae15e7eb729f94756e&q=`;

/*WEATHER_DATA_ENDPOINT=`https://api.openweathermap.org/data/2.5/onecall?appid=687231bb013910ae15e7eb729f94756e&exclude=minutely&units=metric&`;
*/

/*const API_KEY = "687231bb013910ae15e7eb729f94756e";*/

function findUserLocation() {
    fetch(WEATHER_API_ENDPOINT+ userLocation.value)
    .then((response) => response.json())
    .then((data) =>{

        if (data.cod!='' && data.cod!=200){
            alert(data.message);
            return;
        }
    console.log(data);

    city.innerHTML=data.name+", "+data.sys.country;
    weatherIcon.style.background=`url( https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`

    temperature.innerHTML = TemConverter(data.main.temp);
    feelsLike.innerHTML = "Feels like " + data.main.feels_like+"°C";
    description.innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp;`+
        data.weather[0].description;

        const options={
            weekday: "long",
            month:"long",
            day:"numeric",
            hour:"numeric",
            minute:"numeric",
            hour12: true,
        };
    
    date.innerHTML = getLongFormatDateTime(
        data.dt, 
        data.timezone, 
        options
    );
    
    HValue.innerHTML = data.main.humidity+ "<span>%</span>";
    WValue.innerHTML = data.wind.speed+ "<span>m/s</span>";
        
        const options1 = {
            hour:"numeric",
            minute:"numeric",
            hour12: true,
        };
    SRValue.innerHTML = getLongFormatDateTime(data.sys.sunrise, data.timezone, options1);
    SSValue.innerHTML = getLongFormatDateTime(data.sys.sunset, data.timezone, options1);

    CValue.innerHTML = data.clouds.all+ "<span>%</span>";
    /*UValue.innerHTML = data.visibility+"<span>m</span>"; /*UV is changed to Coordinates*/
    PValue.innerHTML = data.main.pressure+ "<span>hPa</span>";


    /*
    fetch(
        WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`
        )
        .then((response) => response.json())
        .then((data) =>{
           console.log(data) ;
        });
        */
    });
}

function formatUnixTime(dtValue, offset, options={}){
    const date = new Date((dtValue + offset)*1000);
    return date.toLocaleTimeString([], {timeZone: "UTC", ...options});
}

function getLongFormatDateTime(dtValue, offset, options){
    return formatUnixTime(dtValue, offset, options)
}

function TemConverter(temp){
    let tempValue = Math.round(temp);
    let message="";
    if (converter.value == "°C"){
        message = tempValue + "<span>"+"\xB0C</span>";
    }
    else{
        let ctof= (tempValue*9) / 5 + 32;
        message = ctof + "<span>"+"\xB0F</span>";
    }
    return message;
}