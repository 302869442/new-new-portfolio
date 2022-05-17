import * as THREE from "three"

export class PillarManager {
    pillars: THREE.Group
    pillarGeometry: THREE.CylinderBufferGeometry
    pillarMaterial: THREE.MeshBasicMaterial
  
    constructor(radius: number, height: number, segments: number) {
      this.pillars = new THREE.Group()
      this.pillarGeometry = new THREE.CylinderBufferGeometry(radius, radius, height, segments)
      this.pillarMaterial = new THREE.MeshBasicMaterial()
      // this.setMaterialParams(this.pillarMaterial, cylinderMatProps)
    }
  
    setMaterialParams = (
      params: THREE.MeshBasicMaterialParameters
    ) => {
      this.pillarMaterial.setValues(params)
    }
    setPosition = (index: number, x: number, y: number, z: number) => {
      this.pillars.children[index].position.set(x, y, z)
    }
  
    public addPillar() {
      const mesh = new THREE.Mesh(this.pillarGeometry, this.pillarMaterial)
      this.pillars.add(mesh)
    }
  }