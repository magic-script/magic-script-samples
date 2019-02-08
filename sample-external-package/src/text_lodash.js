//
import { ui } from 'lumin';
import __ from 'lodash';

export function makeTextLodash(prism) {
  const { UiText, EclipseLabelType, Alignment, HorizontalAlignment } = ui;
  let array = [1, 2, 3, 4, 5, 6, 7];
  __.fill(array, '*', 2, 5);
  let result = __.map(array, function(num) {
    return num;
  });
  let node = UiText.CreateEclipseLabel(
    prism,
    'Lodash.js result:\n' + result,
    EclipseLabelType.kT7
  );
  node.setAlignment(Alignment.CENTER_CENTER);
  node.setTextAlignment(HorizontalAlignment.kCenter);
  return node;
}
