import * as Yup from "yup";

export const validationSchemaSignUp = Yup.object().shape({
  userName: Yup.string().required("User name is required"),
  phone: Yup.number()
    .required("Phone number is required")
    .min(1000000000, "Must include 10 digits")
    .max(9999999999, "Phone number must be less than 10 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters and include uppercase letter, lowercase letter,and special character"
    )
    .max(10, "Must be less than 10 characters"),
  confirmPassword: Yup.string()
    .required("confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must Match"),
});

export const validationSchemaCompanyRegister = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  location: Yup.string().required("Company location is required"),
  linkedIn: Yup.string().required("Company linkedIn link is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters and include uppercase letter, lowercase letter,and special character"
    )
    .max(10, "Must be less than 10 characters"),
  confirmPassword: Yup.string()
    .required("confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must Match"),
});
