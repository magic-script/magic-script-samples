import { ui, Desc2d } from 'lumin';
import { Scene } from './scene.js'

export class DynamicFbxScene extends Scene {

    constructor(timeDelta) {
        super(timeDelta, 'DynamicFBX');
    }

    init() {
        super.init([1.0, 1.0, 1.0]);

        const model = this.addModel(
            'resources/turkey/turkey.kmat',
            'resources/turkey/turkey_baseColor.png',
            'resources/turkey/turkey4.fbx'
        );
        const modelResId = model.getModelResource();

        const toggle = this.addToggle([-0.25, -0.25, 0.25], 'Pause');
        toggle.onActivateSub((event) => {
        model.setAnimationPauseState(toggle.getOn());
        });

        const slider = this.addSlider([0, -0.25, 0.25], 0, 100);
        slider.onSliderChangedSub((event) => {
        model.setAnimationPlaybackSpeed(slider.getValue());
        });

        let iterator = 0;

        const button = this.addButton([0.25, -0.25, 0.25], 'Switch Animation');
        button.onActivateSub((event) => {

        if (iterator > 1) {
            iterator = 0;
        } else {
            iterator++;
        }
        
        switch (iterator)
        {
            case 0:
                model.playAnimation(modelResId, "walking", false, 0);
                break;
            case 1:
                model.playAnimation(modelResId, "spotted", false, 0);
                break;
            default:
                model.playAnimation(modelResId, 'idle', false, 0);
                break;
        }
        
        });

        this.addToRootNode(model);
        this.addToRootNode(toggle);
        this.addToRootNode(slider);
        this.addToRootNode(button);

        return 0;
    }

    addModel(materialPath, texturePath, modelPath) {
        this.Prism.createMaterialResourceId(materialPath);

        const textureID = this.Prism.createTextureResourceId(Desc2d.DEFAULT, texturePath);
        const modelResId = this.Prism.createModelResourceId(modelPath, 1.0);
        const model = this.Prism.createModelNode(modelResId);
        model.setTexture('turkey_material', 0, textureID)
        model.setLocalPosition([0, 0, 0]);
        model.setLocalScale([0.0075, 0.0075, 0.0075]);
        model.playAnimation(modelResId, 'idle', false, 0);
        return model;
    }

    addToggle(position, label) {
        const toggle = ui.UiToggle.Create(this.Prism, label);
        toggle.setLocalPosition(position);
        return toggle;
    }

    addSlider(position, min, max) {
        let slider = ui.UiSlider.Create(this.Prism, 0.25);
        slider.setLocalPosition(position);
        slider.setMinMax(min, max);
        return slider;
    }

    addButton(position, label) {
        const button = ui.UiButton.Create(this.Prism, label);
        button.setLocalPosition(position);
        return button;
    }

    updateLoop(delta) {
        return true;
    }
    eventListener(event) {
        return true;
    }
}
