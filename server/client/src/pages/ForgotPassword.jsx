import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode
import Cookies from 'js-cookie';     // Corrected to js-cookie
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [employeeEmail, setEmployeeEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = 'light'; // Default to light
        // const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
        const body = document.querySelector('body');
        body.setAttribute('data-theme-version', savedTheme); // Apply theme to body
    }, [])



    const showErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            // timer: 2000, // Automatically closes after 2 seconds
            // showConfirmButton: false,
        });
    };

    const showSuccessAlert = (message) => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            timer: 2000,
            showConfirmButton: false,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            employeeEmail,
        };

        try {
            const response = await axios.post("/api/employee/login", formData);
            // successNotify(response.data.msg);
            showSuccessAlert(response.data.msg);


            const userToken = response.data.token;
            const decodedToken = jwtDecode(userToken);
            Cookies.set("UserAuthToken", userToken);

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            showErrorAlert(error.response?.data?.err || 'Failed to Login');
        }
    };

    return (
        <>
            <div className="login-form-bg vh-100 " style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/nightfall-workplace-dark-office-interior-photo_960396-69711.jpg?w=996')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <style>
                    {`
                       input::placeholder {
    color: #d6d6d6 !important; /* Change this to the color you want */
},


                    `}
                </style>
                <div className="container h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-xl-6">
                            <div className="form-input-content">
                                <div className="card login-form mb-0" style={{ backgroundColor: "rgb(255 255 255 / 19%)" }}>
                                    <div className="card-body pt-5">
                                        <a className="text-center" href="index.html">
                                            <h4><img src="/images/Primevertex--Logo-light.png" alt="" /></h4>
                                        </a>
                                        <form className="mt-5 mb-5 login-input" onSubmit={handleSubmit}>
                                            <h4  style={{color:"white",fontWeight:"500"}}>Enter your email address and we will send you Password Reset Link</h4>
                                            <br />
                                            <div className="form-group">
                                                <input
                                                    style={{ color: "white" }}
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    value={employeeEmail}
                                                    onChange={(e) => setEmployeeEmail(e.target.value)}
                                                />
                                            </div>
                                            <button className="btn login-form__btn  submit w-100" type="submit" style={{ backgroundColor: "#0d6efd" }}>
                                                Send Email
                                            </button>
                                            <span className='btn'>
                                         <Link  to="/login" style={{color:"white",fontWeight:"800"}} >Login page?</Link>
                                        </span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
// Shaloom@12345