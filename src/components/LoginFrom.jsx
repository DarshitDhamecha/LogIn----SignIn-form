import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { loginDetail } from '../Schemas';

export default function LoginFrom() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePass, steshowRetypePass] = useState(false);

    const initialvalue = {
        name: '',
        email: '',
        phone: '',
        password: '',
        retype_password: '',
    };

    const generateUniqueId = () => {
        // Use current timestamp combined with a random number to generate a unique ID
        return new Date().getTime() + Math.random().toString(36).substr(2, 9);
    };


    const formik = useFormik({
        initialValues: initialvalue,
        validationSchema: loginDetail,
        onSubmit: (values) => {
            handleSubmitLoginIn(values);
            console.log(values)
            const storedData = JSON.parse(localStorage.getItem('UserLogin')) || [];
            const userId = generateUniqueId();
            const userWithId = { ...values, userId };
            storedData.push(userWithId);
            localStorage.setItem('UserLogin', JSON.stringify(storedData));
        },
    });

    const handleSubmitLoginIn = (values) => {
        if (values !== "") {
            navigate("/Success");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRetypePasswordVisibility = () => {
        steshowRetypePass(!showRetypePass);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='bg-img w-100 d-flex align-items-center justify-content-center'>
                    <div className='bs-effect p-3 rounded-3 text-white w-75 '>
                        <div className='border-bottom border-1 border-white'>
                            <h2>Login</h2>
                        </div>
                        <div className='text-white mt-3'>
                            <div>
                                <h6>Enter Name :</h6>
                                <input type="text" name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className='form-control bg-transparent text-white' placeholder='Enter Your Name...' />
                                <div className="text-danger">
                                    {formik.touched.name &&
                                        formik.errors.name && (
                                            <div className="error">
                                                {formik.errors.name}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h6>Enter Email :</h6>
                                <input type="email" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control bg-transparent text-white' placeholder='Enter Your Email...' />
                                <div className="text-danger">
                                    {formik.touched.email &&
                                        formik.errors.email && (
                                            <div className="error">
                                                {formik.errors.email}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h6>Enter Mobile-Number :</h6>
                                <input type="number" name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className='form-control bg-transparent text-white' placeholder='Enter Your Number...' />
                                <div className="text-danger">
                                    <div className="text-danger">
                                        {formik.touched.phone &&
                                            formik.errors.phone && (
                                                <div className="error">
                                                    {formik.errors.phone}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h6>Enter Password :</h6>
                                <div className='my-input'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        className='form-control bg-transparent text-white'
                                        placeholder='Enter Your Password...' />
                                    <span className='my-eye' onClick={togglePasswordVisibility}>
                                        {showPassword ? (
                                            <i class="fa-regular fa-eye"></i> // Eye-slash icon for hide
                                        ) : (
                                            <i class="fa-regular fa-eye-slash"></i> // Eye icon for show
                                        )}
                                    </span>
                                </div>
                                <div className="text-danger">
                                    {formik.touched.password &&
                                        formik.errors.password && (
                                            <div className="error">
                                                {formik.errors.password}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h6>Retype Password :</h6>
                                <div className='my-input'>
                                    <input
                                        type={showRetypePass ? 'text' : 'password'}
                                        name='retype_password'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.retype_password}
                                        className='form-control bg-transparent text-white'
                                        placeholder='Retype Your Password...' />
                                    <span className='my-eye' onClick={toggleRetypePasswordVisibility}>
                                        {showRetypePass ? (
                                            <i class="fa-regular fa-eye"></i> // Eye-slash icon for hide
                                        ) : (
                                            <i class="fa-regular fa-eye-slash"></i> // Eye icon for show
                                        )}
                                    </span>
                                </div>
                                <div className="text-danger">
                                    {formik.touched.retype_password &&
                                        formik.errors.retype_password && (
                                            <div className="error">
                                                {formik.errors.retype_password}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <button type='submit' className='btn btn-outline-light'>Submit</button>
                            </div>
                            <div className='mt-2 text-center'>
                                <p>You alrady have account please <Link to='/SignInForm' className='text-primary'>Sign in</Link> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
