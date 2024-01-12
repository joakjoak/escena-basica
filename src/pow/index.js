import "../../stylesheets/basic.scss";

const closeVideoButton = document.getElementById("closeVideoButton");
const videoPop = document.getElementById("videoPop");
const videoDiv = document.getElementById("video-div");
const butExplore = document.getElementById("button-explore");
const butVideo = document.getElementById("button-video");

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

butVideo.addEventListener("click", () => {
  videoDiv.style.visibility = "visible";
  videoPop.play();
});

closeVideoButton.addEventListener("click", () => {
  videoPop.pause();
  videoDiv.style.visibility = "hidden";
});
