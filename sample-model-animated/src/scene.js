import { LandscapeApp } from "lumin";

export class Scene extends LandscapeApp {
    
    constructor (timeDelta, name) {
        super(timeDelta);

        this._name = name;    
    }

    // size is [width, height, depth]
    init(size) {
        this._prism = this.requestNewPrism(size);
    }

    get Prism() {
        return this._prism;
    }

    addToRootNode(node) {
        this._prism.getRootNode().addChild(node);
    }
}