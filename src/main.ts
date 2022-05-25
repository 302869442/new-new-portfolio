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
// import { projects } from "./databaseManager"

const canvas = <HTMLCanvasElement>document.getElementById("canvas")

const sceneManager = new SceneManager(canvas, false, true)
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
  const g = new THREE.BoxBufferGeometry(500, 500, 500)
  const m = new THREE.MeshBasicMaterial()
  const mesh = new THREE.Mesh(g, m)
  const mesh1 = new THREE.Mesh(g, m)
  const mesh2 = new THREE.Mesh(g, m)
  mesh.position.set(5000, 0 ,0)
  mesh1.position.set(5000, 0 ,0)
  mesh2.position.set(5000, 0, 0)
  mesh1.rotateOnWorldAxis(new THREE.Vector3(), 90)
  pillarManager.pillars.children[0].add(mesh)
  pillarManager.pillars.children[0].add(mesh1)
  pillarManager.pillars.children[0].add(mesh2)
}


function BridgeConfiguration() {
  bridgeManager.setMaterialParams(bridgesMatProps)

  
  for (let i = 0; i < 3; i++) {
    bridgeManager.addBridge(2000, 15000)
  }
  bridgeManager.setPosition(0, 0, 5000, -10000)
  bridgeManager.setRotation(0, 1.6, 0, 0.8)

}
function LightConfiguration() {
  lightManager.addLight('ambientLight')
}

function LineConfiguration() {
  // lineManager.addLine()
}


function EventListenerSetup(){
  window.addEventListener('resize', () => sceneManager.resize(innerWidth, innerHeight))
  window.addEventListener('click', (event) => raycasterManager.onPointerMove(innerWidth, innerHeight, event))
  // canvas.addEventListener('click',() => raycasterManager.checkIntersections())
}


pillarConfiguration()
// BridgeConfiguration()
LightConfiguration()
LineConfiguration()
ProjectPillarConfiguration()
EventListenerSetup()
SceneConfiguration()
// gsap.to(sceneManager.Camera.position, { duration: 2, x: 0, y: 30000, z: -7500 })
// gsap.to(sceneManager.Camera.rotation, { duration: 2, x: -1.6, y:0, z:0})






// pillarManager.addPillar()
// pillarManager.addPillar()

// base.addGroup(pillarManager.pillars)
