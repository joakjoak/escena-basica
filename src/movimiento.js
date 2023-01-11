import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";

//controles mouse
let isClicked = false,
  mouseTime = 0,
  clientClickX,
  clientClickY,
  mouse = new THREE.Vector2();

//escena
var scene = new THREE.Scene();
scene.background = new THREE.Color("red");
scene.fog = new THREE.FogExp2(0xffffff, 1);

//cámara
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.rotation.order = "YXZ";

//renderer ...
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.xr.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

window.addEventListener("resize", onWindowResize);

//crea las cosas de oculus
let speedFactor = [0.0001, 0.0001, 0.025, 0.025],
  maxSpeed = 40;
let controller1, controller2, controllerGrip1, controllerGrip2, mainController;
const prevGamePads = new Map();
var cameraVector = new THREE.Vector3();
let clock = new THREE.Clock();

let playerVelocity = new THREE.Vector3(),
  playerDirection = new THREE.Vector3(),
  playerOnFloor = false, //ahora no lo está usando pero es lo que determina si está en el piso o no
  keyStates = {}; //-> necesario para el movimiento

///////////////////////////////////
///////////////////////////////////////////
////////////////////////////////////////////////
//////////AGREGÁ LAS COSAS ACÁ JOJO!!///////
//////////////////////////////////////
/////////////////////////////////
///////////////////////////////
///caja como
//punto de referencia

var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshNormalMaterial();
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, -50);
scene.add(mesh);

////////////////////////
///////////////////////////////
////////////////////////////////////
///////////////////////////////
/////////////////////////

//necesario para moverse

//cápsula del jugador, para la colisión
var playerCollider = new Capsule(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 1.6, 0),
  0.7
);
playerCollider.name = "collider";

//CREA LOS CONTROLES DE OCULUS
//(los controles físicos, no el movimiento)
//#region Oculus
controller1 = renderer.xr.getController(0);
controller1.addEventListener("selectstart", onSelectStart);
controller1.addEventListener("selectend", onSelectEnd);

controller1.addEventListener("connected", function (event) {
  // grabVR.add(0, controller1, event.data.gamepad);
  this.add(buildController(event.data));
});
controller1.addEventListener("disconnected", function () {
  this.remove(this.children[0]);
});

controller2 = renderer.xr.getController(1);
controller2.addEventListener("selectstart", onSelectStart);
controller2.addEventListener("selectend", onSelectEnd);

controller2.addEventListener("connected", function (event) {
  // grabVR.add(0, controller1, event.data.gamepad);
  this.add(buildController(event.data));
});
controller2.addEventListener("disconnected", function () {
  this.remove(this.children[0]);
});

const controllerModelFactory = new XRControllerModelFactory();

controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(
  controllerModelFactory.createControllerModel(controllerGrip1)
);
controllerGrip1.addEventListener("connected", (e) => {
  // grabVR.add(0, controllerGrip1, e.data.gamepad);
});

controllerGrip2 = renderer.xr.getControllerGrip(1);
controllerGrip2.add(
  controllerModelFactory.createControllerModel(controllerGrip2)
);
controllerGrip2.addEventListener("connected", (e) => {
  // grabVR.add(0, controllerGrip1, e.data.gamepad);
});

function onSelectStart(event) {
  this.userData.isSelecting = true;
}

function onSelectEnd(event) {
  this.userData.isSelecting = false;
  const controller = event.target;
}

function buildController(data) {
  let geometry, material;

  switch (data.targetRayMode) {
    case "tracked-pointer":
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3)
      );

      material = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Line(geometry, material);

    case "gaze":
      geometry = new THREE.RingGeometry(0.02, 0.04, 32).translate(0, 0, -1);
      material = new THREE.MeshBasicMaterial({
        opacity: 0.5,
        transparent: true,
      });
      return new THREE.Mesh(geometry, material);

    // camera.position.set(pointOnFloor.x, 0, pointOnFloor.z);
  }
}

//#endregion

//acá crea el "dolly" que es el objeto fantasma que mueve todo
//y agrega todos los chirimbolos
var dolly;
dolly = new THREE.Object3D();
dolly.position.set(0, 0, 5);
dolly.add(camera);
dolly.add(controller1, controllerGrip1, controller2, controllerGrip2);
scene.add(dolly);

setAnimLoop();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function setAnimLoop() {
  renderer.setAnimationLoop(animate);
}

function animate() {
  const deltaTime = Math.min(0.05, clock.getDelta()) / 5;

  updatePlayer(deltaTime);
  controlsUpdateCall(deltaTime);
  dollyMove();

  renderer.render(scene, camera);
}

//comandos para moverse con el oculus
//de acá saca los clicks del oculus, las palanquitas, etc
function dollyMove() {
  var handedness = "unknown";

  //determine if we are in an xr session
  const session = renderer.xr.getSession();
  let i = 0;

  if (session) {
    let xrCamera = renderer.xr.getCamera(camera);
    xrCamera.getWorldDirection(cameraVector);

    //a check to prevent console errors if only one input source
    if (isIterable(session.inputSources)) {
      for (const source of session.inputSources) {
        if (source && source.handedness) {
          handedness = source.handedness; //left or right controllers
        }
        if (!source.gamepad) continue;
        const controller = renderer.xr.getController(i++);
        const old = prevGamePads.get(source);
        const data = {
          handedness: handedness,
          buttons: source.gamepad.buttons.map((b) => b.value),
          axes: source.gamepad.axes.slice(0),
        };
        if (old) {
          data.buttons.forEach((value, i) => {
            //handlers for buttons
            if (value !== old.buttons[i] || Math.abs(value) > 0.8) {
              //check if it is 'all the way pushed'
              if (value === 1) {
                if (data.handedness == "left") {
                  mainController = controller;
                } else {
                  mainController = controller;
                }
              }
            } else {
              if (data.handedness == "left") {
                if (i == 0) {
                  if (controller.userData.selected !== undefined) {
                  }

                  if (controller.userData.selected !== undefined) {
                  }
                }
              } else {
                if (i == 0) {
                  if (controller.userData.selected !== undefined) {
                  }
                }
              }
            }
          });

          data.axes.forEach((value, i) => {
            //handlers for thumbsticks
            //if thumbstick axis has moved beyond the minimum threshold from center, windows mixed reality seems to wander up to about .17 with no input

            if (Math.abs(value) > 0.2) {
              //set the speedFactor per axis, with acceleration when holding above threshold, up to a max speed
              speedFactor[i] > 1
                ? (speedFactor[i] = 1)
                : (speedFactor[i] *= 1.0001);

              if (i == 2) {
                //left and right axis on thumbsticks
                if (data.handedness == "left") {
                  if (value < 0) {
                    //izquierda
                    playerVelocity.add(
                      getSideVector().multiplyScalar(
                        speedFactor[i] * data.axes[2] * maxSpeed
                      )
                    );
                  }
                  if (value > 0) {
                    //derecha
                    playerVelocity.add(
                      getSideVector().multiplyScalar(
                        speedFactor[i] * data.axes[2] * maxSpeed
                      )
                    );
                  }

                  //provide haptic feedback if available in browser
                  if (
                    source.gamepad.hapticActuators &&
                    source.gamepad.hapticActuators[0]
                  ) {
                    var pulseStrength =
                      Math.abs(data.axes[2]) + Math.abs(data.axes[3]);
                    if (pulseStrength > 0.75) {
                      pulseStrength = 0.75;
                    }

                    var didPulse = source.gamepad.hapticActuators[0].pulse(
                      pulseStrength,
                      100
                    );
                  }
                } else {
                  // (data.axes[2] > 0) ? console.log('left on left thumbstick') : console.log('right on left thumbstick')

                  //move our dolly
                  //we reverse the vectors 90degrees so we can do straffing side to side movement
                  if (value < 0) {
                    //izquierda

                    playerVelocity.add(
                      getSideVector().multiplyScalar(
                        speedFactor[i] * data.axes[2] * maxSpeed
                      )
                    );
                  }
                  if (value > 0) {
                    //derecha

                    playerVelocity.add(
                      getSideVector().multiplyScalar(
                        speedFactor[i] * data.axes[2] * maxSpeed
                      )
                    );
                  }

                  //provide haptic feedback if available in browser
                  if (
                    source.gamepad.hapticActuators &&
                    source.gamepad.hapticActuators[0]
                  ) {
                    var pulseStrength =
                      Math.abs(data.axes[2]) + Math.abs(data.axes[3]);
                    if (pulseStrength > 0.75) {
                      pulseStrength = 0.75;
                    }

                    var didPulse = source.gamepad.hapticActuators[0].pulse(
                      pulseStrength,
                      100
                    );
                  }
                }
              }

              if (i == 3) {
                //up and down axis on thumbsticks
                if (data.handedness == "left") {
                  // (data.axes[3] > 0) ? console.log('up on left thumbstick') : console.log('down on left thumbstick')
                  // if (!wallBlockFront)
                  // {

                  if (value < 0) {
                    if (value < -0.85 && speedFactor[i] < 0.02) {
                      speedFactor[i] = 0.026;
                    }
                    //adelante
                    playerVelocity.add(
                      getForwardVector().multiplyScalar(
                        -speedFactor[i] * data.axes[3] * maxSpeed
                      )
                    );
                  }
                  if (value > 0) {
                    playerVelocity.add(
                      getForwardVector().multiplyScalar(
                        -speedFactor[i] * data.axes[3] * maxSpeed
                      )
                    );
                  }

                  //provide haptic feedback if available in browser
                  if (
                    source.gamepad.hapticActuators &&
                    source.gamepad.hapticActuators[0]
                  ) {
                    var pulseStrength = Math.abs(data.axes[3]);
                    if (pulseStrength > 0.75) {
                      pulseStrength = 0.75;
                    }
                    var didPulse = source.gamepad.hapticActuators[0].pulse(
                      pulseStrength,
                      100
                    );
                  }
                  // }
                } else {
                  if (value < 0) {
                    if (value < -0.85 && speedFactor[i] < 0.02) {
                      speedFactor[i] = 0.026;
                    }
                    //adelante
                    playerVelocity.add(
                      getForwardVector().multiplyScalar(
                        -speedFactor[i] * data.axes[3] * maxSpeed
                      )
                    );
                  }
                  if (value > 0) {
                    playerVelocity.add(
                      getForwardVector().multiplyScalar(
                        -speedFactor[i] * data.axes[3] * maxSpeed
                      )
                    );
                  }

                  //provide haptic feedback if available in browser
                  if (
                    source.gamepad.hapticActuators &&
                    source.gamepad.hapticActuators[0]
                  ) {
                    var pulseStrength =
                      Math.abs(data.axes[2]) + Math.abs(data.axes[3]);
                    if (pulseStrength > 0.75) {
                      pulseStrength = 0.75;
                    }
                    var didPulse = source.gamepad.hapticActuators[0].pulse(
                      pulseStrength,
                      100
                    );
                  }
                  // }
                }
              }
            } else {
              //axis below threshold - reset the speedFactor if it is greater than zero  or 0.025 but below our threshold
              if (Math.abs(value) > 0.025) {
                speedFactor[i] = 0.025;
              } else if (Math.abs(value) == 0) {
              }
            }
          });
        }
        ///store this frames data to compate with in the next frame
        prevGamePads.set(source, data);
      }
    }
  }
}
function isIterable(obj) {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

//esto es lo que mueve al dolly para adelante o para atrás
function getForwardVector() {
  camera.getWorldDirection(playerDirection);
  // si descomentás esto de abajo no puede volar porque se queda siempre en el 0.
  // playerDirection.y = 0;
  playerDirection.normalize();

  return playerDirection;
}

function getSideVector() {
  camera.getWorldDirection(playerDirection);
  //acá lo usa en 0 para que si te movés para los costados siempre te muevas paralelo al piso
  playerDirection.y = 0;
  playerDirection.normalize();
  playerDirection.cross(camera.up);

  return playerDirection;
}

//esto lo llama desde el update y es lo que mueve al jugador
//y hace que el dolly siga a la cápsula
function updatePlayer(deltaTime) {
  let damping = Math.exp(-2 * deltaTime) - 1;

  playerVelocity.addScaledVector(playerVelocity, damping * 2);

  var deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);
  playerCollider.translate(deltaPosition);

  // playerCollisions();

  dolly.position.copy(playerCollider.start);
}

//

//cuando apretás las teclas del teclado
document.addEventListener("keydown", (event) => {
  keyStates[event.code] = true;
});

document.addEventListener("keyup", (event) => {
  keyStates[event.code] = false;
});

//del mouse

//cuando hacés click con el mouse
document.addEventListener(
  "pointerdown",
  (ev) => {
    clientClickX = ev.clientX;
    clientClickY = ev.clientY;

    mouseTime = performance.now();

    if (!isClicked) {
      isClicked = true;
    }
  },
  false
);

//la rueda del mouse mueve el FoV de la cámara
// document.addEventListener("mousewheel", (event) => {
//   if (isScrollEnable) {
//     // Clamp number between two values with the following line:
//     const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

//     camera.fov += event.deltaY / 100;
//     camera.fov = clamp(camera.fov, minFOV, maxFOV);
//     camera.updateProjectionMatrix();
//   }
// });

//cuando liberás el click del mouse
document.addEventListener("pointerup", (ev) => {
  if (isClicked) {
    isClicked = false;
  }

  if (ev.target == renderer.domElement) {
    var x = ev.clientX;
    var y = ev.clientY;

    if (Math.abs(clientClickX - x) > 1 || Math.abs(clientClickY - y) > 1) {
      return;
    } else {
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

      ev.preventDefault();
    }
  }
});

//cuando movés el mouse
document.addEventListener(
  "mousemove",
  (ev) => {
    var PCCamSpeed = 100;

    if (isClicked) {
      camera.rotation.y += ev.movementX / PCCamSpeed;
      camera.rotation.x += ev.movementY / PCCamSpeed;
    }

    mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

    ev.preventDefault();
  },
  false
);

//esto agarra la letra que tocaste del teclado y le da una función de movimiento
function controlsUpdateCall(deltaTime) {
  // gives a bit of air control
  var moveSpeed = 200;
  var speedDelta = deltaTime * (false ? moveSpeed : moveSpeed);

  if (keyStates["KeyW"] || keyStates["ArrowUp"]) {
    playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));
  }

  if (keyStates["KeyS"] || keyStates["ArrowDown"]) {
    playerVelocity.add(getForwardVector().multiplyScalar(-speedDelta));
  }

  if (keyStates["KeyA"] || keyStates["ArrowLeft"]) {
    playerVelocity.add(getSideVector().multiplyScalar(-speedDelta));
  }

  if (keyStates["KeyD"] || keyStates["ArrowRight"]) {
    playerVelocity.add(getSideVector().multiplyScalar(speedDelta));
  }
}
