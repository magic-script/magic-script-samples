export function eulerToQuaternion (pitch, roll, yaw) {
  let cy = Math.cos(yaw * 0.5);
  let sy = Math.sin(yaw * 0.5);
  let cr = Math.cos(roll * 0.5);
  let sr = Math.sin(roll * 0.5);
  let cp = Math.cos(pitch * 0.5);
  let sp = Math.sin(pitch * 0.5);

  let w = cy * cr * cp + sy * sr * sp;
  let x = cy * sr * cp - sy * cr * sp;
  let y = cy * cr * sp + sy * sr * cp;
  let z = sy * cr * cp - cy * sr * sp;
  return [ x, y, z, w];
}
