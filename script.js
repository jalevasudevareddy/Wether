var wetherInfo={};
window.addEventListener('load',()=>{
    var lat,long;
    var country,locationKey,timeZone,locationName;
    navigator.geolocation.getCurrentPosition((position)=>{
        lat = position['coords']['latitude'];
        long = position['coords']['longitude'];
        console.log(lat+' '+long);
        apiKey='48Dcyd97aeWRq0q4zTa7gXwaTyBuqLCK'
        var geopositionUrl=`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}`;
        console.log(geopositionUrl);
        axios.get(geopositionUrl)
            .then((response)=>{
                console.log(response);
                wetherInfo['country']=response.data.Country.EnglishName;
                wetherInfo['locationKey']=response.data.Key;
                wetherInfo['timeZone']=response.data.TimeZone;
                wetherInfo['currentLocation']=response.data.LocalizedName;
                console.log(wetherInfo);
                getWetherData(wetherInfo.locationKey,apiKey);
            })
    })
})
function getWetherData(locationKey,apiKey){
    var wetherUrl=`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}`;
    console.log(wetherUrl);
    axios.get(wetherUrl)
        .then((response)=>{
            console.log(response);
            wetherInfo['today']= response.data.DailyForecasts[0].Date;
            wetherInfo['day']=response.data.DailyForecasts[0].Day;
            wetherInfo['night']=response.data.DailyForecasts[0].Night;
            wetherInfo['temparature']=response.data.DailyForecasts[0].Temperature;
            console.log('Hi',wetherInfo);
            var today=new Date(wetherInfo['today'])
            returnId('country').textContent=wetherInfo['country'];
            returnId('currntLocation').textContent=wetherInfo['currentLocation'];
            returnId('date').textContent=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            if(wetherInfo.day.Icon <10){
                returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${wetherInfo.day.Icon}-s.png`);
            }
            else{
                returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${wetherInfo.day.Icon}-s.png`)
            }
            if(wetherInfo.night.Icon <10){
                returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${wetherInfo.night.Icon}-s.png`);
            }
            else{
                returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${wetherInfo.night.Icon}-s.png`)
            }
            returnId('morning-desc').textContent=wetherInfo.day.IconPhrase;
            returnId('night-desc').textContent=wetherInfo.night.IconPhrase;
        })
}

function returnId(id){
    return document.getElementById(id);
}