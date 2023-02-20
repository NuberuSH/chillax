
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runLandingPage () {
  const main = document.getElementById('landingpage-main');
  const curtain = document.getElementById('curtain');
  const images = [
    'backgroundImage1.jpg',
    'backgroundImage2.jpg',
    'backgroundImage3.jpg',
    'backgroundImage4.webp',
    'backgroundImage5.jpg',
    'gbackgroundImage6.jpg',
    'backgroundImage7.jpg',
    'backgroundImage8.jpg',
    'backgroundImage9.webp',
    'backgroundImage10.jpg',
    'backgroundImage11.jpg'
  ];

  let position = Math.floor(Math.random() * images.length);

  while (true) {
    main.style.backgroundImage = `url("${images[position]}")`;
    curtain.style.opacity = 0;
    position = position < images.length-1 ? position + 1 : 0;
    await sleep(8000);
    curtain.style.opacity = 1;
    await sleep(1200);
  }
}

await runLandingPage();
