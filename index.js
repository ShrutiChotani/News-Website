// 903420b0f8f34d4c8a7add87aabbf611

let country = "in";
let apiKey = "903420b0f8f34d4c8a7add87aabbf611";
let newsCard = document.getElementById("newsCard");
let page = 1;
let pageSize = 6;
let totalResult;
let newsArticles = []; // Array to store the original news articles

display();

function display() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`,
    true
  );

  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      totalResult = json.totalResults;
      newsArticles = json.articles; // Store the original news articles
      let newsHtml = "";
      newsArticles.forEach(function (element) {
        let news = `<div class="col-md-4">
          <div class="card mb-3 noteCard">
            <img src="${!element.urlToImage ? "newsalt.jpg" : element.urlToImage}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">
                ${element.description}
              </p>
              <p class="card-text">
                <small class="text-muted">Published: ${new Date(element.publishedAt).toGMTString().substr(0, 25)}</small>
              </p>
              <a href="${element.url}" target="_blank">Read More</a>
            </div>
          </div>
        </div>`;
        newsHtml += news;
      });
      newsCard.innerHTML = newsHtml;
    } else {
      console.log("Some error occurred");
    }
  };

  xhr.send();
}

function handleNextClick() {
  if(page>=1){
    document.getElementById("prev").disabled = false;
  }
  if(page+1 >= Math.ceil(totalResult/pageSize)){
    document.getElementById("next").disabled = true;
  }
  page = page+1;
  display();
}

function handlePrevClick(){
  if(page<=2){
    document.getElementById("prev").disabled = true;
  }
  page = page-1;
  display();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let filteredArticles = newsArticles.filter(function (article) {
    return article.title.toLowerCase().includes(inputVal);
  });

  let newsHtml = "";
  filteredArticles.forEach(function (element) {
    let news = `<div class="col-md-4">
      <div class="card mb-3 noteCard">
        <img src="${!element.urlToImage ? "newsalt.jpg" : element.urlToImage}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">
            ${element.description}
          </p>
          <p class="card-text">
            <small class="text-muted">Published: ${new Date(element.publishedAt).toGMTString().substr(0, 25)}</small>
          </p>
          <a href="${element.url}" target="_blank">Read More</a>
        </div>
      </div>
    </div>`;
    newsHtml += news;
  });

  newsCard.innerHTML = newsHtml;
});

// On page load, disable the 'Previous' button initially
document.getElementById("prev").disabled = true;
