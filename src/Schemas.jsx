import *as Yup from 'yup'

// Login page schemas-------------->

export const loginDetail = Yup.object({
    name: Yup.string().required('Name is required*'),
    email: Yup.string().required('Email is required*'),
    phone: Yup.string().required('Your phone number is required*')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    ,
    password: Yup.string().required('Enter password*').min(8),
    retype_password: Yup.string()
        .required('Retype your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const signinDetail = Yup.object({
    email_signin: Yup.string().required('Enter your Email is required*'),
    password_signin: Yup.string().required('Enter password*').min(8),
});