import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createGhost, animateGhost } from './ghost.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101018);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.set(2, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ antialias:   true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement); 

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const sol = new THREE.DirectionalLight(0xffffff, 1.2);
sol.position.set(3, 5, 4);
scene.add(sol);
scene.add(new THREE.GridHelper(10, 10));

const ghost = createGhost();
scene.add(ghost);

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const t = clock.getElapsedTime();
  animateGhost(ghost, t);
  renderer.render(scene, camera);
});