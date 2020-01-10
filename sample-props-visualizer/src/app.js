// 8665744421
import React from "react";
import {
  DropdownListItem,
  DropdownList,
  PortalIcon,
  TextEdit,
  Content,
  Dialog,
  Text
} from "magic-script-components";

import propList from "./propList.js";
import Controllers from "./controllers";

// Returns an object to help map the controllers by type
const controller = (type, action) => {
  switch (type) {
    case "vec3":
    default:
      return <Controllers.Vec3 applyValue={action} />;
    case "string":
      return <Controllers.String applyValue={action} />;
    case "boolean":
      return <Controllers.Boolean applyValue={action} />;
    case "quat":
      return <Controllers.Quat applyValue={action} />;
  }
};

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      propList: propList.filter(prop => prop.Type !== "mat4"),
      dialog: false,
      active: 0
    };

    this.onPropSelection = this.onPropSelection.bind(this);
    this.applyValue = this.applyValue.bind(this);
  }

  onPropSelection(event) {
    this.setState({
      active: event.SelectedItems[0].id
    });
  }

  // Adds value field within propName
  applyValue(field, value) {
    this.setState(prevState => {
      // Create a copy of the proplist objects for local manipulation
      const temp = prevState.propList.map(prop => ({ ...prop }));
      const activeProp = temp[prevState.active];
      const newProp = {
        ...activeProp,
        ...activeProp.buildNewProp(field, value)
      };

      temp[prevState.active] = newProp;

      return { propList: temp };
    });
  }

  render() {
    const { propList, active, dialog } = this.state;

    const activeProp = propList[active];
    let prop;

    prop = {
      [activeProp.Name]: activeProp.valueOutput()
    };

    const isString = activeProp.Type === "string";

    return (
      <Content name="main-view">
        <DropdownList
          listTextSize={0.038}
          text={activeProp.Name}
          localPosition={[-0.4, 0.45, 0]}
          iconColor={[0.5, 1.0, 0.5, 0.8]}
          onSelectionChanged={this.onPropSelection}
        >
          {propList.map((prop, index) => (
            <DropdownListItem
              key={`Prop__${index}`}
              id={index}
              label={prop.Name}
            />
          ))}
        </DropdownList>

        <TextEdit
          localPosition={[-0.2, 0.48, 0]}
          text={
            isString
              ? prop[activeProp.Name]
              : JSON.stringify(prop[activeProp.Name])
          }
          textAlignment="left"
          enabled={false}
          textSize={0.04}
          height={0.04}
          width={0.35}
        />

        {controller(activeProp.Type, this.applyValue)}

        <Text
          localPosition={[-0.446, 0.32, 0]}
          textAlignment="left"
          textSize={0.025}
          boundsSize={{
            boundsSize: [0.65, 0.2],
            wrap: true
          }}
        >
          {`Type: ${activeProp.Type}. ${activeProp.Description}`}
        </Text>

        <PortalIcon
          text=""
          {...prop}
          iconSize="extra-large"
          hoverScale={1.2}
          onClick={() =>
            this.setState(prevState => ({
              dialog: !prevState.dialog
            }))
          }
        />

        {dialog && (
          <Dialog
            localPosition={[0, 0.2, 0.2]}
            buttonType="text-with-icon"
            dialogType="single-action"
            dialogLayout="wide"
            confirmIcon="close"
            confirmText="Close"
            title="Item clicked"
            text="This element is enabled for onclick events"
            onConfirm={() => this.setState({ dialog: false })}
          />
        )}
      </Content>
    );
  }
}
