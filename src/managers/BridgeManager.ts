import * as THREE from 'three'


export class BridgeManager {
  bridges: THREE.Group
  bridgeGeometry: THREE.PlaneBufferGeometry
  bridgeMaterial: THREE.MeshBasicMaterial
  
    constructor() {
      this.bridges = new THREE.Group()
      this.bridgeGeometry = new THREE.PlaneBufferGeometry(18000, 3000)
      this.bridgeMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
      //   this.setMaterialParams(this.bridgeMaterial, bridgesMatProps)
    }
    setPosition = (index: number, x: number, y: number, z: number) => {
      this.bridges.children[index].position.set(x, y, z)
    }
    setMaterialParams(props: THREE.MeshBasicMaterialParameters) {
      this.bridgeMaterial.setValues(props)
    }
    setRotation = (index: number, x: number, y: number, z: number) => {
      this.bridges.children[index].rotation.set(x, y, z)
    }
  
    public addBridge(width: number, length: number) {
      const bridge = new THREE.Mesh(this.bridgeGeometry, this.bridgeMaterial)
      console.log(this.bridgeGeometry.parameters.height)
      this.bridges.add(bridge)
    }
  }