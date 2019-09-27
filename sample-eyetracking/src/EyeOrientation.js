import { PrismController, ui, Desc2d, EyeTrackingEventData } from 'lumin'
import { vec3, mat4, quat } from "gl-matrix"
import { Helpers } from "./helpers.js"

export class EyeOrientation extends PrismController {
    constructor(name) {
      super(name)
    }
    onAttachPrism(prism){
        // This will cause the app to receive eye tracking events
        this.retain_eye_tracking = prism.retainEyeTrackingUpdates();

        // test description
        let text =
        "-The spheres shown are projected in front of the positions of each eye.\n\
        -The color of each eye ranges from green to red based on the confidence.\n\
        -Scale down and move the prism close to you for better visualization of the eye models\n\
        -For rotation, scale up and move close to models, then Turn your head up/down/left/Right\n\
         or bent it to left/right.";

        let uiDescription = ui.UiText.Create(prism, text);
        uiDescription.setTextSize(0.06);
        uiDescription.setLocalPosition([-0.9, 0.5, 0]);
        this.getRoot().addChild(uiDescription);

        // audio resources
        let blink_res = prism.createLoadedFileAudioResourceId("res/blink.mp3");
        let blink_sound = prism.createAudioNode();
        blink_sound.createSoundWithLoadedFile(blink_res, false, true);
        this.getRoot().addChild(blink_sound);
        this.blink_sound = blink_sound;

        let left_blink_res = prism.createLoadedFileAudioResourceId("res/left_blink.mp3");
        let left_blink_sound = prism.createAudioNode();
        left_blink_sound.createSoundWithLoadedFile(left_blink_res, false, true);
        this.getRoot().addChild(left_blink_sound);
        this.left_blink_sound = left_blink_sound;

        let right_blink_res = prism.createLoadedFileAudioResourceId("res/right_blink.mp3");
        let right_blink_sound = prism.createAudioNode();
        right_blink_sound.createSoundWithLoadedFile(right_blink_res, false, true);
        this.getRoot().addChild(right_blink_sound);
        this.right_blink_sound = right_blink_sound;

        // Add sphere resources
        let textureResource = prism.createTextureResourceId(Desc2d.DEFAULT, "res/checker.png");
        prism.createObjMtlResourceId("res/capsule.mtl");
        let sphere_model_resource = prism.createModelResourceId("res/capsule.obj", 1.0);

        let left_eye_model = prism.createModelNode(sphere_model_resource);
        left_eye_model.setLocalScale([0.06, 0.06, 0.06]);
        left_eye_model.setColor([1,1,1,1]);
        this.getRoot().addChild(left_eye_model);
        this.left_eye_model = left_eye_model;

        let right_eye_model = prism.createModelNode(sphere_model_resource);
        right_eye_model.setLocalScale([0.06, 0.06, 0.06]);
        right_eye_model.setColor([1,1,1,1]);
        this.getRoot().addChild(right_eye_model);
        this.right_eye_model = right_eye_model;

        // eye blink states
        this.rightEyeIsOpened = true;
        this.leftEyeIsOpened  = true;

    }
    onEvent(event){
        if (event instanceof EyeTrackingEventData)
        {
            // inverse prism transformation
            let inverse_prism_matrix = mat4.invert([], this.getPrism().getTransform());
            let inverse_prism_rot = quat.invert([], this.getPrism().getRotation());

            // left eye position
            let left_world_pos = event.getEyeTrackingLeftEyePosition();
            let left_local_pos = vec3.transformMat4([], left_world_pos, inverse_prism_matrix);
            this.left_eye_model.setLocalPosition([left_local_pos[0],left_local_pos[1], 0]);

            // left eye rotation
            let left_world_rot = event.getEyeTrackingLeftEyeRotation();
            let left_local_rot = quat.normalize([], quat.mul([], inverse_prism_rot, left_world_rot));
            this.left_eye_model.setLocalRotation(left_local_rot);

            // left eye confidence
            let left_confidence = event.getEyeTrackingLeftEyeConfidence();
            this.left_eye_model.setColor([1-left_confidence, left_confidence, 0, 1]);

            // right eye position
            let right_world_pos = event.getEyeTrackingRightEyePosition();
            let right_local_pos = vec3.transformMat4([], right_world_pos, inverse_prism_matrix);
            this.right_eye_model.setLocalPosition([right_local_pos[0],right_local_pos[1], 0]);

            // right eye rotation
            let right_world_rot = event.getEyeTrackingRightEyeRotation();
            let right_local_rot = quat.normalize([], quat.mul([], inverse_prism_rot, right_world_rot));
            this.right_eye_model.setLocalRotation(right_local_rot);

            // right eye confidence
            let right_confidence = event.getEyeTrackingRightEyeConfidence();
            this.right_eye_model.setColor([1-right_confidence, right_confidence, 0, 1]);


            // blink states
            let rightEyeBlink = event.getEyeTrackingRightEyeBlinkState();
            let leftEyeBlink = event.getEyeTrackingLeftEyeBlinkState();
            if(this.leftEyeIsOpened && this.rightEyeIsOpened && leftEyeBlink && rightEyeBlink)
            {
                this.leftEyeIsOpened = false;
                this.rightEyeIsOpened = false;
                this.blink_sound.startSound();
            }
            else if(this.leftEyeIsOpened && leftEyeBlink)
            {
                this.leftEyeIsOpened = false;
                this.left_blink_sound.startSound();
            }
            else if(this.rightEyeIsOpened && rightEyeBlink)
            {
                this.rightEyeIsOpened = false;
                this.right_blink_sound.startSound();
            }
            if (!leftEyeBlink){
                this.leftEyeIsOpened = true;
            }
            if (!rightEyeBlink){
                this.rightEyeIsOpened = true;
            }
        }
        return true;
    }
    onDetachPrism(prism){
        this.retain_eye_tracking = null;
        this.deleteSceneGraph();
    }
}