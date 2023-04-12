let page = 1;
let genre = 0;
let search = "";

function getSeriesList() {
  getSeriesGenres();
  if (genre == 0) {
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${+page}`)
      .then(response => {
        return response.json();
      })
      .then(data => { // Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
        for (let i = 0; i < data.results.length; i++) {
          buildListHTML(data.results[i]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${+page}&with_genres=${+genre}`)
      .then(response => {
        return response.json();
      })
      .then(data => { // Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
        for (let i = 0; i < data.results.length; i++) {
          buildListHTML(data.results[i]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

function getSeriesGenres() {
  const genreFilter = document.getElementById("genre-filter");
  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES")
    .then(response => {
      return response.json();
    })
    .then(data => { // Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.genres.length; i++) {
        genreFilter.innerHTML += `<option value="${data.genres[i].id}">${data.genres[i].name}</option>`;
      }
    })
    .catch(error => {
      console.error(error);
    });
}

window.onload = getSeriesList;

// PÁGINA DE PELÍCULA/SERIE/JUEGO/LIBRO. 550 deberá cambiarse por la id de la película sobre la que se haga click en la web. Adaptar código a necesidades

function showSerieInfo(idSerie) {
  const container = document.getElementById("container");
  container.className = "serie-info-container";
  container.innerHTML = "<div class='go-back' onclick='returnToList();'>Volver atrás\n</div>\n";
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
      <hr/>
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

function returnToList() {
  page = 1;
  const container = document.getElementById("container");
  container.className = "";
  container.innerHTML = `
  <div id="container-select">
    <h2 class="section-title">Series</h2>
    <select name="Filtro por género" id="genre-filter" onchange="genreFilter()">
      <option value="0">Selecciona un género</option>
      <option value="0">Todos</option>
    </select>
  </div>
  <hr>
  <div id="series-list">

  </div>
  <div class="show-more" onclick="showMore()">Mostrar más</div>`;
  // getGenres();
  getSeriesList();
}

// Esta función incrementa en 1 el valor de page, realizando una petición a la página siguiente de la api
function showMore() {
  page++;
  const searchValue = document.getElementById("search");
  // if (searchValue.value !== "") {
  //   searchSerie();
  // } else {
    getSeriesList();
  // }
}

function genreFilter() {
  const list = document.getElementById("series-list");
  page = 1;
  genre = document.getElementById("genre-filter").value;
  list.innerHTML = "";
  getSeriesList();
}

function searchSerie() {
  const list = document.getElementById("series-list");
  if (search === "") {
    page = 1;
  }
  if (page === 1) {
    list.innerHTML = "";
  }
  search = document.getElementById("search").value;
  fetch(`https://api.themoviedb.org/3/search/tv?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&query=${search}&page=${page}&include_adult=false`)
    .then(response => {
      return response.json();
    })
    .then(data => { // Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.results.length; i++) {
        buildListHTML(data.results[i]);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function buildListHTML(serie) {
  const list = document.getElementById("series-list");
  list.innerHTML += `
    <div id="${serie.id}" class="serie" onclick="showSerieInfo(${serie.id})">
      <img class="poster" src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="Poster de la serie ${serie.name}">
      <div class="serie-footer">
        <div class="title">${serie.name}</div>
      </div>
    </div>`;
}
