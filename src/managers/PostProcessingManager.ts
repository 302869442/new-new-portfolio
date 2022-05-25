import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'


export class PostProcessingManager {
    composer: EffectComposer

    constructor(renderer: THREE.WebGLRenderer) {
        this.composer = new EffectComposer(renderer)

    }
}