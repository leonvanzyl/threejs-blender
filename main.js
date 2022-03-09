import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import gsap from "gsap";

const gui = new dat.GUI();

const scene = new THREE.Scene();

let tl1 = gsap.timeline();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = -3;
pointLight.position.y = 0;
pointLight.position.z = 5;
scene.add(pointLight);

const loader = new GLTFLoader();

const donut = loader.load(
  "donut.glb",
  function (gltf) {
    gltf.scene.scale.set(10, 10, 10);

    scene.add(gltf.scene);
    gui.add(gltf.scene.rotation, "x").min(0).max(9);
    gui.add(gltf.scene.rotation, "y").min(0).max(9);
    gui.add(gltf.scene.rotation, "z").min(0).max(9);

    tl1.to(gltf.scene.rotation, { y: 7, duration: 5 });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
