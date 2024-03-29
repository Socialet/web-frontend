import React from "react";
import CheckBoxField from "../FormFields/CheckBoxField";
import SelectField from "../FormFields/SelectField";

const hereForOptions = [
  "Drive brand awareness through employee advocacy",
  "Understand brand sentiment and improve my strategy",
  "Make my team faster and more accountable",
  "Schedule social media work in advance",
  "Quickly analyze and report on social media efforts",
  "Provide better service to my customer community",
];

const roles = [
  "I'll be doing the work",
  "I'll be overseeing a team that will be doing the work",
  "I'll be doing both",
];

function Interests(props) {
  const {
    formField: { role, hereFor },
  } = props;
  return (
    <React.Fragment>
      <SelectField label={role.label} name={role.name} options={roles} />
      <CheckBoxField
        label={hereFor.label}
        name={hereFor.name}
        options={hereForOptions}
      />
    </React.Fragment>
  );
}

export default Interests;
