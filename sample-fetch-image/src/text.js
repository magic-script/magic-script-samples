import { ui } from "lumin";

export function makeText(prism) {
  const { UiText, EclipseLabelType, Alignment, HorizontalAlignment } = ui;
  let node = UiText.CreateEclipseLabel(
    prism,
    "Hello\nMagicScript!",
    EclipseLabelType.kT5
  );
  node.setAlignment(Alignment.CENTER_CENTER);
  //node.setTextAlignment(HorizontalAlignment.kCenter);
  return node;
}
