
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runLandingPage () {
  const main = document.getElementById('landingpage-main');
  const curtain = document.getElementById('curtain');
  const images = [
    'backgroundImage1.webp',
    'backgroundImage2.webp',
    'backgroundImage3.webp',
    'backgroundImage4.webp',
    'backgroundImage5.webp',
    'backgroundImage6.webp',
    'backgroundImage7.webp',
    'backgroundImage8.webp',
    'backgroundImage9.webp',
    'backgroundImage10.webp',
    'backgroundImage11.webp'
  ];

  let position = Math.floor(Math.random() * images.length);

  while (true) {
    main.style.backgroundImage = `url("/images/background/${images[position]}")`;
    curtain.style.opacity = 0;
    position = position < images.length-1 ? position + 1 : 0;
    await sleep(8000);
    curtain.style.opacity = 1;
    await sleep(1200);
  }
}

await runLandingPage();
