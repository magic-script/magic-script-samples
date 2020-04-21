/* eslint-disable space-before-function-paren */
import {
  GestureInputEventData,
  ImmersiveApp,
  KeyInputEventData,
  WorldMeshBlockEventData,
  densemesh,
  input,
  ui
} from 'lumin';

import {
  quat,
  vec3
} from 'gl-matrix';

export class App extends ImmersiveApp {
  onAppStart () {
    this.stopping = false;

    this.prism = this.requestNewPrism([100, 100, 100]);
    this.selectPrism(this.prism, true);

    this.positionPrism(this.prism, [0, 0, 0]);
    this.orientPrism(this.prism, quat.invert([], this.prism.getRotation()));
    ui.Cursor.SetEnabled(this.prism, false);

    this.headposInfo = this.prism.retainHeadposeUpdates();
    this.prism.setPhysicsEnabled(true);
    this.prism.setPhysicsPaused(false);
    this.prism.setPhysicsWorldMeshEnabled(true);
    this.meshMap = {};

    this.meshing = this.requestWorldMeshBlockUpdates(this.prism);
  }

  eventListener(event) {
    if (event instanceof GestureInputEventData && event.getGesture() === input.GestureType.TriggerDown) {
      if (this.meshing) {
        this.meshing = !this.stopWorldMeshBlockUpdates(this.prism);
      } else {
        this.meshing = this.requestWorldMeshBlockUpdates(this.prism);
      }
      if (!this.meshing) {
        this.clearAll();
      }
      console.log(`meshing=${this.meshing}`);
      return true;
    }

    if (event instanceof WorldMeshBlockEventData && this.meshing) {
      this.handleWorldMeshEvent(event);
      return true;
    }

    if (event instanceof KeyInputEventData && event.keyCode() === input.KeyCodes.AKEYCODE_EX_HOME_TAP) {
      this.stopping = true;
      return true;
    }

    return super.eventListener(event);
  }

  updateLoop(delta) {
    if (this.stopping) {
      return false;
    }
    return super.updateLoop(delta);
  }

  /**
   *
   * @param {WorldMeshBlockEventData} event
   */
  handleWorldMeshEvent(event) {
    switch (event.getUpdateType()) {
      case densemesh.MeshBlockUpdate.kNew:
        this.meshBlock(event.getData());
        break;
      case densemesh.MeshBlockUpdate.kChanged:
        this.meshBlock(event.getData());
        break;
      case densemesh.MeshBlockUpdate.kDeleted:
        this.clearBlock(event.getBlockId());
        break;
      default:
        break;
    }
  }

  clearBlock(blockId) {
    let node = this.meshMap[blockId];
    if (node) {
      this.prism.deleteNode(node);
      delete this.meshMap[blockId];
    }
  }

  /**
   *
   * @param {WorldMeshBlockData} block
   */
  meshBlock(block) {
    if (block.isValid()) {
      let id = block.getId();
      this.clearBlock(id);
      let node = this.prism.createLineNode();
      this.meshMap[id] = node;

      let vecs = block.getVertices();
      let indices = block.getIndices();
      let normals = block.getNormals();
      let offset = 0.03;
      let count = indices.length;
      for (let i = 0; i < count; i += 3) {
        node.addPoints(vec3.scaleAndAdd([], vecs[indices[i]], normals[indices[i + 1]], offset));
        node.addPoints(vec3.scaleAndAdd([], vecs[indices[i + 1]], normals[indices[i + 1]], offset));
        node.addPoints(vec3.scaleAndAdd([], vecs[indices[i + 2]], normals[indices[i + 2]], offset));
        node.addPoints(vec3.scaleAndAdd([], vecs[indices[i]], normals[indices[i]], offset));
        node.addLineBreak();
      }
      this.prism.getRootNode().addChild(node);
    }
  }

  clearAll() {
    for (let blockId in this.meshMap) {
      this.prism.deleteNode(this.meshMap[blockId]);
    }
    this.meshMap = {};
  }
}
