import { PrismController, ui, Desc2d, EyeTrackingEventData } from 'lumin'
import { vec3, mat4 } from "gl-matrix"
import { Helpers } from "./helpers.js"

export class EyeFixation extends PrismController {
    constructor(name) {
      super(name)
    }
    onAttachPrism(prism){
        // This will cause the app to receive eye tracking events
        this.retain_eye_tracking = prism.retainEyeTrackingUpdates();

        // test description
        let uiDescription = ui.UiText.Create(prism, "Try to highlight the spheres by looking at them.\n The number next to the spheres is the fixation confidence.");
        uiDescription.setTextSize(0.07);
        uiDescription.setLocalPosition([-0.9, 0.65, 0]);
        this.getRoot().addChild(uiDescription);

        // confidence uitext
        let uiConfidence = ui.UiText.Create(prism, "");
        uiConfidence.setTextSize(0.06);
        this.getRoot().addChild(uiConfidence);
        this.uiConfidence = uiConfidence;

        // Add sphere resources
        let textureResource = prism.createTextureResourceId(Desc2d.DEFAULT, "res/checker.png");
        prism.createObjMtlResourceId("res/sphere.mtl");
        let sphere_model_resource = prism.createModelResourceId("res/sphere.obj", 1.0);

        // create the grid with spheres
        let grid_size = 4;
        let grid = ui.UiGridLayout.Create(prism);
        grid.setColumns(grid_size);
        grid.setLocalPosition([-1, 0.7, 0]);
        grid.setSize([2, 1.8]);
        grid.setDefaultItemAlignment(ui.Alignment.CENTER_CENTER);
        this.getRoot().addChild(grid);
        this.spheres = [];
        for (let i = 0; i < grid_size*grid_size; i++)
        {
            let sphere = prism.createModelNode(sphere_model_resource);
            sphere.setLocalScale([0.04,0.04,0.04]);
            sphere.setColor([1,1,1,1]);
            grid.addItem(sphere);
            this.spheres.push(sphere);
        }
        this.focusedSphere = this.spheres[0];

        // sphere indicator that follows eye fixation point - debug purpose only
        let indicator = prism.createModelNode(sphere_model_resource);
        indicator.setLocalScale([0.04,0.04,0.04]);
        indicator.setColor([1,1,1,1]);
        indicator.setVisible(false);
        this.getRoot().addChild(indicator);
        this.indicator = indicator;
    }
    onEvent(event){
        if (event instanceof EyeTrackingEventData)
        {
            // inverse prism transformation
            let inverse_prism_matrix = mat4.invert([], Helpers.toVec16(this.getPrism().getTransform()));

            // fixation point in world coordinate
            let fixation = event.getEyeTrackingFixationPosition();
            let fixation_local = vec3.transformMat4([], fixation, inverse_prism_matrix);

            //headpose base in eye position in world coordinate
            //let headpose = vec3.scale([], vec3.add([], event.getEyeTrackingLeftEyePosition(), event.getEyeTrackingRightEyePosition()), 0.5);
            let headpose = this.getPrism().app.getHeadposeWorldPosition();
            let headpose_local = vec3.transformMat4([], headpose, inverse_prism_matrix);

            let z_constrained_pos = this.rayPlaneIntersection([0,0,0], [0,0,1], headpose_local,
            vec3.normalize([], vec3.sub([], fixation_local, headpose_local))
            );

            // if(z_constrained_pos)
            // {
            //   this.indicator.setVisible(true);
            //   this.indicator.setLocalPosition(z_constrained_pos);
            //   this.indicator.setColor([(1-confidence), confidence, 0, 1]);
            // }
            // else
            // {
            //   this.indicator.setVisible(false);
            // }

            if (z_constrained_pos)
            {
            let fix = vec3.transformMat4([], z_constrained_pos, Helpers.toVec16(this.getPrism().getTransform()));

            let focusedSphere = this.focusedSphere;
            let minDist = vec3.dist(focusedSphere.getWorldPosition(), fix);
            for(let sphere of this.spheres)
            {
                let dist = vec3.dist(sphere.getWorldPosition(), fix);
                if ( dist < minDist){
                focusedSphere = sphere;
                minDist = dist;
                }
            }

            if (focusedSphere != this.focusedSphere){
                focusedSphere.setColor([0,1,0,1]);
                this.focusedSphere.setColor([1,1,1,1]);
                this.focusedSphere = focusedSphere;
            }

            // confidence
            let confidence = event.getEyeTrackingFixationConfidence();
            this.uiConfidence.setText(".   " + confidence.toFixed(2));
            let localpos = vec3.transformMat4([], this.focusedSphere.getWorldPosition(), inverse_prism_matrix);
            this.uiConfidence.setLocalPosition(localpos);
            }
        }
        return true;
    }
    onDetachPrism(prism){
        this.retain_eye_tracking = null;
        this.deleteSceneGraph();
    }
    rayPlaneIntersection(planePoint, planeNormal, rayOrigin, rayDir){

        let t =  vec3.dot(vec3.sub([], planePoint, rayOrigin), planeNormal) /  vec3.dot(rayDir, planeNormal);

        if (t > 0)
        {
          return vec3.add([], rayOrigin, vec3.scale([], rayDir, t));
        }
        return null;
    }
}