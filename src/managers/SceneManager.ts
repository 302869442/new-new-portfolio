import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"


const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );


export class SceneManager {
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private renderer: THREE.WebGLRenderer
    composer!: EffectComposer

    constructor(canvas: HTMLCanvasElement, EnablePostProcessing: boolean) {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000)
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas })
        if (EnablePostProcessing === true) {
            this.composer = new EffectComposer(this.renderer)
            this.composer.addPass(bloomPass)
            this.PostProcessingAnimate()
            return
        }
        if (EnablePostProcessing === false) {
            this.animate()
            return
        }

        // this.createScene()
        this.resize()
    }
    
    
    public get Scene() : THREE.Scene {
        return this.scene
    }
    public get Camera(): THREE.Camera {
        return this.camera
    }
    public get Renderer(): THREE.Renderer {
        return this.renderer
    }
    /**
     * 
     * @param group 
     * @param name 
     */
    public AddObjectGroup(group: THREE.Group, name?: string) {
        if (name) {
            group.name = name
        }
        this.scene.add(group)
        // console.log(this.scene.children);
        
    }
    public EnableControls() {
        const orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    }

    public createScene(w: number, h: number): void{
        this.renderer.setSize(w, h)
        // this.composer.setSize(w, h)
        // this.composer.setPixelRatio(devicePixelRatio)
        // document.body.appendChild(this.renderer.domElement)
    }
    public setCameraPosition(x: number, y: number, z: number) {
        this.camera.position.set(x, y, z)
    }
    private resize() {
        window.addEventListener("resize", () => this.resize())
        this.renderer.setSize(innerWidth, innerHeight)
        this.renderer.setPixelRatio(devicePixelRatio)
        this.camera.aspect = innerWidth / innerHeight
    }
    private PostProcessingAnimate() {
        requestAnimationFrame(() => this.PostProcessingAnimate())
        this.composer.render()
    }

    private animate() {
        requestAnimationFrame(() => this.animate())
        this.renderer.render(this.scene, this.camera)
    
    }
    public logAllObjects() {
        console.log(this.scene.children);
        
    }


}