let page = 1;
let genre = 0;
console.log(page);
sessionStorage.idMovie = "550";

function getMovieList() {
  if (genre == 0) {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${+page}`)
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
          sessionStorage.idMovie = data.results[i].id;
          location.href = "../movie-info.html";
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


window.onload = getMovieList;
 
 //PÁGINA DE PELÍCULA/SERIE/JUEGO/LIBRO. 550 deberá cambiarse por la id de la película sobre la que se haga click en la web. Adaptar código a necesidades

function showMovieInfo(idMovie) {
  let container = document.getElementById("container");
  container.innerHTML = "";
  fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data.title);
    let title = document.createElement("div");
    title.id = "title";
    title.innerText = data.title;
    // let cover = document.getElementById("cover");
    // cover.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
    // cover.setAttribute('alt', `Portada de ${data.title}`);
    // let overview = document.getElementById("overview");
    // overview.innerText = data.overview;
    container.appendChild(title);
  })
  .catch(error => {
    console.error(error);
  });
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

//Petición a la api para añadir los options al select que filtrará por género
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

//Esta función incrementa en 1 el valor de page, realizando una petición a la página siguiente de la api
function showMore() {
  page++;
  if (genre !== 0) {
    getMovieList();
  } else {
    showMoreDefault();
  }
}

function showMoreDefault() {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=${+page}`)
    .then(response => {
      return response.json();
    })
    .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.results.length; i++) {
        let divMovie = document.createElement("div");
        divMovie.className = "movie";
        divMovie.id = data.results[i].id;
        divMovie.onclick = function() {
          sessionStorage.idMovie = data.results[i].id;
          location.href = "../movie-info.html";
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
