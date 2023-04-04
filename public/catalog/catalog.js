
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
    for (let i = 0; i < 6; i++) {
      list.innerHTML += `
      <div id="${data.results[i].id}" class="movie" onclick="showMovieInfo(${data.results[i].id})">
        <img class="poster" src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" alt="Poster de la película ${data.results[i].title}">
        <div class="movie-footer">
          <div class="title">${data.results[i].title}</div>
        </div>
      </div>`;
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
    for (let i = 0; i < 6; i++) {
      list.innerHTML += `
      <div id="${data.results[i].id}" class="serie" onclick="showSerieInfo(${data.results[i].id})">
        <img class="poster" src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" alt="Poster de la película ${data.results[i].original_name}">
        <div class="movie-footer">
          <div class="title">${data.results[i].original_name}</div>
        </div>
      </div>`;
    }
  })
  .catch(error => {
    console.error(error);
  });
}

function showSerieInfo(idSerie) {
  const container = document.getElementById("container");
  container.className = "serie-info-container";
  container.innerHTML = "<div class='go-back' onclick='returnToList();'>Volver atrás\n</div>\n<hr>";
  const serieTitle = document.getElementById("serie-title");
  const smallContainer = document.createElement("div");
  smallContainer.className = "small-container";

  fetch(`https://api.themoviedb.org/3/tv/${idSerie}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      container.innerHTML += `
      <h1 class="serie-h1">${data.name}</h1>
      <div class="small-container">
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="Portada de la serie ${data.name}" id="serie-poster">
        <div id="info-body">
          <div class="additional-info">
            <p class="release-date">Primera emisión: ${data.first_air_date}</p>            
          </div>
        </div>
      </div>`;
      const additionalInfo = document.getElementsByClassName("additional-info");
      if (data.episode_run_time > 0) {
        additionalInfo[0].innerHTML += `<p class="runtime">Duración aproximada episodio: ${data.episode_run_time} minutos</p>`;
      }
      const genres = document.createElement("p");
      genres.className = "genres";
      genres.innerText = "Género/s: ";
      for (let i = 0; i < data.genres.length; i++) {
        if (i < data.genres.length - 1) {
          genres.innerText += `${data.genres[i].name}, `;
        } else {
          genres.innerText += `${data.genres[i].name}`;
        }
      }
      additionalInfo[0].appendChild(genres);
      const infoBody = document.getElementById("info-body");
      infoBody.innerHTML += `<div class="sinopsis">${data.overview}</div>`;
    })
    .catch(error => {
      console.error(error);
    });
}

function showMovieInfo(idMovie) {
  let container = document.getElementById("container");
  container.className = "movie-info-container";
  container.innerHTML = "<div class='go-back' onclick='returnToList();'>Volver atrás</div>";
  let movieTitle = document.getElementById("movie-title");
  let smallContainer = document.createElement("div");
  smallContainer.className = "small-container";
  
  fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    container.innerHTML += `
      </h1 class="movie-h1">${data.title}<hr>
      <div class="small-container">
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="Portada de la película ${data.title}" id="movie-poster">
        <div id="info-body">
          <div class="additional-info">
            <p class="release-date">Fecha de estreno: ${data.release_date}</p>            
          </div>
        </div>
      </div>`;
      const additionalInfo = document.getElementsByClassName("additional-info");
      if (data.runtime > 0) {
        additionalInfo[0].innerHTML += `<p class="runtime">Duración: ${data.runtime} minutos</p>`;
      }
      const genres = document.createElement("p");
      genres.className = "genres";
      genres.innerText = "Género/s: ";
      for (let i = 0; i < data.genres.length; i++) {
        if (i < data.genres.length - 1) {
          genres.innerText += `${data.genres[i].name}, `;
        } else {
          genres.innerText += `${data.genres[i].name}`;
        }
      }
      additionalInfo[0].appendChild(genres);
      const infoBody = document.getElementById("info-body");
      infoBody.innerHTML += `<div class="sinopsis">${data.overview}</div>`;
  })
  .catch(error => {
    console.error(error);
  });
}

function returnToList() {
  page = 1;
  const container = document.getElementById("container");
  container.className = "";
  container.innerHTML = `
    <h2 class="section-title">Películas</h2>
    <hr>
    <div id="movie-list">

    </div>
    <div class="show-more" onclick="redirectToMovies()">Mostrar más películas</div>
    <div id="series">
      <h2 class="section-title">Series</h2>
      <hr>
      <div id="series-list">

    </div>
    <div class="show-more" onclick="redirectToSeries()">Mostrar más series</div>`;
  // getGenres();
  getContent();
}

function redirectToMovies() {
  location.href = "../peliculas/peliculas.html";
}

function redirectToSeries() {
  location.href = "../series/series.html";
}