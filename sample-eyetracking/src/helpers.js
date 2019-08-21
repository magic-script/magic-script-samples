import { ui, color, input } from "lumin"

var Helpers = {}

Helpers.CreateTextNode = function(prism, parent, pos, text)
{
    let node = ui.UiText.Create(prism, text);
    node.setLocalPosition(pos);
    parent.addChild(node);
    return node;
}

Helpers.KeyCodeMap = {};
for (var key in input.KeyCodes) {
    Helpers.KeyCodeMap[input.KeyCodes[key]] = key;
}

Helpers.GestureMap = {};
for (var key in input.GestureType) {
    Helpers.GestureMap[input.GestureType[key]] = key;
}

Helpers.EventTypeMap = {};
for (var key in input.EventType) {
    Helpers.EventTypeMap[input.EventType[key]] = key;
}

Helpers.GestureDirectionMap = {};
for (var key in input.GestureDirection) {
    Helpers.GestureDirectionMap[input.GestureDirection[key]] = key;
}

Helpers.CreatePrismOutline = function(prism) {
    let prismSize = [prism.getSize()[0] * 0.49, prism.getSize()[1] * 0.49, prism.getSize()[2] * 0.49];
    let outline = prism.createLineNode();
    outline.addPoints([-prismSize[0], prismSize[1], prismSize[2]]);
    outline.addPoints([-prismSize[0], -prismSize[1], prismSize[2]]);
    outline.addPoints([prismSize[0], -prismSize[1], prismSize[2]]);
    outline.addPoints([prismSize[0], prismSize[1], prismSize[2]]);
    outline.addPoints([-prismSize[0], prismSize[1], prismSize[2]]);
    outline.addPoints([-prismSize[0], prismSize[1], -prismSize[2]]);
    outline.addPoints([prismSize[0], prismSize[1], -prismSize[2]]);
    outline.addPoints([prismSize[0], prismSize[1], prismSize[2]]);
    outline.addPoints([prismSize[0], -prismSize[1], prismSize[2]]);
    outline.addPoints([prismSize[0], -prismSize[1], -prismSize[2]]);
    outline.addPoints([prismSize[0], prismSize[1], -prismSize[2]]);
    outline.addPoints([prismSize[0], -prismSize[1], -prismSize[2]]);
    outline.addPoints([-prismSize[0], -prismSize[1], -prismSize[2]]);
    outline.addPoints([-prismSize[0], -prismSize[1], prismSize[2]]);
    outline.addPoints([-prismSize[0], -prismSize[1], -prismSize[2]]);
    outline.addPoints([-prismSize[0], prismSize[1], -prismSize[2]]);
    outline.setColor(color.MAGENTA);
    return outline;
}

Helpers.toMat4x4 = function(vec16)
{
    return [
        [vec16[0], vec16[1], vec16[2], vec16[3]],
        [vec16[4], vec16[5], vec16[6], vec16[7]],
        [vec16[8], vec16[9], vec16[10], vec16[11]],
        [vec16[12], vec16[13], vec16[14], vec16[15]]
    ];
}

Helpers.toVec16 = function(mat4x4)
{
    return [
        mat4x4[0][0], mat4x4[0][1], mat4x4[0][2], mat4x4[0][3],
        mat4x4[1][0], mat4x4[1][1], mat4x4[1][2], mat4x4[1][3],
        mat4x4[2][0], mat4x4[2][1], mat4x4[2][2], mat4x4[2][3],
        mat4x4[3][0], mat4x4[3][1], mat4x4[3][2], mat4x4[3][3]
    ];
}

Helpers.toXYZW = function(q){
    return [q[1], q[2], q[3], q[0]];
}

function sub(a, b){
    return [ a[0]-b[0], a[1]-b[1], a[2]-b[2] ];
}
function dot(a, b){
    return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
}
function cross(a, b){
    return [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]];
}
function normalize(a){
    let m = 1 / Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
    return [a[0]*m, a[1]*m, a[2]*m];
}

Helpers.lookAt = function(from, to , up){
    let out = new Array(16);
    let zaxis = normalize(sub(to, from));
    let xaxis = normalize(cross(up, zaxis));
    let yaxis = normalize(cross(zaxis, xaxis));

    out[0] = xaxis[0];
    out[1] = xaxis[1];
    out[2] = xaxis[2];
    out[3] = 0;

    out[4] = yaxis[0];
    out[5] = yaxis[1];
    out[6] = yaxis[2];
    out[7] = 0;

    out[8] = zaxis[0];
    out[9] = zaxis[1];
    out[10] = zaxis[2];
    out[11] = 0;

    out[12] = from[0];
    out[13] = from[1];
    out[14] = from[2];
    out[15] = 1;

    return out;
}

export { Helpers }