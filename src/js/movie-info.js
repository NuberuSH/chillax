import { idMovie } from "./catalog";

fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
    .then(response => {
    return response.json();
    })
    .then(data => {
    // console.log(data.title);
    // console.log(data);
    // let title = document.getElementById("title");
    // title.innerText = data.title;
    // let cover = document.getElementById("cover");
    // cover.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
    // cover.setAttribute('alt', `Portada de ${data.title}`);
    // let overview = document.getElementById("overview");
    // overview.innerText = data.overview;
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