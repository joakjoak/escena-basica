import "../../stylesheets/exterior.scss";

const butMenu = document.getElementById("btn-menu");

const but1 = document.getElementById("but1");
const but2 = document.getElementById("but2");
const but3 = document.getElementById("but3");
const but4 = document.getElementById("but4");
const but5 = document.getElementById("but5");
const but6 = document.getElementById("but6");
const but7 = document.getElementById("but7");
const but8 = document.getElementById("but8");
const but9 = document.getElementById("but9");
const but10 = document.getElementById("but10");
const but11 = document.getElementById("but11");
const but12 = document.getElementById("but12");
const but13 = document.getElementById("but13");
const but14 = document.getElementById("but14");
const but15 = document.getElementById("but15");
const but16 = document.getElementById("but16");
const but17 = document.getElementById("but17");

but1.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?1";
});

but2.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?2";
});

but3.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?3";
});

but4.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?4";
});

but5.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?5";
});

but6.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?6";
});

but7.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?7";
});

but8.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?8";
});

but9.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?9";
});

but10.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?10";
});

but11.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?11";
});

but12.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?12";
});

but13.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?13";
});

but14.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?14";
});

but15.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?15";
});

but16.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?16";
});

but17.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/sphere.html?l=exterior?17";
});

butMenu.addEventListener("click", () => {
  window.location.href = getAbsolutePath() + "/index.html";
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
