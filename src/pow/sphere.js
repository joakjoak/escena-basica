import "../../stylesheets/index.scss";
import "./scripts/sphereScene.js";
import "./scripts/sphereCommands.js";

const ovWala = document.getElementById("overlay-container-wala");

ovWala.addEventListener("click", () => {
  ovWala.classList.remove("visible");
  ovWala.classList.add("hidden");
});
