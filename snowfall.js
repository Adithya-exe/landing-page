import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import { append } from "three/src/nodes/TSL.js";
import { gosper } from "three/examples/jsm/utils/GeometryUtils.js";




const textureLoader = new THREE.TextureLoader();
const board = document.querySelector(".field");

const aspect = {
    width:window.innerWidth,
    height: window.innerHeight
};

const scene = new THREE.Scene();

const renderer =  new THREE.WebGLRenderer({
    canvas:board,
    alpha:true});

renderer.setSize(aspect.width,aspect.height);

const camera = new THREE.PerspectiveCamera(120,aspect.width/aspect.height,0.01,2000);

const geometry = new THREE.BufferGeometry();

const partSize = 10000;
const arr = new Float32Array(partSize*3); //having pos in x,y and z

for(let i =0;i<partSize*3;i++){

    arr[i] = (Math.random()-0.5)*4;
}
geometry.setAttribute("position",new THREE.BufferAttribute(arr,3));

const snow = textureLoader.load("/alphaSnow.jpg");

const mat = new THREE.PointsMaterial({
    alphaMap: snow,
    transparent: true,
    depthTest:false
});
mat.size = 0.01;

const mesh = new THREE.Points(geometry,mat);

camera.position.z = 2;

scene.add(camera);
scene.add(mesh);

const clock = new THREE.Clock();

let animate = ()=>{
    let gt = clock.getElapsedTime();
    window.requestAnimationFrame(animate);

mesh.rotation.y = gt*0.2;
mesh.rotation.z = gt*0.2;

    renderer.render(scene,camera);
}
animate();

const orbit = new OrbitControls(camera,board);
orbit.enableZoom = false;


window.addEventListener("resize",()=>{

    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    camera.aspect = aspect.width/aspect.height;
    renderer.setSize(aspect.width,aspect.height);
    
    camera.updateProjectionMatrix();
})

