//
import { ui } from 'lumin';
import _ from 'underscore';

export function makeTextUnderscore(prism) {
  const { UiText, EclipseLabelType, Alignment, HorizontalAlignment } = ui;
  let result = _.map([1, 2, 3], function(num) {
    return num * 3;
  });
  let node = UiText.CreateEclipseLabel(
    prism,
    'Underscore.js result:\n' + result,
    EclipseLabelType.kT7
  );
  node.setAlignment(Alignment.CENTER_CENTER);
  node.setTextAlignment(HorizontalAlignment.kCenter);
  return node;
}
