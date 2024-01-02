import { moveToPointFromButton } from "./navigation";
import { changeTexture } from "./sphereScene";

var isOpened = false;

const closeButton = document.getElementById("btn-menu");

const topContainer = document.getElementById("overlay-container");

const planeButton = document.getElementById("bottom-right-button");
const map = document.getElementById("container-img");
const mapImage = document.getElementById("img-background");

const closeMapButton = document.getElementById("btn-close-map");

const exteriorButtons = [];

const fullPath = new URLSearchParams(window.location.search).get("l");
let place = fullPath.split("?")[0];
let num = fullPath.split("?")[1];

switch (place) {
  case "exterior":
    mapImage.src = "./imagenes/exterior/exterior.png"; // Set the new image source

    break;

  default:
    break;
}

closeButton.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/index.html";
});

planeButton.addEventListener("click", () => {
  if (!isOpened) {
    closeMapButton.style.visibility = "visible";
    planeButton.style.visibility = "hidden";
    map.classList.toggle("visible");
    isOpened = true;

    switch (place) {
      case "exterior":
        showButtonsExterior();
        break;

      default:
        break;
    }
  } else {
    map.classList.toggle("visible");
    planeButton.style.visibility = "visible";
    closeMapButton.style.visibility = "hidden";
    isOpened = false;
    switch (place) {
      case "exterior":
        hideButtonsExterior();
        break;

      default:
        break;
    }
  }
});

closeMapButton.addEventListener("click", () => {
  map.classList.toggle("visible");
  planeButton.style.visibility = "visible";
  closeMapButton.style.visibility = "hidden";
  isOpened = false;
  switch (place) {
    case "exterior":
      hideButtonsExterior();
      break;

    default:
      break;
  }
});

export function changeOverlay() {
  // Toggle the 'visible' class
  topContainer.classList.toggle("visible");

  // If the 'visible' class is present, remove the 'hidden' class; otherwise, add it
  if (topContainer.classList.contains("visible")) {
    topContainer.classList.remove("hidden");
  } else {
    topContainer.classList.add("hidden");
  }
}

function getAbsolutePath() {
  var loc = window.location;
  var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf("//"));
  return loc.href.substring(
    0,
    loc.href.length -
      ((loc.pathname + loc.search + loc.hash).length - pathName.length)
  );
}

const Exteriorbut1 = document.getElementById("but1");
const Exteriorbut2 = document.getElementById("but2");
const Exteriorbut3 = document.getElementById("but3");
const Exteriorbut4 = document.getElementById("but4");
const Exteriorbut5 = document.getElementById("but5");
const Exteriorbut6 = document.getElementById("but6");
const Exteriorbut7 = document.getElementById("but7");
const Exteriorbut8 = document.getElementById("but8");
const Exteriorbut9 = document.getElementById("but9");
const Exteriorbut10 = document.getElementById("but10");
const Exteriorbut11 = document.getElementById("but11");
const Exteriorbut12 = document.getElementById("but12");
const Exteriorbut13 = document.getElementById("but13");
const Exteriorbut14 = document.getElementById("but14");
const Exteriorbut15 = document.getElementById("but15");
const Exteriorbut16 = document.getElementById("but16");
const Exteriorbut17 = document.getElementById("but17");

exteriorButtons.push(
  Exteriorbut1,
  Exteriorbut2,
  Exteriorbut3,
  Exteriorbut4,
  Exteriorbut5,
  Exteriorbut6,
  Exteriorbut7,
  Exteriorbut8,
  Exteriorbut9,
  Exteriorbut10,
  Exteriorbut11,
  Exteriorbut12,
  Exteriorbut13,
  Exteriorbut14,
  Exteriorbut15,
  Exteriorbut16,
  Exteriorbut17
);

Exteriorbut1.addEventListener("click", () => {
  num = 1;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut2.addEventListener("click", () => {
  // window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?2";
  num = 2;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut3.addEventListener("click", () => {
  num = 3;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut4.addEventListener("click", () => {
  num = 4;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut5.addEventListener("click", () => {
  num = 5;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut6.addEventListener("click", () => {
  num = 6;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut7.addEventListener("click", () => {
  num = 7;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut8.addEventListener("click", () => {
  num = 8;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut9.addEventListener("click", () => {
  num = 9;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut10.addEventListener("click", () => {
  num = 10;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut11.addEventListener("click", () => {
  num = 11;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut12.addEventListener("click", () => {
  num = 12;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut13.addEventListener("click", () => {
  num = 13;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut14.addEventListener("click", () => {
  num = 14;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut15.addEventListener("click", () => {
  num = 15;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut16.addEventListener("click", () => {
  num = 16;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

Exteriorbut17.addEventListener("click", () => {
  num = 17;
  changeTexture(place, num);
  showButtonsExterior();
  moveToPointFromButton(num);
});

function showButtonsExterior() {
  exteriorButtons.forEach(
    (button) => (
      (button.style.visibility = "visible"),
      (button.style.backgroundColor = "#000000")
      // button.setAttribute("disabled", "false")
    )
  );
  mapImage.style.visibility = "visible";
  const actualBut = document.getElementById("but" + num);
  actualBut.style.backgroundColor = "#d86450";
  // actualBut.setAttribute("disabled", "true");
}

function hideButtonsExterior() {
  exteriorButtons.forEach((button) => (button.style.visibility = "hidden"));
  mapImage.style.visibility = "hidden";
}

export function changeFromClick(number) {
  num = number;
  changeTexture(place, num);
}
