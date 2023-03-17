const menu = document.querySelector(".menu");
const focusWindow = document.querySelector(".focus-window");
const menuButton = document.querySelector(".menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbarWrapper = document.querySelector(".navbar");
const navbar = document.querySelector("nav");
const logo = document.querySelector(".logo");
// const navTitle = document.querySelector(".nav-title");
const navButtons = document.querySelectorAll(".nav-button");

function swapMenuOpenClosed() {
  if (menu.classList.contains("menu-open")) {
    menu.classList.remove("menu-open");
    menu.classList.add("menu-closed");
  } else {
    menu.classList.remove("menu-closed");
    menu.classList.add("menu-open");
  }
}

function swapFocusUnfocused() {
  if (focusWindow.classList.contains("web-in-focus")) {
    focusWindow.classList.remove("web-in-focus");
    focusWindow.classList.add("web-out-of-focus");
  } else {
    focusWindow.classList.remove("web-out-of-focus");
    focusWindow.classList.add("web-in-focus");
  }
}

function setNavVisible() {
  navbarWrapper.classList.remove("nav-not-visible");
  navbarWrapper.classList.add("nav-visible");
}

function setNavNotVisible() {
  navbarWrapper.classList.remove("nav-visible");
  navbarWrapper.classList.add("nav-not-visible");
}

function setDesktopNavBackground(scrollYPosition) {
  if (scrollYPosition > 0) {
    navbar.classList.remove("md:bg-transparent", "md:h-20");
    navbar.classList.add("md:bg-web-button2", "md:border-gray-400", "opacity-95");
    // navTitle.classList.add("md:text-xl", "text-gray-900", "dark:text-gray-200");
    // navTitle.classList.remove("text-shadow-1", "lg:text-shadow-2");
    logo.classList.remove("md:h-[70px]");
    logo.classList.add("md:h-[30px]");
    navButtons.forEach(navButton => {
      navButton.classList.add("text-gray-900", "dark:text-gray-200", "text-lg");
      navButton.classList.remove("text-shadow-1");
    });
  } else {
    navbar.classList.add("duration-300");
    navbar.classList.add("md:bg-transparent", "md:h-20");
    navbar.classList.remove("md:bg-gray-200", "md:dark:bg-web-formBgDarkMode", "md:border-gray-400");
    // navTitle.classList.remove("md:text-xl", "text-gray-900", "dark:text-gray-200");
    // navTitle.classList.add("text-shadow-1", "lg:text-shadow-2");
    logo.classList.add("md:h-[70px]");
    logo.classList.remove("md:h-[30px]");
    navButtons.forEach(navButton => {
      navButton.classList.remove("text-gray-900", "dark:text-gray-200", "text-lg");
      navButton.classList.add("text-shadow-1");
    });
  }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, "passive", {
    get: function() { supportsPassive = true; }
  }));
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

menuButton.addEventListener("click", () => {
  swapMenuOpenClosed();
  swapFocusUnfocused();
  disableScroll();
});

closeMenuButton.addEventListener("click", () => {
  swapMenuOpenClosed();
  swapFocusUnfocused();
  enableScroll();
});

focusWindow.addEventListener("click", () => {
  swapMenuOpenClosed();
  swapFocusUnfocused();
  enableScroll();
});

let lastScrollTop = 0;
window.addEventListener("scroll", function() {
  // or window.addEventListener("scroll"....
  const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  setDesktopNavBackground(st);
  console.log(st);
  if (st > lastScrollTop) {
    setNavNotVisible();
  } else {
    setNavVisible();
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);

// Dinamic background logic

// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms);
// async function runLandingPage () {
// const body = document.getElementsByClassName ('dinamic-bg');
//   const curtain = document.getElementById('curtain');
//     const images = [
//         'backgroundImage1.jpg',
//         'backgroundImage2.jpg',
//         'backgroundImage3.jpg',
//         'backgroundImage4.webp',
//         'backgroundImage5.jpg',
//         'backgroundImage6.jpg',
//         'backgroundImage7.jpg',
//         'backgroundImage8.jpg',
//         'backgroundImage9.webp',
//         'backgroundImage10.jpg',
//         'backgroundImage11.jpg'
//     ];
//     let position = Math.floor(Math.random() * images.length;
//   while (true) {
//     body.style.backgroundImage = `url("/images/background/${images[position]}")`;
//     curtain.style.opacity = 0;
//     position = position < images.length-1 ? position + 1 : 0;
//     await sleep(8000);
//     curtain.style.opacity = 1;
//     await sleep(1200);
//   }
// };

//  await runLandingPage();