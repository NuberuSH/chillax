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

function getSeries() {
  const list = document.getElementById("series-list");
  fetch(`https://api.themoviedb.org/3/discover/tv?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1}`)
  .then(response => {
    return response.json();
  })
  .then(data => {//Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
    for (let i = 0; i < 6; i++) {
      let divSerie = document.createElement("div");
      divSerie.className = "serie";
      divSerie.id = data.results[i].id;
      divSerie.onclick = function() {
        showSerieInfo(data.results[i].id);
      };
      let img = document.createElement("img");
      img.className = "poster";
      img.src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
      img.alt = data.results[i].title;
      let divSerieFooter = document.createElement("div");
      divSerieFooter.className = "serie-footer";
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

function showSerieInfo(idSerie) {
  const container = document.getElementById("container");
  container.className = "serie-info-container";
  container.innerHTML = "<div class='go-back' onclick='returnToList();'>Volver atrás\n</div><h1 id='serie-title'></h1>\n<hr>";
  const serieTitle = document.getElementById("serie-title");
  const smallContainer = document.createElement("div");
  smallContainer.className = "small-container";

  fetch(`https://api.themoviedb.org/3/tv/${idSerie}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      serieTitle.innerText = data.name;
      const cover = document.createElement("img");
      cover.setAttribute("src", `https://image.tmdb.org/t/p/w500${data.poster_path}`);
      cover.setAttribute("alt", `Portada de ${data.name}`);
      cover.id = "serie-poster";
      const infoBody = document.createElement("div");
      infoBody.id = "info-body";
      const additionalInfo = document.createElement("div");
      additionalInfo.className = "additional-info";
      const releaseDate = document.createElement("p");
      releaseDate.className = "release-date";
      releaseDate.innerText = `Primera emisión: ${data.first_air_date}`;
      additionalInfo.appendChild(releaseDate);
      const runtime = document.createElement("p");
      runtime.className = "runtime";
      if (data.episode_run_time > 0) {
        runtime.innerText = `Duración aproximada episodio: ${data.episode_run_time} minutos`;
      }
      additionalInfo.appendChild(runtime);
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
      additionalInfo.appendChild(genres);
      const overview = document.createElement("div");
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
      runtime.innerText = `Duración aproximada: ${data.runtime} minutos`;
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
  const container = document.getElementById("container");
  container.className = "";
  container.innerHTML = `
  <header>
      <a href="/" class="header-nav-a">
        <img src="/images/logo/chillaxSombras.svg" alt="logo" id="logo-nav-bar" />
      </a>
    </header>
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