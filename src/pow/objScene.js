import * as THREE from "three";
import "../../stylesheets/objscene.scss";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let camera, scene, renderer;

init();
render();

function init() {
  console.log("hhafhasf");
  const closeButton = document.getElementById("btn-menu2");

  const container = document.getElementById("container-gltf");
  document.body.appendChild(container);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.set(0, 100, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbbbbbb);

  const grid = new THREE.GridHelper(500, 10, 0xffffff, 0xffffff);
  grid.material.opacity = 0.5;
  grid.material.depthWrite = false;
  grid.material.transparent = true;
  scene.add(grid);

  const loader = new GLTFLoader().setPath("../gltf/");
  loader.load("Freire_coll.gltf", function (gltf) {
    var vec = new THREE.Vector3(2, 2, 2);

    gltf.scene.position.y = 8;
    gltf.scene.scale.set(3, 3, 3);

    scene.add(gltf.scene);

    render();
  });

  const light = new THREE.AmbientLight();
  scene.add(light);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop
  controls.minDistance = 100;
  controls.maxDistance = 1000;
  controls.target.set(10, 90, -16);
  controls.update();

  window.addEventListener("resize", onWindowResize);

  closeButton.addEventListener("click", () => {
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
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

//

function render() {
  renderer.render(scene, camera);
}
