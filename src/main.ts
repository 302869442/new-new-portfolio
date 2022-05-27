import "./style.scss"
import * as THREE from "three"
import { SceneManager } from "./managers/SceneManager"
import {PillarManager} from "./managers/PillarManager"
import { HelperManager } from "./managers/HelperManager"
import { BridgeManager } from "./managers/BridgeManager"
import { LightManager } from "./managers/LightManager"
import { LineManager } from "./managers/LineManager"
import { RaycasterManager } from "./managers/RaycasterManager"
import gsap from "gsap"
import { ProjectPillarManager } from "./managers/ProjectPillarManager"
import { degToRad } from "three/src/math/MathUtils"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
// import { projects } from "./databaseManager"

const canvas = <HTMLCanvasElement>document.getElementById("canvas")

const sceneManager = new SceneManager(canvas, true, false)
const pillarManager = new PillarManager(2000, 10000, 200)
const projectPillarManager = new ProjectPillarManager(500, 10000, 200)
const bridgeManager = new BridgeManager()
const helperManager = new HelperManager()
const lightManager = new LightManager()
const raycasterManager = new RaycasterManager(sceneManager.Scene, sceneManager.Camera)
const lineManager = new LineManager() 

const bridgesMatProps: THREE.MeshPhysicalMaterialParameters = {
  color: new THREE.Color("white"),
  // reflectivity: 1.0,
  // roughness: 0.1,
  // transmission: 1.0,
  side: THREE.DoubleSide,
}

const cylinderMatProps: THREE.MeshBasicMaterialParameters = {
  transparent: true,
  opacity: 0.3,
  color: new THREE.Color("cyan"),
  side: THREE.DoubleSide,
}
// helperManager.AddHelper('grid')
// helperManager.helpers.forEach(helper => {
//   sceneManager.AddObjectGroup(helper)
// })




function SceneConfiguration() {
  sceneManager.createScene(innerWidth, innerHeight)
  sceneManager.setCameraPosition(20000, 0, 25000)
  sceneManager.EnableControls()
  sceneManager.AddObjectGroup(pillarManager.pillars, 'pillars')
  sceneManager.AddObjectGroup(bridgeManager.bridges, 'bridges')
  sceneManager.AddObjectGroup(lightManager.lights, 'lights')
  sceneManager.AddObjectGroup(lineManager.lines, 'lines')
  sceneManager.AddObjectGroup(projectPillarManager.pillars, 'projectPillars')
  sceneManager.logAllObjects()
}
function pillarConfiguration() {
  pillarManager.setMaterialParams(cylinderMatProps)
  for (let i = 0; i < 3; i++) {
    pillarManager.addPillar()
  }
  pillarManager.setPosition(0, 10000, 0, 0)
  pillarManager.setPosition(1, 0, 0, -15000)
  pillarManager.setPosition(2, -10000, 0, 0)
}

function ProjectPillarConfiguration() {
  // projectPillarManager.setMaterialParams(cylinderMatProps)
  // for (let i = 0; i < 3; i++) {
  //   projectPillarManager.addPillar()
  // }
  // projectPillarManager.setPosition(0, 0, 0, 0)
  // mesh.position.setFromCylindricalCoords(5000, 40, 0)
  // mesh1.position.set(5000, 0 ,0)
  // mesh2.position.set(5000, 0, 0)
  // mesh1.rotateOnWorldAxis(new THREE.Vector3(), 90)
}


function setSubPillarPositions() {
  const g = new THREE.CylinderBufferGeometry(500, 500, 10000, 200)
  const m = new THREE.MeshBasicMaterial()
  m.setValues(cylinderMatProps)
  const arr = [
    new THREE.Mesh(g, m),
    new THREE.Mesh(g, m),
    new THREE.Mesh(g, m),
    new THREE.Mesh(g, m),
    new THREE.Mesh(g, m),
  ]
  const arr2 = [
    new THREE.Mesh(g, m),
    new THREE.Mesh(g, m),
    new THREE.Mesh(g, m),
    new THREE.Mesh(g, m),
    new THREE.Mesh(g, m),
  ]
  for (let i = 0; i < 5; i++) {
    pillarManager.pillars.children[0].add(arr[i])
    arr[i].position.setFromCylindricalCoords(5000, degToRad(i * 36), 0)
  }
  for (let i = 0; i < 5; i++) {
    pillarManager.pillars.children[2].add(arr2[i])
    arr2[i].position.setFromCylindricalCoords(5000, degToRad(i * -36), 0)
  }
  
}
function addPostProcessing() {
  const renderPass = new RenderPass(sceneManager.Scene, sceneManager.Camera)
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 3, 1, 1);
  sceneManager.addPass(renderPass)
  sceneManager.addPass(bloomPass)
}




function BridgeConfiguration() {
  bridgeManager.setMaterialParams(bridgesMatProps) 
  for (let i = 0; i < 3; i++) {
    bridgeManager.addBridge(2000, 15000)
  }
  bridgeManager.setPosition(0, 4500, 5000, -7500)
  bridgeManager.setPosition(1, 0, 5000, 0)
  bridgeManager.setPosition(0, 4500, 5000, -7500)
  bridgeManager.setRotation(0, degToRad(90), 0, degToRad(60))
  bridgeManager.setRotation(1, degToRad(90), 0, 0)
  bridgeManager.setRotation(2, degToRad(90), 0, degToRad(-45))

}
function LightConfiguration() {
  lightManager.addLight('ambientLight')
}

function LineConfiguration() {
  // lineManager.addLine()
}


function EventListenerSetup(){
  window.addEventListener('resize', () => sceneManager.resize(innerWidth, innerHeight))
  // window.addEventListener('click', (event) => raycasterManager.onPointerMove(innerWidth, innerHeight, event))
  // canvas.addEventListener('click',() => raycasterManager.checkIntersections())
}

addPostProcessing()
pillarConfiguration()
// BridgeConfiguration()
LightConfiguration()
setSubPillarPositions()
LineConfiguration()
ProjectPillarConfiguration()
EventListenerSetup()
SceneConfiguration()
// gsap.to(sceneManager.Camera.position, { duration: 2, x: 0, y: 30000, z: -7500 })
// gsap.to(sceneManager.Camera.rotation, { duration: 2, x: -1.6, y:0, z:0})

