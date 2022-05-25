import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"


const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );


export class SceneManager {
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private renderer: THREE.WebGLRenderer
    private pointer: THREE.Vector2
    readonly raycaster: THREE.Raycaster
    composer!: EffectComposer

    constructor(canvas: HTMLCanvasElement, EnablePostProcessing: boolean, EnableRaycasting: boolean) {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000)
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas })
        this.pointer = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()
        // if (EnablePostProcessing === true) {
        //     this.composer = new EffectComposer(this.renderer)
        //     this.composer.addPass(bloomPass)
        //     this.PostProcessingAnimate()
        //     return
        // }
        if (EnablePostProcessing === false) {
            this.animate(true)
            return
        }
        this.checkAllowedRaycasting(EnableRaycasting)

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
     * @param group specify a group to be added to the scene
     * @param name name of the group
     * 
     */
    public AddObjectGroup(group: THREE.Group, name?: string) {
        if (name) {
            group.name = name
        }
        this.scene.add(group)       
    }
    /**
     * enables orbitControls for this scene
     */
    public EnableControls(): void {
        const orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    }

    public createScene(w: number, h: number): void{
        this.renderer.setSize(w, h)
    }
    /**
     * sets the camera position
     */
    public setCameraPosition(x: number, y: number, z: number) {
        this.camera.position.set(x, y, z)
    }
    public onPointerMove(height: number, width: number,event: PointerEvent) {
        this.pointer.x = (event.clientX - width) * 2 - 1
        this.pointer.y = (event.clientY - height) * 2 - 1
    }
    public resize(width: number, height: number) {
        this.renderer.setSize(width, height)
        this.renderer.setPixelRatio(devicePixelRatio)
        this.camera.aspect = width / height
    }
    private PostProcessingAnimate() {
        requestAnimationFrame(() => this.PostProcessingAnimate())
        this.composer.render()
    }

    private animate(raycaster: boolean) {
        requestAnimationFrame(() => this.animate(raycaster))
        this.renderer.render(this.scene, this.camera)
        if (raycaster == true) {
            this.checkIntersections()
        }
    }
    private checkAllowedRaycasting(enabled: boolean) {
        if (enabled == true) {
            return true
        }
        if (enabled == false) {
            return false
        }
        return
    }
    private checkIntersections() {
        this.raycaster.setFromCamera(this.pointer, this.camera);
        if (this.scene.children.length > 0) {
            const intersects = this.raycaster.intersectObjects(this.scene.children, true)
            for (let i = 0; i < intersects.length; i++){
                console.log(intersects)
            }
        }

    }
    public logAllObjects() {
        console.log(this.scene.children);
        
    }


}