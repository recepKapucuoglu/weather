const url1 = "http://api.openweathermap.org/geo/1.0/"; // enlemboylam datası
const url2 = "https://api.openweathermap.org/data/2.5/"; // şehrin adı datası   //
const key = "38a97c1d0c3404a2f6d30cf5133de28e"; // siteden verilen kişisel key.

const setQuery = (e) => {
  if (e.keyCode == "13") getResult(aramaBar.value); // enter =13 demek. (entere basıldıgında  getresult calıssın> aramabarına yazılan value yi alsın)
};

const getResult = (cityName) => {
  //   console.log(cityName);
  let query = `${url1}direct?q=${cityName}&appid=${key}`; //sitenin verdigi link sablonuna kenndi aratmak isteyecegimiz degerleri dinakmik belirerek yazdık.
  fetch(query)
    .then((result) => {
      return result.json();
    })
    .then(latslons); // meridyenler . api linkinde bu oldugu için bu fonksiyonu cagırdık
};

const latslons = (res) => {
  const lat = res[0].lat; // girilen şehrin meridyen degerleri enlem
  const lon = res[0].lon; //  girilen şehrin meridyen degerleri boylam

  let query2 = `${url2}weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=tr`; //unit =metric  >hava derecesinin C cinsinden olsun.
  fetch(query2)
    .then((result2) => {
      return result2.json();
    })
    .then(finalResult);
};

const finalResult = (weather) => {
  //hava bilgileri
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(weather.main.temp)} C°`;

  let desc = document.querySelector(".desc");
  desc.innerText = weather.weather[0].description; // hava yorumu => açık ,parcalı vs.

  /* var stilDegistir= (stil)=>
{
document.getElementById("yazi").className=stil;
}*/

  let minmax = document.querySelector(".minmax"); //hava en az en yüksek derecesi
  minmax.innerText = `${Math.round(weather.main.temp_min)} C° / ${Math.round(
    // hava derecesinin küsüratlı gözükmemesi
    weather.main.temp_max
  )} C°`;
};
const aramaBar = document.getElementById("aramaBar");
aramaBar.addEventListener("keypress", setQuery); /*enter ' e basıldıgında */
