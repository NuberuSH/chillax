
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runLandingPage () {
  const main = document.getElementById('landingpage-main');
  const curtain = document.getElementById('curtain');
  const images = [
    '04hRKjIlrjUWVlGJkApTAhz-27.fit_lim.size_1600x900.v1623769787.jpg',
    '62879d2e0537fc6a778fe9d3_Hint_Home_Header.jpg',
    'Teenage-Girl-Gamer-Wearing-Headset-Gaming-1140x570.jpg',
    'The-5-Key-Ingredients-To-A-Good-Movie.webp',
    'depositphotos_freeimage.jpg',
    'getty_841135958_351803.jpg',
    'group-of-men-and-women-playing-video-games.jpg',
    'iStock-1001414360.jpg',
    'shutterstock_1301620948-62f17d21eac12-sej-1520x800.webp',
    'woman-watching-scary-movie-at-night.jpg',
    'young-man-playing-video-game-royalty-free-image-1572450323.jpg'
  ];

  let position = Math.floor(Math.random() * images.length);
  
  while (true) {
    main.style.backgroundImage = `url("./assets/landingpage/${images[position]}")`;
    curtain.style.opacity = 0;
    position = position < images.length-1 ? position + 1 : 0;
    await sleep(8000);
    curtain.style.opacity = 1;
    await sleep(1200);
  }
}

await runLandingPage();
