import "./style.scss"
import * as THREE from "three"
import { SceneManager } from "./managers/SceneManager"
import {PillarManager} from "./managers/PillarManager"
import { HelperManager } from "./managers/HelperManager"
import { BridgeManager } from "./managers/BridgeManager"
import { LightManager } from "./managers/LightManager"
import { LineManager } from "./managers/LineManager"
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
  sceneManager.setCameraPosition(0, 0, 2500)
  sceneManager.EnableControls()
  sceneManager.AddObjectGroup(pillarManager.pillars, 'pillars')
  sceneManager.AddObjectGroup(bridgeManager.bridges, 'bridges')
  sceneManager.AddObjectGroup(lightManager.lights, 'lights')
  sceneManager.AddObjectGroup(lineManager.lines, 'lines')
  sceneManager.Camera.lookAt(bridgeManager.bridges.children[0].position)
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






// pillarManager.addPillar()
// pillarManager.addPillar()

// base.addGroup(pillarManager.pillars)
