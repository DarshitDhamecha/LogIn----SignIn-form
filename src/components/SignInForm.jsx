import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signinDetail } from '../Schemas';

export default function SignInForm() {

    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isshow, setIsShow] = useState(false);

    const signinInitialvalue = {
        email_signin: '',
        password_signin: '',
    };

    const formik = useFormik({
        initialValues: signinInitialvalue,
        validationSchema: signinDetail,
        onSubmit: async (values, { setErrors }) => {
            setFormSubmitted(true);
            const storedLoginData = JSON.parse(localStorage.getItem('UserLogin')) || [];
            const matchedUser = storedLoginData.find(
                (user) => user.email === values.email_signin && user.password === values.password_signin
            );

            if (matchedUser) {
                console.log('Sign-in successful');
                navigate("/Success");
            } else {
                console.log('Sign-in failed');
                setErrors({
                    general: 'Invalid email or password. Please try again.*', // Set a general error message
                });
            }
        },
    });

    const togglePasswordType = () => {
        setIsShow(!isshow);
    };


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='bg-img w-100 d-flex justify-content-center align-items-center'>
                    <div className='bs-effect p-3 rounded-3 text-white bs-width'>
                        <div className='border-bottom border-1 border-white'>
                            <h2>Sign in</h2>
                        </div>
                        <div className='text-white mt-3'>
                            <div className='mt-3'>
                                <h6>Enter Email :</h6>
                                <input type="email" name='email_signin' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email_signin} className='form-control bg-transparent text-white' placeholder='Enter Your Email...' />
                                <div className="text-danger">
                                    {formik.touched.email_signin &&
                                        formik.errors.email_signin && (
                                            <div className="error">
                                                {formik.errors.email_signin}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h6>Enter Password :</h6>
                                <div className='my-input'>
                                    <input
                                        type={isshow ? 'text' : 'password'}
                                        name='password_signin'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password_signin}
                                        className='form-control bg-transparent text-white'
                                        placeholder='Enter Your Password...' />
                                    <span className='my-eye' onClick={togglePasswordType}>
                                        {isshow ? (
                                            <i class="fa-regular fa-eye"></i>
                                        )
                                            : (
                                                <i class="fa-regular fa-eye-slash"></i>
                                            )
                                        }
                                    </span>
                                </div>
                                <div className="text-danger">
                                    {formik.touched.password_signin &&
                                        formik.errors.password_signin && (
                                            <div className="error">
                                                {formik.errors.password_signin}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className='mt-3 d-flex gap-4 align-items-center'>
                                <button className='btn btn-outline-light'>Submit</button>
                                {formik.errors.general && (
                                    <div className="text-danger ">{formik.errors.general}</div>
                                )}
                            </div>
                            <div className='mt-2 text-center'>
                                <p>You don't have account please <Link to='/' className='text-primary fs-4'>Login</Link> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
