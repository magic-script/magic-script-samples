import { ui } from "lumin";

export function makeText(prism) {
  const { UiText, EclipseLabelType, Alignment, HorizontalTextAlignment } = ui;
  let node = UiText.CreateEclipseLabel(
    prism,
    "Press the button\nto fetch network image",
    EclipseLabelType.kT5
  );
  node.setAlignment(Alignment.CENTER_CENTER);
  node.setTextAlignment(HorizontalTextAlignment.kCenter);
  return node;
}
