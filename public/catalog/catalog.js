let page = 1;
let genre = 0;

function getMovieList() {
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
        // divMovie.onclick = function() {
        //   showMovieInfo(data.results[i].id);
        // };
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
        // divMovie.onclick = function() {
        //   showMovieInfo(data.results[i].id);
        // };
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
  container.innerHTML = "<div onclick='location.reload();'>Películas\n</div><h1 id='movie-title'></h1>\n<hr>";
  let movieTitle = document.getElementById("movie-title");
  
  fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    movieTitle.innerText = data.title;
    let cover = document.createElement("img");
    cover.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
    cover.setAttribute('alt', `Portada de ${data.title}`);
    // let overview = document.getElementById("overview");
    // overview.innerText = data.overview;
    container.appendChild(cover);
  })
  .catch(error => {
    console.error(error);
  });
}

function returnToList() {
  genre = 0;
  page = 1;
  let container = document.getElementById("container");
  container.innerHTML = `<select name="Filtro por género" id="genre-filter" onchange="genreFilter()">
  <option value="0">Selecciona un género</option>
  </select>
  <h1>Películas</h1>
  <hr>
  <div id="movie-list">

  </div>
  <div id="show-more" onclick="showMore()">Mostrar más</div>`;
  // getGenres();
  getMovieList();
}
// let ul = document.getElementById("movie-list");
let list = document.getElementById("movie-list");

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
  getMovieList();
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
  genre = document.getElementById("genre-filter").value;
  list.innerHTML = "";
  getMovieList();
}

function switchToMovies() {
  page = 1;
  genre = 0;
  content = "movies";
  // let seriesGenreFilter = document.getElementById("genre-series-filter");
  // seriesGenreFilter.style.visibility = "hidden";
  // let movieGenreFilter = document.getElementById("genre-filter");
  // movieGenreFilter.style.visibility = "visible";
  let h1 = document.getElementsByTagName("h1")[0];
  h1.innerText = "Películas";
  list.innerHTML = "";
  let defaultOption = document.querySelector("#genre-filter > option");
  defaultOption.selected = true;
  getMovieList();
}

function switchToSeries() {
  location.href = "../series.html";
}
// export { idMovie };
