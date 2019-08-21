import { PrismController, ui, Desc2d, EyeTrackingEventData } from 'lumin'
import { vec3, mat4, quat } from "gl-matrix"
import { Helpers } from "./helpers.js"

export class EyeFixationComfort extends PrismController {
    constructor(name) {
      super(name)
    }
    onAttachPrism(prism){

        // test description
        let text =
        "-The shpere in the scene is the fixation point projected to the plane Z=0.\n\
        -It will turn red as eye tracking detects discomfort.\n\
        -Put your hand in front of your eye and focus on it.\n\
        -Move your hand toward your eyes (keep focusg on it) until fixation violation occurs.";

        let uiDescription = ui.UiText.Create(prism, text);
        uiDescription.setTextSize(0.06);
        uiDescription.setLocalPosition([-0.9, 0.6, 0]);
        this.getRoot().addChild(uiDescription);

        // Add sphere resources
        let textureResource = prism.createTextureResourceId(Desc2d.DEFAULT, "res/checker.png");
        prism.createObjMtlResourceId("res/sphere.mtl");
        let sphere_model_resource = prism.createModelResourceId("res/sphere.obj", 1.0);

        let indicator = prism.createModelNode(sphere_model_resource);
        indicator.setLocalScale([0.04,0.04, 0.04]);
        indicator.setColor([0,1,0,1]);
        this.getRoot().addChild(indicator);
        this.indicator = indicator;

        // audio resources
        let discomfort_clip = prism.createLoadedFileAudioResourceId("res/fixation_violation.mp3");
        let discomfort_warning = prism.createAudioNode();
        discomfort_warning.createSoundWithLoadedFile(discomfort_clip, false, true);
        this.getRoot().addChild(discomfort_warning);
        this.discomfort_warning = discomfort_warning;


        this.warning_reset_time = 0.0;

        // This will cause the app to receive eye tracking events
        this.retain_eye_tracking = prism.retainEyeTrackingUpdates();
    }
    onUpdate(delta){
        this.warning_reset_time -= delta;
        if(this.warning_reset_time < 0.0) this.warning_reset_time = 0.0;
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

            this.indicator.setLocalPosition(z_constrained_pos);

            //let str = event.isFixationDepthUnconfortable() + " " + event.hasFixationViolationOccured() + " " + event.remainingTimeAtUncomfortableDepth();
            //this.uiFixation.setText(str);
            if(event.isFixationDepthUnconfortable()) {

                //float t = (10.0f - event.remainingTimeAtUncomfortableDepth()) * 0.1f;

                //color = glm.mix(glm.vec4(1.0f, 1.0f, 1.0f, 1.0f), glm.vec4(1.0f, 0.0f, 0.0f, 1.0f), t);
                this.indicator.setColor([1,0,0,1]);

                if(event.hasFixationViolationOccured() && this.warning_reset_time <= 0.0) {
                  this.discomfort_warning.startSound();
                  this.warning_reset_time = 1.5;
                }
            } else {
                this.indicator.setColor([0,1,0,1]);
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