
const url = "https://api.openweathermap.org/data/2.5/";
const apiKey = "2eb81dbbc391e437ee25f9116e66cc1d";

let msgSpan = document.querySelector("div.container span");

const getResult = async (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`;
  try{

  // const response = await fetch(query).then((weather) => {
  //   return weather.json();
  // });
  const response = await axios(query);

  console.log(response);
  displayResult(response);

  //Event Bubbling
  // document.querySelectorAll("*").forEach((el) => {
  //   el.addEventListener("click", (e) =>{
  //     alert(`${e.target.tagName} is Clicked!!!`)
  //   })
  // });

}
  catch(e) {
    msgSpan.innerText = e;
  }
};

const Unload = (searchBar) => {
  searchBar.value = "";
};
const displayResult = (result) => {
  //object destructuring
  const { main, sys, name, weather } = result.data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const carpUrl = `çarpı.png`;
  
  cityList = document.querySelectorAll("li span");
  if (cityList.length > 0) {

    const mapArray = Array.from(cityList).map(city => city.innerText);
    if (!mapArray.includes(name)){
      const li = document.createElement("li");
      li.classList.add("city");
      li.innerHTML += ` <img class="carpı-smbl" src="${carpUrl}" style="margin:-30px -15px auto auto; width:25px; height:25px" >
      <h2 class="city-name" data-name="${name}, ${sys.country}">
                            <span>${name}</span>
                            <sup>${sys.country}</sup>
                       </h2>
                      <div class="city-temp">${Math.round(
                        main.temp
                      )}<sup>°C</sup></div>
                        <figure>
                          <img class="city-icon" src="${iconUrl}">
                          <figcaption>${weather[0].description}</figcaption>
                        </figure>`;
      document.querySelector(".cities").append(li);
    }
    else{
      
      msgSpan.innerText = `${name} şehri zaten bulunuyor, başka şehir deneyiniz!`;
      msgSpan.style.color = "red";
      setTimeout(()=>{
        a(msgSpan);
      }, 3000);

    }
  }

  else{
    const li = document.createElement("li");
    li.classList.add("city");
    li.innerHTML += ` <img class="carpı-smbl" src="${carpUrl}" style="margin:-30px -15px auto auto; width:25px; height:25px" >
                      <h2 class="city-name" data-name="${name}, ${sys.country}">
                          <span>${name}</span>
                          <sup>${sys.country}</sup>
                     </h2>
                    <div class="city-temp">${Math.round(
                      main.temp
                    )}<sup>°C</sup></div>
                      <figure>
                        <img class="city-icon" src="${iconUrl}">
                        <figcaption>${weather[0].description}</figcaption>
                      </figure>`;
    document.querySelector(".cities").append(li);
  }
}

function a(msgSpan) {
  msgSpan.innerText = "";
  }
const searchBar = document.querySelector("div.container input");
  const form = document.querySelector("div.container form");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    getResult(searchBar.value);
    Unload(searchBar);
    if (searchBar.value == "") {
      msgSpan.innerText = "Lütfen bir şehir ismi giriniz.";
      return false;
    } 
  });

  //Event Capturing
   document.querySelector("ul").addEventListener("click", (event)=>{
    if(event.target.className == "carpı-smbl"){
     event.target.closest("li").remove();
    }
 });
  


