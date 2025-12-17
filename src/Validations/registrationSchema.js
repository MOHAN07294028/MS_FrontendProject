import * as yup from 'yup'

export const RegistrationSchema= yup.object().shape({
    userId: yup
    .number()
    .typeError("User Id must be a number")
    .required("User Id is required"),

  userFirstName: yup
    .string()
    .required("First name is required")
    .min(3, "Minimum 3 characters"),

  userLastName: yup
    .string()
    .nullable(),

  userName: yup
    .string()
    .required("User name is required")
    .min(4, "Minimum 4 characters"),

  userEmail: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  userPhone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  userRole: yup
    .string()
    .required("Department is required"),

  userGender: yup
    .string()
    .required("Gender is required"),

  userState: yup
    .string()
    .required("State is required"),

  userPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),

  userConfirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("userPassword")], "Passwords must match")
})