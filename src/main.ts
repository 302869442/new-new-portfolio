import "./style.scss"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import {
  MaterialParameters,
  MeshBasicMaterialParameters,
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  PlaneBufferGeometry,
  ShaderMaterial,
  ShaderMaterialParameters,
} from "three"
import VShader from "./vertex.glsl"
import fShader from "./fragment.glsl"
//get the canvas
const canvas = <HTMLCanvasElement>document.getElementById("canvas")

export class baseScene {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private pointer: THREE.Vector2
  raycaster?: THREE.Raycaster

  constructor(canvas?: HTMLCanvasElement) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      100000
    )
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas })
    this.pointer = new THREE.Vector2()
    if (!canvas) {
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      document.body.appendChild(this.renderer.domElement)
    }
    this.raycaster
    this.createScene()
  }

  public get Camera(): THREE.PerspectiveCamera {
    return this.camera
  }
  public get Scene(): THREE.Scene {
    return this.scene
  }
  public get Renderer(): THREE.WebGLRenderer {
    return this.renderer
  }

  addRayCaster() {
    this.raycaster = new THREE.Raycaster()
    window.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e))
  }
  addGrid(grid: THREE.GridHelper) {
    this.scene.add(grid)
  }
  /**
   *
   * @param type
   * @param color
   */
  addLight(type: THREE.Light, color: THREE.Color = new THREE.Color(0xffffff)) {
    const light = type
    type.name = type.toString()
    type.color = color
    this.scene.add(light)
  }
  /**
   *
   * @param name name of the object
   * @param g geometry of the mesh
   * @param m material of the mesh
   */
  addObject(name: string, g: THREE.BufferGeometry, m: THREE.Material) {
    const mesh = new THREE.Mesh(g, m)
    mesh.name = name
    this.scene.add(mesh)
  }
  animate() {
    requestAnimationFrame(() => this.animate())
    this.renderer.render(this.scene, this.camera)
    if (this.raycaster) {
    }
  }

  private createScene() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.animate()
    this.resize()
  }
  getAllObjects(): THREE.Object3D[] {
    return this.scene.children
  }
  loadModel(path: string, loaderType: THREE.Loader) {
    const loader = loaderType
  }
  loadTexture(path: string): THREE.Texture {
    const loader = new THREE.TextureLoader()
    return loader.load(path)
  }

  private onMouseMove(e: MouseEvent): void {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1
  }

  setMaterialParams(m: THREE.Material, params?: THREE.MaterialParameters) {
    m.setValues(<MaterialParameters>params)
  }
  logObject(name: string) {
    console.log(this.scene.getObjectByName(name))
  }

  resize() {
    window.addEventListener("resize", () => this.resize())
    this.renderer.setSize(innerWidth, innerHeight)
    this.renderer.setPixelRatio(devicePixelRatio)
    this.camera.aspect = innerWidth / innerHeight
  }
  addFog(f: THREE.FogExp2 | THREE.Fog) {
    this.scene.fog = f
  }
  addGroup(g: THREE.Group) {
    this.scene.add(g)
  }
  /**
   *
   * @param name name of the object
   * @param x x coordinate of the object
   * @param y y coordinate of the object
   * @param z z coordinate of the object
   */
  setObjectPosition(name: string, x: number, y: number, z: number): void {
    const obj = this.scene.getObjectByName(name)
    if (obj) {
      obj.position.set(x, y, z)
    }
  }
  setObjectRotation(name: string, x: number, y: number, z: number): void {
    const obj = this.scene.getObjectByName(name)
    if (obj) {
      obj.rotation.set(x, y, z)
    }
  }
  setCameraPosition(x: number, y: number, z: number) {
    this.camera.position.set(x, y, z)
  }

  setVertices(point: THREE.Vector3[], g: THREE.BufferGeometry) {
    g.setFromPoints(point)
    return g
  }
}

const base = new baseScene(canvas)
const testmap = base.loadTexture("../assets/cool-background.png")
const cylinderMatProps: MeshBasicMaterialParameters = {
  transparent: true,
  opacity: 0.3,
  color: new THREE.Color("cyan"),
  side: THREE.DoubleSide,
}

const bridgesMatProps: MeshPhysicalMaterialParameters = {
  color: new THREE.Color("white"),
  reflectivity: 1.0,
  roughness: 0.1,
  transmission: 1.0,
  side: THREE.DoubleSide,
}
const imageMatProps: ShaderMaterialParameters = {
  vertexShader: VShader,
  fragmentShader: fShader,
  uniforms: {
    imgTexture: {
      value: testmap,
    },
  },
}

const imageMaterial = new ShaderMaterial()
const imageGeometry = new THREE.PlaneBufferGeometry(2000, 2000)

const cylinderMaterial = new THREE.MeshBasicMaterial()
const cylinderGeometry = new THREE.CylinderBufferGeometry(
  2000,
  2000,
  10000,
  200
)

base.setMaterialParams(cylinderMaterial, cylinderMatProps)
base.setMaterialParams(imageMaterial, imageMatProps)

base.addObject("test", cylinderGeometry, cylinderMaterial)
base.addObject("test2", cylinderGeometry, cylinderMaterial)
base.addObject("test3", cylinderGeometry, cylinderMaterial)
base.addObject("testproject", imageGeometry, imageMaterial)
base.addGrid(new THREE.GridHelper(10000, 125, "white"))

base.setObjectPosition("test", 10000, 0, 0)
base.setObjectPosition("test2", 0, 0, -15000)
base.setObjectPosition("test3", -10000, 0, 0)

const fog = new THREE.FogExp2(0xfffff, 1)
// base.addFog(fog)

base.setCameraPosition(0, 0, 2500)
// base.addLight(new THREE.AmbientLight())

const projects: Project[] = []
projects.push()

interface Project {
  name: string
  description: string
  image: string
  year: number
}
interface Skill {
  name: string
  model: any
}

class ProjectManager {
  projects: Project[]
  constructor() {
    this.projects = []
  }

  public addProject(name: string, description: string) {}
}




class BridgeManager {
  bridges: THREE.Group
  bridgeGeometry: PlaneBufferGeometry
  bridgeMaterial: MeshPhysicalMaterial

  constructor() {
    this.bridges = new THREE.Group()
    this.bridgeGeometry = new PlaneBufferGeometry()
    this.bridgeMaterial = new MeshPhysicalMaterial()
    this.setMaterialParams(this.bridgeMaterial, bridgesMatProps)
  }

  setMaterialParams = (
    m: THREE.MeshPhysicalMaterial,
    params: THREE.MeshPhysicalMaterialParameters
  ) => {
    m.setValues(params)
  }
  setPosition = (index: number, x: number, y: number, z: number) => {
    this.bridges.children[index].position.set(x, y, z)
  }
  setRotation = (index: number, x: number, y: number, z: number) => {
    this.bridges.children[index].rotation.set(x, y, z)
  }

  public addBridge(width: number, length: number) {
    const bridge = new THREE.Mesh(this.bridgeGeometry, this.bridgeMaterial)
    bridge.geometry.parameters.width = length
    bridge.geometry.parameters.height = width
    this.bridges.add(bridge)
  }
}
class PillarManager {
  pillars: THREE.Group
  bridgeGeometry: PlaneBufferGeometry
  bridgeMaterial: MeshPhysicalMaterial

  constructor() {
    this.pillars = new THREE.Group()
    this.bridgeGeometry = new PlaneBufferGeometry()
    this.bridgeMaterial = new MeshPhysicalMaterial()
    this.setMaterialParams(this.bridgeMaterial, bridgesMatProps)
  }

  setMaterialParams = (
    m: THREE.MeshPhysicalMaterial,
    params: THREE.MeshPhysicalMaterialParameters
  ) => {
    m.setValues(params)
  }
  setPosition = (index: number, x: number, y: number, z: number) => {
    this.pillars.children[index].position.set(x, y, z)
  }
  setRotation = (index: number, x: number, y: number, z: number) => {
    this.pillars.children[index].rotation.set(x, y, z)
  }

  public addBridge(width: number, length: number) {
    const bridge = new THREE.Mesh(this.bridgeGeometry, this.bridgeMaterial)
    bridge.geometry.parameters.width = length
    bridge.geometry.parameters.height = width
    this.pillars.add(bridge)
  }
}


const bridgeManager = new BridgeManager()
bridgeManager.addBridge(18000, 1500)
bridgeManager.setPosition(0, 0, 2000, 0)

base.addGroup(bridgeManager.bridges)
console.log(bridgeManager.bridges);

