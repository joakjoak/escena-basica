// import { startVideo } from "./scripts/startScene";

import "../../stylesheets/basic.scss";

// const container = document.getElementById("container-menu");
// const goButton = document.getElementById("go-button");
// const exterior = document.getElementById("exterior-button");

// export function showContainer() {
//   container.style.display = "block";
// }

// goButton.addEventListener("click", () => {
//   startVideo("testfolder/Freire_v02.mp4");
//   container.style.display = "none";
// });

// exterior.addEventListener("click", () => {
//   window.location.href = getAbsolutePath() + "/exterior.html";
// });

const butExplore = document.getElementById("button-explore");
butExplore.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?1";
});

function getAbsolutePath() {
  var loc = window.location;
  var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf("//"));
  return loc.href.substring(
    0,
    loc.href.length -
      ((loc.pathname + loc.search + loc.hash).length - pathName.length)
  );
}
