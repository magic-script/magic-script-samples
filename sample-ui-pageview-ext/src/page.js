//

import { ui } from "lumin";

export function makePage(prism, name) {
  const {
    UiPanel,
    UiText,
    EclipseLabelType,
    Alignment,
    HorizontalAlignment,
    UiImage
  } = ui;

  // Create panel
  let panel = UiPanel.Create(prism);

  // Add text label
  let label = UiText.CreateEclipseLabel(prism, name, EclipseLabelType.kB1);
  label.setAlignment(Alignment.CENTER_CENTER);
  label.setTextAlignment(HorizontalAlignment.kCenter);
  panel.addChild(label);

  // Add image
  let image = UiImage.Create(prism, name, 0, 0);

  // TODO: Use Lumin RT API to get bitmap dimensions
  let originalWidth = 0.4096;
  let originalHeight = 0.3072;

  let newWidth = 0.3;
  let newHeight = 0.3;

  let deltaX = (1 - newWidth / originalWidth) * 0.5;
  let deltaY = (1 - newHeight / originalHeight) * 0.5;

  let size = [newWidth, newHeight];
  image.setSize(size);

  // Make square shape image
  let coords = [
    [deltaX, 1 - deltaY],
    [1 - deltaX, 1 - deltaY],
    [1 - deltaX, deltaY],
    [deltaX, deltaY]
  ];
  image.setTexCoords(coords);

  image.setLocalPosition([0, -0.2, 0]);
  panel.addChild(image);
  return panel;
}
