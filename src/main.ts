import "./style.scss"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { MaterialParameters, Object3D, Side } from "three"

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
      1000
    )
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas })
    this.pointer = new THREE.Vector2()
    if (!canvas) {
      this.renderer = new THREE.WebGLRenderer()
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

  private onMouseMove(e: MouseEvent) {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1
  }

  setMaterialParams(m: THREE.Material, params?: THREE.MaterialParameters) {
    m.setValues(<MaterialParameters>params)
  }

  resize() {
    window.addEventListener("resize", () => this.resize())
    this.renderer.setSize(innerWidth, innerHeight)
    this.renderer.setPixelRatio(devicePixelRatio)
    this.camera.aspect = innerWidth / innerHeight
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
const objects: Object3D[] = []

const circleMaterial = new THREE.MeshBasicMaterial()

const g = new THREE.CircleBufferGeometry(20, 20)

base.addObject('test', g, new THREE.MeshBasicMaterial({color: 'white', side: THREE.DoubleSide}))
base.addObject('test2', g, new THREE.MeshBasicMaterial({color: 'white', side: THREE.DoubleSide}))
base.addObject('test3', g, new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide }))
base.setObjectPosition('test', 150, 0, 0)
base.setObjectPosition('test2', -150, 0, 0)
base.setObjectPosition('test3', 0, 300, 0)

const line = new THREE.LineLoop(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({color: 'white'}))
base.Scene.add(line)

console.log(base.Scene)

base.setCameraPosition(0, 0, 500)
base.addLight(new THREE.AmbientLight())

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
