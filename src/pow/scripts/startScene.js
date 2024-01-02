import * as THREE from "three";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";
// import "../../../stylesheets/index.scss";
import { isOculusUwU } from "./checkVR";
var tools = require("./tools.js");
import "./fulltilt.js";
import { showContainer } from "..";

let camera, scene, renderer;

const sound = document.getElementById("sound");
const gyrosButton = document.getElementById("btn-gyros");
const menuButton = document.getElementById("btn-menu");
const replayContainer = document.getElementById("container-play");
const replayButton = document.getElementById("replay-button");
const container = document.getElementById("container");

var controls;

let isMobile = false; //determina si está en un dispositivo móvil
var gyroPresent = false; //giroscopio

if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}

let hasStarted = false;
//controles mouse
let isClicked = false,
  mouseTime = 0,
  clientClickX,
  clientClickY,
  mouse = new THREE.Vector2();

//
var gyroIOS = false,
  isGyroActivate = false;
var orientationQuat = new THREE.Quaternion(),
  worldQuat = new THREE.Quaternion();

const ios = () => {
  if (typeof window === `undefined` || typeof navigator === `undefined`)
    return false;

  return /iPhone|iPad|iPod/i.test(
    navigator.userAgent ||
      navigator.vendor ||
      (window.opera && opera.toString() === `[object Opera]`)
  );
};

gyrosButton.addEventListener("click", () => {
  if (!ios()) {
    if (gyroPresent) {
      gyrosButton.classList.remove("btn-gyros-off");
      gyroPresent = false;
      camera.rotation.set(camera.rotation.x, camera.rotation.y, 0);
    } else {
      gyroPresent = true;
      gyrosButton.classList.add("btn-gyros-off");
    }

    isGyroActivate = !isGyroActivate;
    // changeBtnColor(isGyroActivate);

    window.scrollTo(0, 0); // Nos lleva al principio de la pagina
  } else {
    if (!gyroIOS) {
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission().then((response) => {
          if (response == "granted") {
            var orientationPromise = FULLTILT.getDeviceOrientation({
              type: "world",
            });

            // Wait for Promise fulfillment
            orientationPromise
              .then(function (deviceOrientationController) {
                controls = deviceOrientationController;

                // Computed device orientation rotation vector
                orientationQuat = new THREE.Quaternion();

                // World frame transform (- PI/2 around the x-axis)
                worldQuat = new THREE.Quaternion(
                  -Math.sqrt(0.5),
                  0,
                  0,
                  Math.sqrt(0.5)
                );

                gyroPresent = true;
                gyrosButton.classList.add("btn-gyros-off");
                gyroIOS = true;
              })
              .catch(function (reason) {
                console.error(reason);
              });
          }
        });
      }
    } else {
      if (gyroPresent) {
        gyroPresent = false;
        gyrosButton.classList.remove("btn-gyros-off");
        camera.rotation.set(camera.rotation.x, camera.rotation.y, 0);
      } else {
        gyrosButton.classList.add("btn-gyros-off");
        gyroPresent = true;
      }
    }
  }
});

menuButton.addEventListener("click", () => {
  showContainer();
});

if (!ios()) {
  // Create new FULLTILT library for *compass*-based deviceorientation
  var orientationPromise = FULLTILT.getDeviceOrientation({ type: "world" });

  // Wait for Promise fulfillment
  orientationPromise
    .then(function (deviceOrientationController) {
      controls = deviceOrientationController;
    })
    .catch(function (reason) {
      console.error(reason);
    });

  // Computed device orientation rotation vector
  orientationQuat = new THREE.Quaternion();

  // World frame transform (- PI/2 around the x-axis)
  worldQuat = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
}

if (!isMobile) {
  gyrosButton.style.display = "none";
} else {
  gyrosButton.classList.remove("off");
}

//crea las cosas de oculus

let controller1, controller2, controllerGrip1, controllerGrip2, mainController;
const prevGamePads = new Map();
var cameraVector = new THREE.Vector3();
let clock = new THREE.Clock();

const video = document.createElement("video");

replayButton.addEventListener("click", () => {
  // startVideo(getVideo());
  video.play();
  replayContainer.style.visibility = "hidden";
});

init();

//#region CREA LA WEA

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.rotation.order = "YXZ";
  camera.layers.enable(1); // render left view when no stereo available

  video.setAttribute("id", "video06");
  video.setAttribute("src", ""); //acá tiene que tener el coso del json
  video.setAttribute("webkit-playsinline", "webkit-playsinline");
  video.setAttribute("playsinline", "playsinline");
  video.setAttribute("autoplay", false);
  video.removeAttribute("loop");
  video.load();

  video.addEventListener("ended", function () {
    replayContainer.style.visibility = "visible";
    console.log("Video has ended");
  });

  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101010);

  // left

  const geometry1 = new THREE.SphereGeometry(500, 60, 40);

  // invert the geometry on the x-axis so that all of the faces point inward
  geometry1.scale(-1, 1, 1);

  const uvs1 = geometry1.attributes.uv.array;

  for (let i = 1; i < uvs1.length; i += 2) {
    uvs1[i] *= 0.5;
  }

  const material1 = new THREE.MeshBasicMaterial({ map: texture });

  const mesh1 = new THREE.Mesh(geometry1, material1);
  mesh1.rotation.y = -Math.PI / 2;
  mesh1.layers.set(1); // display in left eye only
  scene.add(mesh1);

  // right

  const geometry2 = new THREE.SphereGeometry(500, 60, 40);
  geometry2.scale(-1, 1, 1);

  const uvs2 = geometry2.attributes.uv.array;

  for (let i = 1; i < uvs2.length; i += 2) {
    uvs2[i] *= 0.5;
    uvs2[i] += 0.5;
  }

  const material2 = new THREE.MeshBasicMaterial({ map: texture });

  const mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.rotation.y = -Math.PI / 2;
  mesh2.layers.set(2); // display in right eye only
  scene.add(mesh2);

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType("local");
  container.appendChild(renderer.domElement);

  container.appendChild(VRButton.createButton(renderer));

  //

  window.addEventListener("resize", onWindowResize);

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
        material = new THREE.MeshStandardMaterial({
          opacity: 0.5,
          transparent: true,
        });
        return new THREE.Mesh(geometry, material);

      // camera.position.set(pointOnFloor.x, 0, pointOnFloor.z);
    }
  }

  var dolly;
  dolly = new THREE.Object3D();
  dolly.position.set(0, 0, 5);
  dolly.add(camera);
  dolly.add(controller1, controllerGrip1, controller2, controllerGrip2);
  scene.add(dolly);

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {
  renderer.render(scene, camera);

  if (gyroPresent === true) {
    var quat = controls.getScreenAdjustedQuaternion();

    orientationQuat.set(quat.x, quat.y, quat.z, quat.w);

    // IMPORTANT! set deviceorientation camera to three.js world frame
    // (i.e. make camera look out the back of the screen by rotating the camera x-axis by -PI/2)
    camera.quaternion.multiplyQuaternions(worldQuat, orientationQuat);
  }
  dollyMove();
}

sound.style.display = "block";
sound.classList.remove("sound-off");
sound.addEventListener("click", (e) => {
  controlAudio();
});

document.addEventListener("keydown", function (event) {
  // Check if the pressed key is the space bar
  if (event.key === " ") {
    // Space bar was pressed
    controlAudio();

    // You can perform any actions you want here
  }
});

function controlAudio() {
  console.log("ehhe");

  if (!sound.classList.contains("sound-off")) {
    video.pause();
    console.log("pausando");

    sound.classList.add("sound-off");
  } else {
    video.play();
    console.log("play");

    sound.classList.remove("sound-off");
  }
}

let originTouch, previousTouch, newTouch, secondTouch;
var touch0ClientY;
var touch0ClientX;
var touch1ClientY;
var touch1ClientX;
var MobileRotationSpeed = 400;

if (isMobile) {
  document.body.addEventListener(
    "touchstart",
    (ev) => {
      originTouch = ev.touches[0];
      touch0ClientX = ev.touches[0].clientX;
      touch0ClientY = ev.touches[0].clientY;
    },
    { passive: false }
  );

  document.body.addEventListener(
    "touchmove",
    (ev) => {
      ev.preventDefault();

      if (ev.touches[0]) {
        if (previousTouch) {
          var movementX = ev.touches[0].pageX - previousTouch.pageX;
          var movementY = ev.touches[0].pageY - previousTouch.pageY;

          camera.rotation.y += movementX / MobileRotationSpeed;
          camera.rotation.x += movementY / MobileRotationSpeed;
        }

        previousTouch = ev.touches[0];
      }
    },
    { passive: false }
  );

  document.body.addEventListener("touchend", (ev) => {
    previousTouch = null;
    originTouch = null;

    newTouch = null;
  });
}

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
    var PCCamSpeed = 500;

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

var XRTouchDownL = false,
  XRTouchDownR = false;

function controllerCooldown(variable) {
  setTimeout(() => {
    XRTouchDownL = false;
    XRTouchDownR = false;
  }, 150);
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
                  if (i == 0) {
                    if (!XRTouchDownL) {
                      XRTouchDownL = true;
                      controllerCooldown(XRTouchDownL);
                      controlAudio();
                    }
                  }
                  if (i == 5) {
                    if (!XRTouchDownL) {
                      XRTouchDownL = true;
                      controllerCooldown(XRTouchDownL);
                      controlAudio();
                    }
                  }
                  if (i == 4) {
                    if (!XRTouchDownL) {
                      XRTouchDownL = true;
                      controllerCooldown(XRTouchDownL);
                      controlAudio();
                    }
                  }
                } else {
                  mainController = controller;
                  if (i == 0) {
                    if (!XRTouchDownR) {
                      XRTouchDownR = true;
                      controllerCooldown(XRTouchDownR);
                      controlAudio();
                    }
                  }
                  if (i == 5) {
                    if (!XRTouchDownR) {
                      XRTouchDownR = true;
                      controllerCooldown(XRTouchDownR);
                      controlAudio();
                    }
                  }
                  if (i == 4) {
                    if (!XRTouchDownR) {
                      XRTouchDownR = true;
                      controllerCooldown(XRTouchDownR);
                      controlAudio();
                    }
                  }
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

//#endregion

export function startVideo(src) {
  video.setAttribute("src", "./videos/" + src);
  replayContainer.style.visibility = "hidden";
  container.style.visibility = "visible";
}
