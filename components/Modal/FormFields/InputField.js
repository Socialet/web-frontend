import { useField } from "formik";
import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

function InputField(props) {
  const [field, meta] = useField(props);
  console.log({ field, meta });

  return (
    <FormGroup className="mb-3">
      <Label className="font-weight-bold" style={{ fontSize: "13px" }}>
        {props.label}
      </Label>
      <Input
        className="form-control-alternative"
        placeholder={props.placeholder}
        invalid={meta.error && meta.touched}
        value={field.value}
        name={field.name}
        type="text"
        onChange={field.onChange}
        onBlur={field.onBlur}
        color="primary"
      />
      <FormFeedback>{meta.touched && meta.error}</FormFeedback>
    </FormGroup>
  );
}

export default InputField;
