 //PÁGINA DE PELÍCULA/SERIE/JUEGO/LIBRO. 550 deberá cambiarse por la id de la película sobre la que se haga click en la web. Adaptar código a necesidades

//  fetch("https://api.themoviedb.org/3/movie/550?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data.title);
    // console.log(data);
    // let title = document.getElementById("title");
    // title.innerText = data.title;
    // let cover = document.getElementById("cover");
    // cover.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
    // cover.setAttribute('alt', `Portada de ${data.title}`);
    // let overview = document.getElementById("overview");
    // overview.innerText = data.overview;
  // })
  // .catch(error => {
  //   console.error(error);
  // });


  let page = 1;
  console.log(page);
  // let ul = document.getElementById("movie-list");
  let list = document.getElementById("movie-list");
  //Realizamos la petición a la api
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&page=${page}`)
    .then(response => {
      return response.json();
    })
    .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.results.length; i++) {
        // let li = document.createElement("li");
        // li.innerText = data.results[i].title;
        let divMovie = document.createElement("div");
        divMovie.className = "movie";
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
      // let showMore = document.createElement("div");
      // showMore.id = "show-more";
      // showMore.onclick = "showMore()";
      // showMore.innerText = "Mostrar más";
      // let container = document.getElementById("container");
      // container.appendChild(showMore);
    })
    .catch(error => {
      console.error(error);
    });
  
  let prev = document.getElementById("previous");
  let next = document.getElementById("next");
  
  if (page === 1) {
    prev.visibility = "hidden";
  }
  
  if (page === 500) {
    next.visibility = "hidden";
  }
  
  //Esta función incrementa en 1 el valor de page, realizando una petición a la página siguiente de la api
  function showMore() {
    page++;
    let content = "";
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&page=${page}`)
    .then(response => {
      return response.json();
    })
    .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.results.length; i++) {
        // let li = document.createElement("li");
        // li.innerText = data.results[i].title;
        let divMovie = document.createElement("div");
        divMovie.className = "movie";
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
  function previousPage() {
    page--;
    let content = "";
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES&page=${page}`)
    .then(response => {
      return response.json();
    })
    .then(data => { //Recibimos la respuesta de la api (data) y recorremos la lista que contiene (results) para mostrar las películas en el html
      for (let i = 0; i < data.results.length; i++) {
        // let li = document.createElement("li");
        // li.innerText = data.results[i].title;
        let divMovie = document.createElement("div");
        divMovie.className = "movie";
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
  // }
  
  
  