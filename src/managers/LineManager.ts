import * as THREE from "three"
import {Line2} from 'three/examples/jsm/lines/Line2'
import {LineGeometry} from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial"

export class LineManager {
  lines: THREE.Group

  constructor() {
    this.lines = new THREE.Group()
  }

  public addLine() {
    const material = new LineMaterial({ color: 0x0000ff })
    const points = []
    for(let i = 0; i <= 360; i++){
        points.push(Math.sin(i*(Math.PI/180))*0.5, Math.cos(i*(Math.PI/180))*0.5, 0);
    }

      const geometry = new LineGeometry()
      geometry.setPositions(points)
    const line = new Line2(geometry, material)
    
    this.lines.add(line)
  }
}
