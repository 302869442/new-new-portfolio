import * as THREE from "three"
import { AxesHelper, BoxHelper, GridHelper, Object3D } from "three";


export class HelperManager {
    helpers: Object3D[];
    
    constructor() {
        this.helpers = new Array<Object3D>();
    }

    /**
     * AddHelper
     */
    public AddHelper(type: string) {
        switch (type) {
            case 'grid':
                const grid = new GridHelper(10000, 200, 'white');
                this.helpers.push(grid)
                break;
            case 'axes':
                const axes = new AxesHelper(20);
                this.helpers.push(axes);
        
            default:
                break;
        }
    }


}