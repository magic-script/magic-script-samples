import React from "react";
import { Button } from "magic-script-components";

export default function QuatController({ applyValue }) {
  return (
    <>
      <Button
        localPosition={[0.32, 0.45, 0]}
        onClick={() => applyValue("valueX", -0.1)}
      >
        {"< X"}
      </Button>

      <Button
        localPosition={[0.4, 0.45, 0]}
        onClick={() => applyValue("valueX", 0.1)}
      >
        {"> X"}
      </Button>

      <Button
        localPosition={[0.32, 0.4, 0]}
        onClick={() => applyValue("valueY", -0.1)}
      >
        {"< Y"}
      </Button>

      <Button
        localPosition={[0.4, 0.4, 0]}
        onClick={() => applyValue("valueY", 0.1)}
      >
        {"> Y"}
      </Button>

      <Button
        localPosition={[0.32, 0.35, 0]}
        onClick={() => applyValue("valueZ", -0.1)}
      >
        {"< Z"}
      </Button>

      <Button
        localPosition={[0.4, 0.35, 0]}
        onClick={() => applyValue("valueZ", 0.1)}
      >
        {"> Z"}
      </Button>

      <Button
        localPosition={[0.32, 0.3, 0]}
        onClick={() => applyValue("valueA", -0.1)}
      >
        {"< A"}
      </Button>

      <Button
        localPosition={[0.4, 0.3, 0]}
        onClick={() => applyValue("valueA", 0.1)}
      >
        {"> A"}
      </Button>
    </>
  );
}
