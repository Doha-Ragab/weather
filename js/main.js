// / <reference path="../typings/globals/jquery/index.d.ts" />

let curday=document.getElementById("curday")
let curdate=document.getElementById("curdate")
let curmonth=document.getElementById("curmonth")
let secday=document.getElementById("secday")
let thirdday=document.getElementById("thirdday")
let cityname=document.getElementById("cityname")
let dgreetoday=document.getElementById("dgreetoday")
let icontoday=document.getElementById("icontoday")
let desctoday=document.getElementById("desctoday")
let humiditytod =document.getElementById("humidity")
let wind =document.getElementById("wind")
let windDirection=document.getElementById("windDirection")
let btnSearch=document.getElementById("btnSearch")
let searchinput=document.getElementById("searchinput")

let iconnext=document.getElementById("iconnext")
let maxDnext=document.getElementById("maxd-next")
let minDnext=document.getElementById("mind-next")
let descnext=document.getElementById("descnext")

let iconAnext=document.getElementById("iconAnext")
let maxDAnext=document.getElementById("maxd-Anext")
let minDAnext=document.getElementById("mind-Anext")
let descAnext=document.getElementById("descAnext")

let date=new Date();
let weekDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let monthName = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec']
let currentcity;
currentcity="cairo"

// search
btnSearch.addEventListener("click",function() {
  search()
  
})
searchinput.addEventListener("keyup",function() {
  search()
  
})

function search(){
  if(searchinput.value=="")
  {
    currentcity="cairo"
    cityname.innerText="cairo"
    console.log(currentcity)
    city();
    dgreeToday();
    iconToday ();
    descToday() ;
    details() 
    nextDay()
    afternextDay()
  
  }
  else{
    currentcity=searchinput.value;
    cityname.innerText=searchinput.value;
    city();
    dgreeToday();
    iconToday ();
    descToday() ;
    details() 
    nextDay()
    afternextDay()
  }
}
  


async function currentWeather(){
 
    curday.innerText= weekDay[date.getDay()];
    curdate.innerText=date.getDate()
    curmonth.innerText=monthName[date.getMonth()]
    city();
    dgreeToday();
    iconToday ();
    descToday() ;
    details() 
    nextDay()
    afternextDay()
}

currentWeather();


// city
async function city() {  
  
  let todayweather= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce8f3197370a4ba5b8250353210110&q=${currentcity}`)
  let x= await todayweather.json()
 
    cityname.innerText=x.location.name;  
}

async function dgreeToday() { 
    let todayweather= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce8f3197370a4ba5b8250353210110&q=${currentcity}`)
    let x= await todayweather.json()
    let dgree=x.current.temp_c;
   dgreetoday.innerText=dgree;
   console.log(todayweather)

 }
  
async function iconToday () {
    let todayweather= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce8f3197370a4ba5b8250353210110&q=${currentcity}`)
    let x= await todayweather.json()
    let icont=x.current.condition.icon;
    $("#icontoday").attr("src","https:"+icont)
    
  }
  async function descToday() { 
    let todayweather= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ce8f3197370a4ba5b8250353210110&q=${currentcity}`)
    let x= await todayweather.json()
    let desct=x.current.condition.text;
    // console.log(desct)
    desctoday.innerText=desct;
   }
   async function details() {
    let todayweather= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce8f3197370a4ba5b8250353210110&q=${currentcity}`)
    let x= await todayweather.json()

    let hum =x.current.humidity;
    humiditytod.innerText=hum

    let windtod=x.current.wind_kph;
    wind.innerText=windtod;
    
    let windd=x.current.wind_dir;
    windDirection.innerText=windd;
       
   
   }
  async function nextDay() {

    let todayweather= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce8f3197370a4ba5b8250353210110&q=${currentcity}&q=07112&days=3`)
    let x= await todayweather.json()

    let nexticon=x.forecast.forecastday[1].day.condition.icon;
    console.log(nexticon)
   $("#iconnext").attr("src","https:"+nexticon)

   let nextmax=x.forecast.forecastday[1].day.maxtemp_c;
   maxDnext.innerText=nextmax;

   let nextmin=x.forecast.forecastday[1].day.mintemp_c;
   minDnext.innerText=nextmin;

   let nextdes=x.forecast.forecastday[1].day.condition.text;
   descnext.innerText=nextdes

   let day2=x.forecast.forecastday[1].hour[0].time
   let d2 = new Date(day2);
   

secday.innerText=weekDay[d2.getDay()]
console.log(weekDay[d2.getDay()])
   }
   async function afternextDay() {

    let todayweather= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce8f3197370a4ba5b8250353210110&q=${currentcity}&q=07112&days=3`)
    let x= await todayweather.json()

    let aNexticon=x.forecast.forecastday[2].day.condition.icon;
    console.log(aNexticon)
   $("#iconAnext").attr("src","https:"+aNexticon)

   let aNextmax=x.forecast.forecastday[2].day.maxtemp_c;
   maxDAnext.innerText=aNextmax;

   let aNextmin=x.forecast.forecastday[2].day.mintemp_c;
   minDAnext.innerText=aNextmin;

   let aNextdes=x.forecast.forecastday[2].day.condition.text;
   descAnext.innerText=aNextdes
let day3=x.forecast.forecastday[2].hour[0].time
let d3 = new Date(day3);

thirdday.innerText=weekDay[d3.getDay()]
   }
   
