import React from "react";
import { Toggle } from "magic-script-components";

export default function BooleanController({ applyValue }) {
  const handleToggle = e => {
    const val = e.On ? true : false;

    applyValue("value", val);
  };

  return (
    <Toggle
      localPosition={[0.27, 0.45, 0]}
      onToggleChanged={handleToggle}
      text=""
    />
  );
}
