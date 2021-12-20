import React from "react";

export default function Link3() {
  return (
    <div>
      <h1>Link3</h1>
    </div>
  );
}

/*

import React from "react";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default class Link3 extends React.Component {
    const email =  "";



  handleSubmit = () => {
    // your submit logic
  };

  render() {
    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={(errors) => console.log(errors)}
      >
        <TextValidator
          label="Email"
          onChange={this.handleChange}
          name="email"
          value={email}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
        <Button type="submit">Submit</Button>
      </ValidatorForm>
    );
  }
}
*/
