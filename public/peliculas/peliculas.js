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
        let divMovie = document.createElement("div");
        divMovie.className = "movie";
        divMovie.id = data.results[i].id;
        divMovie.onclick = function() {
          showMovieInfo(data.results[i].id);
        };
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
    } else {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${+page}&with_genres=${+genre}`)
    .then(response => {
      return response.json();
    })
    .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.results.length; i++) {
        // let li = document.createElement("li");
        // li.innerText = data.results[i].title;
        let divMovie = document.createElement("div");
        divMovie.className = "movie";
        divMovie.id = data.results[i].id;
        divMovie.onclick = function() {
          showMovieInfo(data.results[i].id);
        };
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
}



function getSeriesGenres() {
  fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
  .then(response => {
    return response.json();
  })
  .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
    for (let i = 0; i < data.genres.length; i++) {
      let genreFilter = document.getElementById("genre-series-filter");
      let genre = document.createElement("option");
      genre.value = data.genres[i].id;
      genre.innerText = data.genres[i].name;
      genreFilter.appendChild(genre);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

//Petición a la api para añadir los options al select que filtrará por género
function getGenres() {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
  .then(response => {
    return response.json();
  })
  .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
    for (let i = 0; i < data.genres.length; i++) {
      let genreFilter = document.getElementById("genre-filter");
      let genre = document.createElement("option");
      genre.value = data.genres[i].id;
      genre.innerText = data.genres[i].name;
      genreFilter.appendChild(genre);
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
  container.innerHTML = "<div class='go-back' onclick='returnToList();'>Películas\n</div><h1 id='movie-title'></h1>\n<hr>";
  let movieTitle = document.getElementById("movie-title");
  let smallContainer = document.createElement("div");
  smallContainer.className = "small-container";
  
  fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    movieTitle.innerText = data.title;
    let cover = document.createElement("img");
    cover.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
    cover.setAttribute('alt', `Portada de ${data.title}`);
    cover.id = "movie-poster";
    let infoBody = document.createElement("div");
    infoBody.id = "info-body";
    let additionalInfo = document.createElement("div");
    additionalInfo.className = "additional-info";
    let releaseDate = document.createElement("p");
    releaseDate.className = "release-date";
    releaseDate.innerText = `Fecha de estreno: ${data.release_date}`;
    additionalInfo.appendChild(releaseDate);
    let runtime = document.createElement("p");
    runtime.className = "runtime";
    if (data.runtime > 0) {
      runtime.innerText = `Duración aproximada episodio: ${data.runtime} minutos`;
    }
    additionalInfo.appendChild(runtime);
    let genres = document.createElement("p");
    genres.className = "genres";
    genres.innerText = "Género/s: ";
    for (let i = 0; i < data.genres.length; i++) {
      if (i < data.genres.length - 1) {
        genres.innerText += `${data.genres[i].name}, `;
      } else {
        genres.innerText += `${data.genres[i].name}`;
      }
    }
    additionalInfo.appendChild(genres);
    let overview = document.createElement("div");
    overview.className = "sinopsis";
    overview.innerText = data.overview;
    smallContainer.appendChild(cover);
    infoBody.appendChild(additionalInfo);
    infoBody.appendChild(overview);
    smallContainer.appendChild(infoBody);
    container.appendChild(smallContainer);
  })
  .catch(error => {
    console.error(error);
  });
}

function returnToList() {
  page = 1;
  let container = document.getElementById("container");
  container.innerHTML = `<select name="Filtro por género" id="genre-filter" onchange="genreFilter()">
  <option value="0">Selecciona un género</option>
  <option value="0">Todos</option>
  </select>
  <h1>Películas</h1>
  <hr>
  <div id="movie-list">
  </div>
  <div id="show-more" onclick="showMore()">Mostrar más</div>`;
  // getGenres();
  getMovieList();
}

//PARA PAGINAR LISTA DE PELÍCULAS
// let prev = document.getElementById("previous");
// let next = document.getElementById("next");

// if (page === 1) {
//   prev.visibility = "hidden";
// }

// if (page === 500) {
//   next.visibility = "hidden";
// }

//Esta función incrementa en 1 el valor de page, realizando una petición a la página siguiente de la api
function showMore() {
  page++;
  let searchValue = document.getElementById("search");
  if (searchValue.value !== "") {
    searchMovie();
  } else {
    getMovieList();
  }
}

//Esta función disminuye en 1 el valor de page, realizando una petición a la página anterior de la api
// function previousPage() {
//   page--;
//   let content = "";
//   fetch(`https://api.themoviedb.org/3/movie/popular?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&page=${page}`)
//   .then(response => {
//     return response.json();
//   })
//   .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
//     for (let i = 0; i < data.results.length; i++) {
//       // let li = document.createElement("li");
//       // li.innerText = data.results[i].title;
//       let divMovie = document.createElement("div");
//       divMovie.className = "movie";
//       let img = document.createElement("img");
//       img.className = "poster";
//       img.src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
//       img.alt = data.results[i].title;
//       let divMovieFooter = document.createElement("div");
//       divMovieFooter.className = "movie-footer";
//       let footerTitle = document.createElement("div");
//       footerTitle.className = "title";
//       footerTitle.innerText = data.results[i].title;
//       divMovieFooter.appendChild(footerTitle);
//       divMovie.appendChild(img);
//       divMovie.appendChild(divMovieFooter);

//       list.appendChild(divMovie);
//     }
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }
// function getMovies(id) {
//   fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     // console.log(data);
//     // let title = document.getElementById("title");
//     // title.innerText = data.title;
//     // let cover = document.getElementById("cover");
//     // cover.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
//     // cover.setAttribute('alt', `Portada de ${data.title}`);
//     // let overview = document.getElementById("overview");
//     // overview.innerText = data.overview;
//     let movie = {
//       id: data.id,
//       title: data.title,
//       cover: `https://image.tmdb.org/t/p/w500${data.poster_path}`
//     };
//     return movie;
    
//   })
//   .catch(error => {
//     console.error(error);
//   });

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
        let divMovie = document.createElement("div");
        divMovie.className = "movie";
        divMovie.id = data.results[i].id;
        divMovie.onclick = function() {
          showMovieInfo(data.results[i].id);
        };
        let img = document.createElement("img");
        img.className = "poster";
        img.src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
        img.alt = `Póster de ${data.results[i].title}`;
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