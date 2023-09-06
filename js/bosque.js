import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
camera.rotation.y = 45 / 180 * Math.PI;
camera.position.x = 50;
camera.position.y = 30;
camera.position.z = 50;

let mouseX = 0;
let mouseY = 0;

let mousePressed = false;

let initialRotation = { x: 0, y: 0 };

let object;

let controls;

let objToRender = "bosque";

const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
  
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
 
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
 
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

const topLight = new THREE.DirectionalLight(0xffffff, 1); 
topLight.position.set(500, 500, 500); 
topLight.castShadow = true;
scene.add(topLight);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; 

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  if (mousePressed && object && objToRender === "bosque") {
    object.rotation.y = initialRotation.y - (mouseX - window.innerWidth / 2) * 0.002;
    object.rotation.x = initialRotation.x + (mouseY - window.innerHeight / 2) * 0.002;
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("mousedown", () => {
  if (object && objToRender === "bosque") {
    mousePressed = true;
    initialRotation.x = object.rotation.x;
    initialRotation.y = object.rotation.y;
  }
});

document.addEventListener("mouseup", () => {
  mousePressed = false;
});

document.addEventListener("wheel", (e) => {
  if (object && objToRender === "bosque") {
    const zoomAmount = e.deltaY * 0.1; 
    
    const distance = camera.position.distanceTo(object.position);
    
    const minDistance = 20;
    const maxDistance = 200;

    const newDistance = THREE.MathUtils.clamp(distance + zoomAmount, minDistance, maxDistance);

    const direction = camera.position.clone().sub(object.position).normalize();
    const newPosition = object.position.clone().add(direction.multiplyScalar(newDistance));

    camera.position.copy(newPosition);
  }
});

animate();
