let page = 1;
let genre = 0;
let search = "";

function getMovieList() {
  let list = document.getElementById("movie-list");
  getGenres();
  if (genre == 0) {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${+page}`)
    .then(response => {
      return response.json();
    })
    .then(data => {//Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.results.length; i++) {
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
    } else {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${+page}&with_genres=${+genre}`)
    .then(response => {
      return response.json();
    })
    .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.results.length; i++) {
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
}

//Petición a la api para añadir los options al select que filtrará por género
function getGenres() {
  const genreFilter = document.getElementById("genre-filter");
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
  .then(response => {
    return response.json();
  })
  .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
    for (let i = 0; i < data.genres.length; i++) {
      genreFilter.innerHTML += `<option value="${data.genres[i].id}">${data.genres[i].name}</option>`;
    }
  })
  .catch(error => {
    console.error(error);
  });
}

window.onload = getMovieList;
 
 //PÁGINA DE PELÍCULA/SERIE/JUEGO/LIBRO. 550 deberá cambiarse por la id de la película sobre la que se haga click en la web. Adaptar código a necesidades

function showMovieInfo(idMovie) {
  let container = document.getElementById("container");
  container.className = "movie-info-container";
  container.innerHTML = "<div class='go-back' onclick='returnToList();'>Volver atrás\n</div><h1 id='movie-title'></h1>\n<hr>";
  let movieTitle = document.getElementById("movie-title");
  let smallContainer = document.createElement("div");
  smallContainer.className = "small-container";
  
  fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    container.innerHTML += `
      <div class="small-container">
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="Portada de la película ${data.name}" id="movie-poster">
        <div id="info-body">
          <div class="additional-info">
            <p class="release-date">Fecha de estreno: ${data.first_air_date}</p>            
          </div>
        </div>
      </div>`;
      const additionalInfo = document.getElementsByClassName("additional-info");
      if (data.episode_run_time > 0) {
        additionalInfo[0].innerHTML += `<p class="runtime">Duración: ${data.episode_run_time} minutos</p>`;
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
  let container = document.getElementById("container");
  container.className = "";
  container.innerHTML = `
  <div id="container-select">
    <h2 class="section-title">Películas</h2>
    <select name="Filtro por género" id="genre-filter" onchange="genreFilter()">
      <option value="0">Selecciona un género</option>
      <option value="0">Todos</option>
    </select>
  </div>
  
  <hr>
  <div id="movie-list">
  </div>
  <div class="show-more" onclick="showMore()">Mostrar más</div>`;
  // getGenres();
  getMovieList();
}

//Esta función incrementa en 1 el valor de page, realizando una petición a la página siguiente de la api
function showMore() {
  page++;
  let searchValue = document.getElementById("search");
  // if (searchValue.value !== "") {
  //   searchMovie();
  // } else {
    getMovieList();
  // }
}

function genreFilter() {
  page = 1;
  let list = document.getElementById("movie-list");
  genre = document.getElementById("genre-filter").value;
  list.innerHTML = "";
  getMovieList();
}

function searchMovie() {
  if (search === "") {
    page = 1;
  }
  let list = document.getElementById("movie-list");
  if (page === 1) {
    list.innerHTML = "";
  }
  search = document.getElementById("search").value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&query=${search}&page=${page}&include_adult=false`)
    .then(response => {
      return response.json();
    })
    .then(data => {//Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.results.length; i++) {
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
