import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  MenuItem,
} from "@mui/material";

const Form = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    day: "",
    month: "",
    year: "",
    password: "",
    confirm_password: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.full_name || !/^[a-zA-Z\s]*$/.test(formData.full_name)) {
      errors.full_name =
        "Full name is required and should only contain letters and spaces.";
    }
    if (!formData.contact_number || !/^1\s\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.contact_number)) {
      errors.contact_number =
        "Contact number is required and should be a 10-digit number.";
    }
    if (!formData.day || !formData.month || !formData.year) {
      errors.date_of_birth = "Date of birth is required.";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email =
        "Sorry, this email address is not valid. Please try again.";
    }
    if (!formData.day || !formData.month || !formData.year) {
      errors.date_of_birth = "Date of birth is required.";
    }
    if (
      !formData.password ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(formData.password)
    ) {
      errors.password =
        "Password is required and should contain at least 8 characters with uppercase, lowercase, and numbers.";
    }
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match.";
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "https://fullstack-test-navy.vercel.app/api/users/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        setApiResponse(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" className="heading">
          Create User Account
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <div className="formbox">
            {!!apiResponse && !isMobile && (
              <Alert
                className="alertmsg"
                onClose={() => setApiResponse(null)}
                severity={apiResponse?.status}
              >
                {apiResponse?.description}
              </Alert>
            )}
            <div className="form-group">
              <label>Full Name</label>
              <TextField
                label={
                  <span>
                    Full Name <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                fullWidth
                error={!!errorMessages.full_name}
                helperText={errorMessages.full_name}
                size="small"
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <TextField
                label={
                  <span>
                    Contact Number <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                fullWidth
                error={!!errorMessages.contact_number}
                helperText={errorMessages.contact_number}
                placeholder="1 (###) ###-####"
                size="small"
              />
            </div>
            <div className="form-group">
              <label>Birthdate</label>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    select
                    label={
                      <span>
                        Day <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    fullWidth
                    error={!!errorMessages.date_of_birth}
                    helperText={errorMessages.date_of_birth}
                    size="small"
                  >
                    {[...Array(31).keys()].map((day) => (
                      <MenuItem key={day + 1} value={day + 1}>
                        {day + 1}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    select
                    label={
                      <span>
                        Month <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    fullWidth
                    error={!!errorMessages.date_of_birth}
                    helperText={errorMessages.date_of_birth}
                    size="small"
                  >
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {month}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    select
                    label={
                      <span>
                        Year <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    fullWidth
                    error={!!errorMessages.date_of_birth}
                    helperText={errorMessages.date_of_birth}
                    size="small"
                  >
                    {[...Array(100).keys()].map((year) => (
                      <MenuItem key={2023 - year} value={2023 - year}>
                        {2023 - year}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <TextField
                label={
                  <span>
                    Email <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                error={!!errorMessages.email}
                helperText={errorMessages.email}
                size="small"
              />
            </div>
            <div className="form-group">
              <label>Password</label>

              <TextField
                label={
                  <span>
                    Password <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                error={!!errorMessages.password}
                helperText={errorMessages.password}
                size="small"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <TextField
                label={
                  <span>
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
                fullWidth
                error={!!errorMessages.confirm_password}
                helperText={errorMessages.confirm_password}
                size="small"
              />
            </div>
          </div>

          {!!apiResponse && isMobile && (
            <Alert
              className="alert1"
              onClose={() => setApiResponse(null)}
              severity={apiResponse?.status}
            >
              {apiResponse?.description}
            </Alert>
          )}
          <div className="form-group-buttons">
            <Button
              type="Cancel"
              variant="outlined"
              color="primary"
              className="cancelbtn btn"
              sx={{ mt: 2, mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submitbtn btn"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default Form;
