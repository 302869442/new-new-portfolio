import * as THREE from "three"

export class LightManager {
  lights: THREE.Group

  constructor() {
    this.lights = new THREE.Group()
  }

  public addLight(type: string): void {
    switch (type) {
      case "PointLight":
        const PointLight = new THREE.PointLight(0xffffff, 1.0)
        this.lights.add(PointLight)
        break
      case "SpotLight":
        const spotlight = new THREE.SpotLight(0xffffff, 1.0)
        this.lights.add(spotlight)
        break
      case "DirectionalLight":
        const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
        this.lights.add(DirectionalLight)
        break
      case "ambientLight":
        const AmbientLight = new THREE.AmbientLight(0xffffff, 1.0)
        this.lights.add(AmbientLight)
        break
    }
  }
}
