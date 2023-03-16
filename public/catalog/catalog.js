function getContent() {
  getMovies();
  getSeries();
}

window.onload = getContent;

function getMovies() {
  const list = document.getElementById("movie-list");
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1}`)
  .then(response => {
    return response.json();
  })
  .then(data => {//Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
    for (let i = 0; i < 5; i++) {
      let divMovie = document.createElement("div");
      divMovie.className = "movie";
      divMovie.id = data.results[i].id;
      let img = document.createElement("img");
      img.className = "poster";
      img.src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
      img.alt = data.results[i].title;
      let divMovieFooter = document.createElement("div");
      divMovieFooter.className = "movie-footer";
      let footerTitle = document.createElement("div");
      footerTitle.className = "title";
      footerTitle.innerText = data.results[i].title;
      divMovieFooter.appendChild(footerTitle);
      divMovie.appendChild(img);
      divMovie.appendChild(divMovieFooter);
      list.appendChild(divMovie);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

function getSeries() {
  const list = document.getElementById("series-list");
  fetch(`https://api.themoviedb.org/3/discover/tv?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1}`)
  .then(response => {
    return response.json();
  })
  .then(data => {//Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
    for (let i = 0; i < 5; i++) {
      let divSerie = document.createElement("div");
      divSerie.className = "serie";
      divSerie.id = data.results[i].id;
      let img = document.createElement("img");
      img.className = "poster";
      img.src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
      img.alt = data.results[i].title;
      let divSerieFooter = document.createElement("div");
      divSerieFooter.className = "movie-footer";
      let footerTitle = document.createElement("div");
      footerTitle.className = "title";
      footerTitle.innerText = data.results[i].original_name;
      divSerieFooter.appendChild(footerTitle);
      divSerie.appendChild(img);
      divSerie.appendChild(divSerieFooter);
      list.appendChild(divSerie);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

function redirectToMovies() {
  location.href = "../peliculas.html";
}

function redirectToSeries() {
  location.href = "../series.html";
}