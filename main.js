document.addEventListener("DOMContentLoaded", () => {


  let news = new XMLHttpRequest();

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
        title = document.createTextNode(articles[i]["title"]);
        link = document.createElement("a");
        pic = document.createElement("img");
        pic.setAttribute("src", articles[i]["urlToImage"]);
        link.setAttribute("href", articles[i]["url"]);
        main.appendChild(link);
        link.appendChild(pic);
        link.appendChild(title);
    }
    }
  };

  news.send();
});

// <iframe id="player" frameborder="0" height="100%" width="100%"
//     src="https://youtube.com/embed/ceP_zvyM3A4?autoplay=1&enablejsapi=1&controls=0&showinfo=0&autohide=1">
// </iframe>
