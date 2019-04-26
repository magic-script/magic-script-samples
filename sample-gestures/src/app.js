import { ImmersiveApp, ui, PrismType, input, color, HandGestureFlags, GestureInputEventData} from "lumin";

import { mat4, vec3 } from "gl-matrix";

class Keypoint
{
  constructor(a_model, a_pos)
  {
    this.model = a_model;
    this.worldPos = a_pos;
  }
}

class Hand
{
  constructor()
  {
    this.gesture = input.GestureType.NONE;
    this.confidence = 1.0;
    this.timer = 1.0;
    this.keypointMap = {}
  }
}

export class App extends ImmersiveApp
{
  init()
  {
    let prism = this.requestNewPrism([3.0, 3.0, 3.0], PrismType.kCamera);
    this.selectPrism(prism, true);
    prism.loadResourceModel("res/Resources.xml");
    this.objName = prism.loadObjectModel("res/Objects.xml");

    ui.Cursor.SetPlaneDepth(prism, -1.0);
    ui.Cursor.SetScale(prism, 0.03);

    this.trackedGestures = HandGestureFlags.kHandC.value | HandGestureFlags.kHandFinger.value | HandGestureFlags.kHandFist.value |
                           HandGestureFlags.kHandPinch.value | HandGestureFlags.kHandThumb.value | HandGestureFlags.kHandL.value |
                           HandGestureFlags.kHandOpenHandBack.value | HandGestureFlags.kHandOk.value;


    prism.startTrackHandGesture(this.trackedGestures);
    this.prism = prism;
    this.createUiGrid();

    this.rightHand = new Hand();

    this.leftHand = new Hand();

    this.updateLeftText();
    this.updateRightText();

    return 0;
  }

  updateLoop(delta)
  {
    if (this.leftHand.gesture != input.GestureType.NONE)
    {
      this.leftHand.timer -= delta;
      if (this.leftHand.timer <= 0.0)
      {
        this.resolveLeftHandGesture(input.GestureType.NONE, 1.0);
      }
      else
      {
        this.updateLeftKeypointPositions();
      }
    }

    if (this.rightHand.gesture != input.GestureType.NONE)
    {
      this.rightHand.timer -= delta;
      if (this.rightHand.timer <= 0.0)
      {
        this.resolveRightHandGesture(input.GestureType.NONE, 1.0);
      }
      else
      {
        this.updateRightKeypointPositions();
      }
    }

    return true;
  }
  eventListener(event)
  {
    if (event instanceof GestureInputEventData)
    {
      let gestureType = event.getGesture();
      let index = event.getHandGestureIndex();
      let confidence = event.getHandGestureConfidence();

      if (index == 1)
      {
        this.resolveRightHandGesture(gestureType, confidence);
        this.updateRightKeypoints(event);
      }
      else if (index == 0)
      {
        this.resolveLeftHandGesture(gestureType, confidence);
        this.updateLeftKeypoints(event);
      }
    }
    return true;
  }

  resolveRightHandGesture(gestureType, confidence)
  {
      // right hand was forming another gesture previously, undo right hand color
    if (this.rightHand.gesture in this.gestureMap)
    {
        // left hand is forming the gesture so revert back to left hand color
      if (this.leftHand.gesture == this.rightHand.gesture)
      {
        this.colorLeftHand();
      }
        // no hand is doing the gesture so revert back to default color
      else
      {
        this.gestureMap[this.rightHand.gesture].uiImage.setColor(this.gestureMap[this.rightHand.gesture].defaultColor);
      }
    }

      // set the new gesture and confidence
    this.rightHand.gesture = gestureType;
    this.rightHand.confidence = confidence;
    this.rightHand.timer = 1.0;

      // new gesture is one that we recognize
    if (gestureType in this.gestureMap)
    {
        // left hand is forming the gesture so color it for both hands
      if (this.rightHand.gesture == this.leftHand.gesture)
      {
        this.colorBothHands()
      }

        // only right hand is forming the gesture so color it for right hand
      else
      {
        this.colorRightHand();
      }
    }

    this.updateRightText();
  }

  resolveLeftHandGesture(gestureType, confidence)
  {
      // left hand was forming another gesture, undo left hand color
    if (this.leftHand.gesture in this.gestureMap)
    {
        // right hand is forming the gesture, revert back to right hand color
      if (this.leftHand.gesture == this.rightHand.gesture)
      {
        this.colorRightHand();
      }
        // no hand is foming the gesture, revert to default color
      else
      {
        this.gestureMap[this.leftHand.gesture].uiImage.setColor(this.gestureMap[this.leftHand.gesture].defaultColor);
      }
    }

      // set the new gesture and confidence
    this.leftHand.gesture = gestureType;
    this.leftHand.confidence = confidence;
    this.leftHand.timer = 1.0;

      // new gesture is one that we recognize
    if (gestureType in this.gestureMap)
    {
        // right hand is also forming the gesture, color for both hands
      if (this.rightHand.gesture == this.leftHand.gesture)
      {
        this.colorBothHands()
      }
        // only left hand is forming gesture, color for left hand
      else
      {
        this.colorLeftHand();
      }
    }

    this.updateLeftText();
  }

  colorLeftHand()
  {
    this.gestureMap[this.leftHand.gesture].uiImage.setColor(color.BLUE);
  }

  colorRightHand()
  {
    this.gestureMap[this.rightHand.gesture].uiImage.setColor(color.RED);
  }

  colorBothHands()
  {
    this.gestureMap[this.rightHand.gesture].uiImage.setColor([1.0, 0.0, 1.0, 1.0]);
  }

  updateLeftText()
  {
    let text = "Left Hand (Blue) - Gesture: " + this.gestureToString(this.leftHand.gesture) + " Confidence: " + this.leftHand.confidence.toFixed(3);
    this.leftText.setText(text);
  }

  updateRightText()
  {
    let text = "Right Hand (Red) - Gesture: " + this.gestureToString(this.rightHand.gesture) + " Confidence: " + this.rightHand.confidence.toFixed(3);
    this.rightText.setText(text);
  }

  updateLeftKeypoints(event)
  {
    for (var i = input.HandGestureKeypointName.NONE.value; i <= input.HandGestureKeypointName.WRIST_THUMB_SIDE.value; ++i)
    {
      let keypointName = input.HandGestureKeypointName(i);
      let pos = event.getHandGestureKeypoint(keypointName);
      if (keypointName in this.leftHand.keypointMap)
      {
        this.leftHand.keypointMap[keypointName].worldPos = pos;
      }
      else
      {
        let key = new Keypoint(this.prism.createNode(this.objName, "Sphere"), pos);
        this.prism.getRootNode().addChild(key.model);
        this.leftHand.keypointMap[keypointName] = key;
      }
    }
  }

  updateRightKeypoints(event)
  {
    for (var i = input.HandGestureKeypointName.NONE.value; i <= input.HandGestureKeypointName.WRIST_THUMB_SIDE.value; ++i)
    {
      let keypointName = input.HandGestureKeypointName(i);
      let pos = event.getHandGestureKeypoint(keypointName);
      if (keypointName in this.rightHand.keypointMap)
      {
        this.rightHand.keypointMap[keypointName].worldPos = pos;
      }
      else
      {
        let key = new Keypoint(this.prism.createNode(this.objName, "Sphere"), pos);
        this.prism.getRootNode().addChild(key.model);
        this.rightHand.keypointMap[keypointName] = key;
      }
    }
  }

  updateLeftKeypointPositions()
  {
    //debugger;
    let transform = this.getPrismTransform(this.prism);
    let realTransform = new Float32Array(16);
    let index = 0;

    for (let i = 0; i < 4; ++i)
    {
      for (let j = 0; j < 4; ++j)
      {
        realTransform[index] = transform[i][j];
        ++index;
      }
    }

    let inverse = mat4.invert([], realTransform);

    for (var k in this.leftHand.keypointMap)
    {

      let localPos = vec3.transformMat4([], this.leftHand.keypointMap[k].worldPos, inverse);
      this.leftHand.keypointMap[k].model.setLocalPosition(localPos);
    }
  }

  updateRightKeypointPositions()
  {
    //debugger;
    let transform = this.getPrismTransform(this.prism);
    let realTransform = new Float32Array(16);
    let index = 0;

    for (let i = 0; i < 4; ++i)
    {
      for (let j = 0; j < 4; ++j)
      {
        realTransform[index] = transform[i][j];
        ++index;
      }
    }

    let inverse = mat4.invert([], realTransform);

    for (var k in this.rightHand.keypointMap)
    {

      let localPos = vec3.transformMat4([], this.rightHand.keypointMap[k].worldPos, inverse);
      this.rightHand.keypointMap[k].model.setLocalPosition(localPos);
    }
  }

  createUiGrid()
  {
    this.gestureMap = {};

    let grid = ui.UiGridLayout.Create(this.prism);
    grid.setColumns(4);
    grid.setRows(2);
    grid.setAlignment(ui.Alignment.CENTER_CENTER);
    grid.addItem(this.createUiImage("res/Gesture_C.png", input.GestureType.HAND_C));
    grid.addItem(this.createUiImage("res/Gesture_Finger.png", input.GestureType.HAND_FINGER));
    grid.addItem(this.createUiImage("res/Gesture_Fist.png", input.GestureType.HAND_FIST));
    grid.addItem(this.createUiImage("res/Gesture_L.png", input.GestureType.HAND_L));
    grid.addItem(this.createUiImage("res/Gesture_Ok.png", input.GestureType.HAND_OK));
    grid.addItem(this.createUiImage("res/Gesture_OpenHand.png", input.GestureType.HAND_OPENHANDBACK));
    grid.addItem(this.createUiImage("res/Gesture_Pinch.png", input.GestureType.HAND_PINCH));
    grid.addItem(this.createUiImage("res/Gesture_Thumb.png", input.GestureType.HAND_THUMB));
    grid.setLocalPosition([0.0, 0.0, -1.0]);
    this.prism.getRootNode().addChild(grid);

    let linear = ui.UiLinearLayout.Create(this.prism);
    linear.setAlignment(ui.Alignment.CENTER_LEFT);
    linear.setDefaultItemPadding([0.01, 0.01, 0.01, 0.01]);
    this.leftText = ui.UiText.Create(this.prism, "");
    this.rightText = ui.UiText.Create(this.prism, "");
    linear.addItem(this.rightText);
    linear.addItem(this.leftText);
    grid.addChild(linear);
    linear.setLocalPosition([-0.2, 0.15, 0.0]);

    grid.addChild(this.createSliderGrid());
  }

  createSliderGrid()
  {
    let grid = ui.UiGridLayout.Create(this.prism);
    grid.setAlignment(ui.Alignment.CENTER_LEFT);
    grid.setRows(3);
    grid.setColumns(2);
    grid.setDefaultItemPadding([0.0, 0.0, 0.0, 0.0]);

    let params = new ui.EclipseSliderParams(ui.EclipseSliderType.kHorizontalWithLabel, "Poll Rate", "");

    this.prism.setHandGestureFilterPollRate(20.0);
    let pollText = ui.UiText.Create(this.prism, "20");
    pollText.setTextSize(0.03);
    let pollSlider = ui.UiSlider.CreateEclipseSlider(this.prism, params);
    pollSlider.setMinMax(5.0, 30.0);
    pollSlider.setValue(20.0);
    pollSlider.onSliderChangedSub(evt => {
      let pollRate = Math.round(pollSlider.getValue());
      pollText.setText(pollRate.toString());
      this.prism.setHandGestureFilterPollRate(pollRate);
    });
    grid.addItem(pollSlider);
    grid.addItem(pollText);
    grid.setItemAlignment(pollText, ui.Alignment.BOTTOM_CENTER);

    params.labelText1 = "Hand Delta";
    this.prism.setHandGestureFilterPositionDelta(0.001);
    let deltaText = ui.UiText.Create(this.prism, "0.001");
    deltaText.setTextSize(0.03);
    let deltaSlider = ui.UiSlider.CreateEclipseSlider(this.prism, params);
    deltaSlider.setMax(0.01);
    deltaSlider.setValue(0.001);
    deltaSlider.onSliderChangedSub(evt => {
      let delta = deltaSlider.getValue();
      deltaText.setText(delta.toFixed(3));
      this.prism.setHandGestureFilterPositionDelta(delta);
    });
    grid.addItem(deltaSlider);
    grid.addItem(deltaText);
    grid.setItemAlignment(deltaText, ui.Alignment.BOTTOM_CENTER);

    params.labelText1 = "Min Confidence";
    this.prism.setHandGestureFilterConfidenceLevel(0.5);
    let conText = ui.UiText.Create(this.prism, "0.5");
    conText.setTextSize(0.03);
    let conSlider = ui.UiSlider.CreateEclipseSlider(this.prism, params);
    conSlider.setValue(0.5);
    conSlider.onSliderChangedSub(evt => {
      let con = conSlider.getValue();
      conText.setText(con.toFixed(2));
      this.prism.setHandGestureFilterConfidenceLevel(con);
    });
    grid.addItem(conSlider);
    grid.addItem(conText);
    grid.setItemAlignment(conText, ui.Alignment.BOTTOM_CENTER);

    grid.setLocalPosition([-0.2, -0.15, 0.0]);
    grid.setLocalScale([0.75, 0.75, 0.75]);

    return grid;
  }

  createUiImage(filepath, gesture)
  {
    let image = ui.UiImage.Create(this.prism, filepath, 0.1, 0.1);
    let imageObject = {
      uiImage: image,
      defaultColor: color.WHITE,
      active: true
    };

    image.onActivateSub(evt => {
      let flag = this.gestureToFlag(gesture);
      this.prism.stopTrackHandGesture(this.trackedGestures);
      this.trackedGestures ^= flag;
      this.prism.startTrackHandGesture(this.trackedGestures);
      this.gestureMap[gesture].active = !(this.gestureMap[gesture].active);
      if (this.gestureMap[gesture].active)
      {
        this.gestureMap[gesture].defaultColor = color.WHITE;
      }
      else
      {
        this.gestureMap[gesture].defaultColor = [0.5, 0.5, 0.5, 1.0];
      }
      this.gestureMap[gesture].uiImage.setColor(this.gestureMap[gesture].defaultColor);
    });
    this.gestureMap[gesture] = imageObject;
    return image;
  }

  gestureToString(gesture)
  {
    switch(gesture)
    {
      case input.GestureType.HAND_C:
        return "HAND_C";
      case input.GestureType.HAND_FINGER:
        return "HAND_FINGER";
      case input.GestureType.HAND_FIST:
        return "HAND_FIST";
      case input.GestureType.HAND_L:
        return "HAND_L";
      case input.GestureType.HAND_OK:
        return "HAND_OK";
      case input.GestureType.HAND_OPENHANDBACK:
        return "HAND_OPENHANDBACK";
      case input.GestureType.HAND_PINCH:
        return "HAND_PINCH";
      case input.GestureType.HAND_THUMB:
        return "HAND_THUMB";
      case input.GestureType.HAND_NO_POSE:
        return "HAND_NO_POSE";
      default:
        return "NONE";
    }
  }

  gestureToFlag(gesture)
  {
    switch(gesture)
    {
      case input.GestureType.HAND_C:
        return HandGestureFlags.kHandC;
      case input.GestureType.HAND_FINGER:
        return HandGestureFlags.kHandFinger;
      case input.GestureType.HAND_FIST:
        return HandGestureFlags.kHandFist;
      case input.GestureType.HAND_L:
        return HandGestureFlags.kHandL;
      case input.GestureType.HAND_OK:
        return HandGestureFlags.kHandOk;
      case input.GestureType.HAND_OPENHANDBACK:
        return HandGestureFlags.kHandOpenHandBack;
      case input.GestureType.HAND_PINCH:
        return HandGestureFlags.kHandPinch;
      case input.GestureType.HAND_THUMB:
        return HandGestureFlags.kHandThumb;
      default:
        return 0;
    }
  }
}
