import "./style.scss"
import * as THREE from "three"
import { SceneManager } from "./managers/SceneManager"
import {PillarManager} from "./managers/PillarManager"
import { HelperManager } from "./managers/HelperManager"
import { BridgeManager } from "./managers/BridgeManager"
import { LightManager } from "./managers/LightManager"
import { LineManager } from "./managers/LineManager"
import gsap from "gsap"
// import { projects } from "./databaseManager"

const canvas = <HTMLCanvasElement>document.getElementById("canvas")

const sceneManager = new SceneManager(canvas, false)
const pillarManager = new PillarManager(2000, 10000, 200)
const bridgeManager = new BridgeManager()
const helperManager = new HelperManager()
const lightManager = new LightManager()
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
helperManager.helpers.forEach(helper => {
  sceneManager.AddObjectGroup(helper)
})




function SceneConfiguration() {
  sceneManager.createScene(innerWidth, innerHeight)
  sceneManager.setCameraPosition(20000, 0, 25000)
  sceneManager.EnableControls()
  sceneManager.AddObjectGroup(pillarManager.pillars, 'pillars')
  sceneManager.AddObjectGroup(bridgeManager.bridges, 'bridges')
  sceneManager.AddObjectGroup(lightManager.lights, 'lights')
  sceneManager.AddObjectGroup(lineManager.lines, 'lines')
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


pillarConfiguration()
BridgeConfiguration()
LightConfiguration()
LineConfiguration()
SceneConfiguration()
gsap.to(sceneManager.Camera.position, { duration: 2, x: 0, y: 50000, z: 0 })
gsap.to(sceneManager.Camera.rotation, { duration: 2, x: -1.6, y:0, z:0})






// pillarManager.addPillar()
// pillarManager.addPillar()

// base.addGroup(pillarManager.pillars)
