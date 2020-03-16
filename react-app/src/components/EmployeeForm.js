import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/employee";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230
  },
  smMargin: {
    margin: theme.spacing(1)
  }
});

const initialFieldValues = {
  firstName: "",
  lastName: "",
  address: "",
  age: "",
  salary: "",
  sex: ""
};

const EmployeeForm = ({ classes, ...props }) => {
  //toast msg.
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let formErrors = { ...errors };
    if ("firstName" in fieldValues)
      formErrors.firstName = fieldValues.firstName
        ? ""
        : "This field is required.";
    if ("lastName" in fieldValues)
      formErrors.lastName = fieldValues.lastName
        ? ""
        : "This field is required.";
    if ("address" in fieldValues)
      formErrors.address = fieldValues.address ? "" : "This field is required.";
    if ("sex" in fieldValues)
      formErrors.sex = fieldValues.sex ? "" : "This field is required.";
    if ("email" in fieldValues)
      formErrors.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    setErrors({
      ...formErrors
    });

    if (fieldValues == values)
      return Object.values(formErrors).every(x => x == "");
  };

  const {
    values,
    setValues,
    handleInputChange,
    resetForm,
    errors,
    setErrors
  } = useForm(initialFieldValues, validate, props.currentId);

  //material-ui select
  const inputLabel = React.useRef(null);
  const [labelwidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId == 0) props.createEmployee(values, onSuccess);
      else props.updateEmployee(props.currentId, values, onSuccess);
    }
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.employeeList.find(x => x.id == props.currentId)
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            variant="outlined"
            label="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            {...(errors.firstName && {
              error: true,
              helperText: errors.firstName
            })}
          />
          <TextField
            name="lastName"
            variant="outlined"
            label="Last Name"
            value={values.lastName}
            onChange={handleInputChange}
            {...(errors.lastName && {
              error: true,
              helperText: errors.lastName
            })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
            {...(errors.address && { error: true, helperText: errors.address })}
          />
          <TextField
            name="salary"
            variant="outlined"
            label="Salary"
            value={values.salary}
            onChange={handleInputChange}
            labelWidth={labelwidth}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.sex && { error: true })}
          >
            <InputLabel ref={inputLabel}>Sex</InputLabel>
            <Select name="sex" value={values.sex} onChange={handleInputChange}>
              <MenuItem value="">Select Sex</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {errors.sex && <FormHelperText>{errors.sex}</FormHelperText>}
          </FormControl>
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = state => ({
  employeeList: state.employee.employeeList
});

const mapActionToProps = {
  createEmployee: actions.create,
  updateEmployee: actions.update
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(EmployeeForm));
