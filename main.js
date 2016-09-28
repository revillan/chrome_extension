document.addEventListener("DOMContentLoaded", () => {


  let news = new XMLHttpRequest();

  let background = new XMLHttpRequest();

  background.open("GET", "http://www.splashbase.co/api/v1/images/random?images_only=true");

  let back = document.getElementById("back");

  background.onreadystatechange = () => {
    if (background.readyState ===  XMLHttpRequest.DONE && background.status === 200) {
        console.log(background.responseText);
        let img = document.createElement("img");
        img.setAttribute("src", JSON.parse(background.responseText).url);
        img.className = "embed";
        back.appendChild(img);
        console.log(JSON.parse(background.responseText).url);
    }
  };

  background.send();

  news.open("GET",
  "https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=a7f0150b20c540278a4f18db9d5616c4", true);

  let box = document.getElementById("main");

  news.onreadystatechange = () => {
    if(news.readyState === XMLHttpRequest.DONE && news.status === 200) {
      let articles = JSON.parse(news.responseText)["articles"];
      let title, main, link, pic;
      for (let i = 0; i < articles.length; i++) {
        main = box.appendChild(document.createElement("div"));
        main.className = "inner-box";
        title = document.createElement("div");
        title.appendChild(document.createTextNode(articles[i]["title"]));
        title.className = "headline";
        link = document.createElement("a");
        pic = document.createElement("img");
        pic.className = "thumb";
        pic.setAttribute("src", articles[i]["urlToImage"]);
        link.setAttribute("href", articles[i]["url"]);
        main.appendChild(link);
        link.appendChild(pic);
        link.appendChild(title);
      }
    }
  };

  news.send();

  var startPos;



  var geoSuccess = function(position) {
    startPos = position;
    let coords = [startPos.coords.latitude, startPos.coords.longitude];
    // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    let weather = new XMLHttpRequest();
    let api = "38f0f175e67d3cf9f0fff17b3c74f368";

    weather.open("GET",`http://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=imperial&APPID=${api}`);

    weather.onreadystatechange = () => {
      if (weather.readyState === XMLHttpRequest.DONE && weather.status === 200) {
        console.log(JSON.parse(weather.responseText));
        let data = JSON.parse(weather.responseText);
        let current = document.getElementById("weather");
        let name = document.createElement("div");
        name.appendChild(document.createTextNode(data.name));
        let curTemp = document.createElement("div");
        curTemp.appendChild(document.createTextNode(data.main.temp + " °F"));
        let icon = document.createElement("img");
        icon.setAttribute("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
        console.log(name);
        name.className = "city";
        curTemp.className = "temp";
        current.appendChild(name);
        current.appendChild(icon);
        current.appendChild(curTemp);
      }
    };

    weather.send();
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
});

// <iframe id="player" frameborder="0" height="100%" width="100%"
//     src="https://youtube.com/embed/ceP_zvyM3A4?autoplay=1&enablejsapi=1&controls=0&showinfo=0&autohide=1">
// </iframe>
