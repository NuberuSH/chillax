fetch(`https://api.themoviedb.org/3/movie/${sessionStorage.idMovie}?api_key=039e4f7f61c4c831908c02f8c3e9aba0&language=es-ES`)
    .then(response => {
    return response.json();
    })
    .then(data => {
    console.log(data.title);
    console.log(data);
    let title = document.getElementById("title");
    title.innerText = data.title;
    let cover = document.getElementById("cover");
    cover.setAttribute('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`);
    cover.setAttribute('alt', `Portada de ${data.title}`);
    let overview = document.getElementById("overview");
    overview.innerText = data.overview;
    })
    .catch(error => {
    console.error(error);
    });