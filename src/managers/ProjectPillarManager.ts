import * as THREE from 'three'
import { PillarManager } from './PillarManager';

export class ProjectPillarManager extends PillarManager{

    raycaster: THREE.Raycaster
    mousePosition: THREE.Vector2

    constructor(radius: number, height: number, segments: number) {
        super(radius, height, segments);
        this.raycaster = new THREE.Raycaster();
        this.mousePosition = new THREE.Vector2()
    }


    
    
}