import * as THREE from "three";
import { SceneManager } from "./SceneManager";



export class RaycasterManager{
    pointer: THREE.Vector2
    raycaster: THREE.Raycaster
    scene: THREE.Scene
    camera: THREE.Camera
    
    constructor(scene: THREE.Scene, camera: THREE.Camera) {
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.scene = scene
        this.camera = camera
    }
    
    onPointerMove(height: number, width: number, event: MouseEvent): void {
        this.pointer.x = (event.clientX - width) * 2 - 1
        this.pointer.y = (event.clientY - height) * 2 - 1
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true)
        console.log(intersects);
        
        if (intersects.length > 0) {
            console.log("raycaster intersects with object: " + intersects);
        }
    }
    checkIntersections() {

        // console.log(intersects[0])
    }



}