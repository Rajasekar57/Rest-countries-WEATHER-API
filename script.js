var container=document.createElement("div");
container.className="container";
var row=document.createElement("div");
row.classList.add("row","m-3");
container.append(row);

var res=fetch("https://restcountries.com/v2/all");
res.then((data)=>data.json())
.then((data1)=>foo(data1))
.catch((error)=>console.log(error));
var countries;

function foo(data1){
    countries=data1;
    console.log(data1);
    for(var i=0;i<data1.length;i++){
        var id_val=i;
        try{
            var lat=data1[i].latlng[0];
            var lng=data1[i].latlng[1];
        }
        catch{
            var lat="no_val";
            var lng="no_val";
        }
        row.innerHTML +=
        `<div class="col-lg-4 col-md-6 col-sm-12  text-center">
            <div class="card card-header card-body" style="width: 18rem;"  ><br>
                <h5 class="card-title">${data1[i].name}</h5>
                <img src="${data1[i].flag}" class="card-img-top" alt="Flag">
                <div class="card-body" id="${id_val}">
                <p class="card-text">Capital : ${data1[i].capital}</p>
                <p class="card-text">Region : ${data1[i].region}</p>
                <p class="card-text">Country Code : ${data1[i].alpha3Code}</p>
                <button class="btn btn-primary" value="${id_val},${lat},${lng}" onclick="weathervalues(value)">Click for Weather</button>
                </div>
            </div>
        </div>`
    }
    document.body.append(container);
}
var Temperatue;
var Humidity;
var Weather;
function weathervalues(val){
    var values=val.split(",");
    var i=+values[0];
    var latValue=+values[1];
    var lngValue=+values[2];
if(latValue!="no_val" && lngValue!="no_val"){
    var url=`https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lngValue}&appid=49f17076fea2c5a7d7a7d4373d7cc9bf`;
    var res=fetch(url);
    res.then((data)=>data.json())
    .then((weatherdata)=>{
        Temperatue=weatherdata.main.temp;
        Humidity=weatherdata.main.humidity;
        Weather=weatherdata.weather[0].description;
    })
    .catch(()=>{
        document.getElementById(i).innerHTML=
        `
            <p class="card-text">Capital : ${countries[i].capital}</p>
            <p class="card-text">Region : ${countries[i].region}</p>
            <p class="card-text">Country Code : ${countries[i].alpha3Code}</p>
        `
    });
    if(Temperatue!=undefined){
        document.getElementById(i).innerHTML=
        `
            <p class="card-text">Capital : ${countries[i].capital}</p>
            <p class="card-text">Region : ${countries[i].region}</p>
            <p class="card-text">Country Code : ${countries[i].alpha3Code}</p>
            <p class="card-text">Temperature : ${Temperatue}</p>
            <p class="card-text">Humidity : ${Humidity}</p>
            <p class="card-text">Weather : ${Weather}</p>
        `
    }
}
else{
    document.getElementById(i).innerHTML=
    `
        <p class="card-text">Capital : ${countries[i].capital}</p>
        <p class="card-text">Region : ${countries[i].region}</p>
        <p class="card-text">Country Code : ${countries[i].alpha3Code}</p>
        <p class="card-text">Sorry We can't get Weather</p>
    `
}
}