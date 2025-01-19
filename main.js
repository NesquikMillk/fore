import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// Сцена
const scene = new THREE.Scene();

// Отрисовщик
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Камера
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 3, 20);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2; // Ограничение на вращение камеры
controls.target.set(0, 1, 0);
controls.update();

// Установка белого фона
scene.background = new THREE.Color(0xffffff); // Белый цвет
scene.environment = null;

// Текст
const loader = new FontLoader();
loader.load(
  'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', // URL встроенного шрифта
  function (font) {
    const geometry = new TextGeometry('HEX: FFFFFF', {
      font: font,
      size: 2,
      height: 0.5,
      curveSegments: 15,
    });

    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Чёрный цвет текста
    const textMesh = new THREE.Mesh(geometry, material);

    // Центрирование текста
    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;
    const xOffset = (boundingBox.max.x - boundingBox.min.x) / 2;
    const yOffset = (boundingBox.max.y - boundingBox.min.y) / 2;
    textMesh.position.set(-xOffset, -yOffset, 0);

    scene.add(textMesh);
  }
);

// Источник света
const light = new THREE.PointLight(0x0000000, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Анимация
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
