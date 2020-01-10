function vec3() {
  return [this.valueX || 0, this.valueY || 0, this.valueZ || 0];
}

function quat() {
  return [
    this.valueX || 0,
    this.valueY || 0,
    this.valueZ || 0,
    this.valueA || 0
  ];
}

function string() {
  return this.value || "";
}

function boolean() {
  return Boolean(this.value);
}

function buildVec3Prop(field, value) {
  return { [field]: Number(((this[field] || 0) + value).toFixed(2)) };
}

// String and Boolean output the same single value type
function buildPropSingle(field, value) {
  return { [field]: value };
}

export default [
  {
    Name: "name",
    Type: "string",
    Description: "Name of the Node",
    valueOutput: string,
    buildNewProp: buildPropSingle
  },
  {
    Name: "localPosition",
    Type: "vec3",
    Description: "Local position of this Node",
    valueOutput: vec3,
    buildNewProp: buildVec3Prop
  },
  {
    Name: "localRotation",
    Type: "quat",
    Description: "Local rotation of this Node",
    valueOutput: quat,
    buildNewProp: buildVec3Prop
  },
  {
    Name: "localScale",
    Type: "vec3",
    Description: "Local scale of this Node",
    valueX: 1,
    valueY: 1,
    valueZ: 1,
    valueOutput: vec3,
    buildNewProp: buildVec3Prop
  },
  {
    Name: "localTransform",
    Type: "mat4",
    Description: "Local transform of this Node"
  },
  {
    Name: "visible",
    Type: "boolean",
    Description: "Visibility state of the Node",
    valueOutput: boolean,
    buildNewProp: buildPropSingle
  },
  {
    Name: "parentedBoneName",
    Type: "string",
    Description:
      "When parented to a parents bone with parentedBoneName property",
    valueOutput: string,
    buildNewProp: buildPropSingle
  },
  {
    Name: "skipRaycast",
    Type: "boolean",
    Description: "Skip raycast state of the Node",
    valueOutput: boolean,
    buildNewProp: buildPropSingle
  },
  {
    Name: "triggerable",
    Type: "boolean",
    Description: "Whether this node should handle trigger presses directly",
    valueOutput: boolean,
    buildNewProp: buildPropSingle
  },
  {
    Name: "visibilityInherited",
    Type: "boolean",
    Description:
      "Flags that the visibility state of this node should be inherited by its children. This does not change a child's visibility. A visibility of false will take precedence over a visibility of true.",
    valueOutput: boolean,
    buildNewProp: buildPropSingle
  },
  {
    Name: "anchorPosition",
    Type: "vec3",
    Description:
      "Sets the anchor position of the Node's transform. Rotations, scaling, and translations of the transform will take place around this point. Changing the anchor point will recalculate the transform to the new anchor point.",
    valueOutput: vec3,
    buildNewProp: buildVec3Prop
  },
  {
    Name: "cursorHoverState",
    Type: "string",
    Description:
      "Sets the cursor hover state for this Node. Setting this will set the cursor state when this Node or any descendant Nodes, that are not explicitly set, are hovered over.",
    valueOutput: string,
    buildNewProp: buildPropSingle
  },
  {
    Name: "offset",
    Type: "vec3",
    Description:
      "An optional offset to position the Node within the parent Node (default is [0,0,0]).",
    valueOutput: vec3,
    buildNewProp: buildVec3Prop
  }
];
