import React from "react";
import { TextEdit } from "magic-script-components";

export default function StringController({ applyValue }) {
  return (
    <TextEdit
      localPosition={[0.22, 0.48, 0]}
      onTextChanged={event => applyValue("value", event.Text)}
      textAlignment="left"
      textSize={0.04}
      height={0.04}
      width={0.25}
    />
  );
}
