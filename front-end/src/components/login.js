import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.post('http://localhost:8080/user/login', {
                username: username,
                password: password
            });
            
            // Assuming response contains user data and a success status
            console.log(response.data);

            // Redirect user to another page upon successful login
            navigate('/'); // You can pass state here if needed

        } catch (error) {
            console.error("Error during login:", error);
            setUsername('');
            setPassword('');
            alert(error.response?.data || 'Login failed');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className='m-1'>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </div>
                            <div>
                                <h6>If you new user means plz..</h6>
                                <Link to="/register">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
