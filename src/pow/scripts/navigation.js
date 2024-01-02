import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { getRaycasteableObjects } from "./sphereScene";
import { changeFromClick } from "./sphereCommands";

const gltfLoader = new GLTFLoader();
const texLoader2 = new THREE.TextureLoader();
var pngCirculoObj;

const puntos = [];
class punto {
  constructor(pos, id) {
    this.pos = pos;
    this.id = id;
  }
}

let refDolly, refMesh1, refMesh2;

var raycasteableObjects = [];

export function createNavigationSystem(
  dolly,
  scene,
  place,
  number,
  gltfName,
  mesh1,
  mesh2
) {
  refDolly = dolly;
  refMesh1 = mesh1;
  refMesh2 = mesh2;
  gltfLoader
    .setPath("../../gltf/" + place + "/")
    .load(gltfName, function (gltf) {
      gltf.scene.traverse(function (child) {
        scene.add(gltf.scene);
        // scene.add(child);
        try {
          console.log(child.name);

          if (child.name === "coll") {
            child.material = new THREE.MeshBasicMaterial({
              transparent: true,
              opacity: 0,
            });

            raycasteableObjects.push(child);
            getRaycasteableObjects(raycasteableObjects);
          } else {
            if (child.name.includes("Punto_")) {
              if (child.name === "Punto_" + number) {
                dolly.position.set(
                  child.position.x,
                  child.position.y,
                  child.position.z
                );
                mesh1.position.set(
                  child.position.x,
                  child.position.y,
                  child.position.z
                );
                mesh2.position.set(
                  child.position.x,
                  child.position.y,
                  child.position.z
                );
              }

              child.visible = false;

              var newPoint = new punto(
                child.position,
                child.name.split("_")[1]
              );

              puntos.push(newPoint);
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    });

  var pngCirculo = new THREE.PlaneBufferGeometry(1, 1);
  var pngCirculoText = texLoader2.load("../../imagenes/circulo.png");
  var pngCirculoMat;

  pngCirculoMat = new THREE.MeshBasicMaterial({
    transparent: true,
    map: pngCirculoText,
    color: "white",
    opacity: 0.8,
  });

  pngCirculoObj = new THREE.Mesh(pngCirculo, pngCirculoMat);
  pngCirculoObj.rotation.x = -Math.PI / 2;
  pngCirculoObj.renderOrder = 0 || 999;
  pngCirculoObj.material.depthTest = false;
  pngCirculoObj.material.depthWrite = false;
  pngCirculoObj.onBeforeRender = function (renderer) {
    renderer.clearDepth();
  };
}

export function raycasterMove(intersects, scene) {
  if (intersects.length > 0) {
    if (intersects[0].object.name === "coll") {
      scene.add(pngCirculoObj);
      pngCirculoObj.position.copy(intersects[0].point);
    } else {
      scene.remove(pngCirculoObj);
    }
  } else {
    scene.remove(pngCirculoObj);
  }
}

export function raycasterClick(intersects, currentPoint) {
  if (intersects.length > 0) {
    const closestPunto = findClosestPunto(puntos, intersects[0].point);

    if (closestPunto.id != currentPoint) {
      moveToClosestPoint(closestPunto);
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
  }
}

function findClosestPunto(array, targetPos) {
  let closestPunto = null;
  let closestDistance = Infinity;

  for (const puntoItem of array) {
    const distance = puntoItem.pos.distanceTo(targetPos);

    if (distance < closestDistance) {
      closestPunto = puntoItem;
      closestDistance = distance;
    }
  }

  return closestPunto;
}

function moveToClosestPoint(closestPoint) {
  changeFromClick(closestPoint.id);

  refDolly.position.set(
    closestPoint.pos.x,
    closestPoint.pos.y,
    closestPoint.pos.z
  );
  refMesh1.position.set(
    closestPoint.pos.x,
    closestPoint.pos.y,
    closestPoint.pos.z
  );
  refMesh2.position.set(
    closestPoint.pos.x,
    closestPoint.pos.y,
    closestPoint.pos.z
  );
}

export function moveToPointFromButton(number) {
  var closestPoint = getPointById(number.toString());

  refDolly.position.set(
    closestPoint.pos.x,
    closestPoint.pos.y,
    closestPoint.pos.z
  );
  refMesh1.position.set(
    closestPoint.pos.x,
    closestPoint.pos.y,
    closestPoint.pos.z
  );
  refMesh2.position.set(
    closestPoint.pos.x,
    closestPoint.pos.y,
    closestPoint.pos.z
  );

  function getPointById(idToFind) {
    let foundItem = puntos.find((item) => item.id === idToFind);

    return foundItem || null;
  }
}
