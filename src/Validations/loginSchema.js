import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
    username : yup
    .string()
    .required("User name is required")
    .min(4, "Minimum 4 characters"),

    password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
})