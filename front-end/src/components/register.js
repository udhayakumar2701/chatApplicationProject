import axios from 'axios';
import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';



const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retryPassword, setRetryPassword] = useState('');
    const navigate=useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleRetryPasswordChange = (e) => {
        setRetryPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8080/user/register',{
                username: username,
                password: password,
                retryPassword: retryPassword
            });
            navigate('/');
            console.log(response.data);
        }catch(error){
            console.log(error.response.data);
            alert(error.response.data);

        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">Register</h2>
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
                            <div className="form-group">
                                <label htmlFor="password">Retry-Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={retryPassword}
                                    onChange={handleRetryPasswordChange}
                                />
                            </div>
                            <div className='m-1'>

                            <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </div>
                            <div className='m-1'>
                                <h6>If you already have an account means plz..</h6>
                                <Link to="/login">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
