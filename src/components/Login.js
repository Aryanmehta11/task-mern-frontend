import { FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess) navigate('/'); // Redirect to dashboard on successful login
        dispatch(reset());
    }, [isSuccess, isError, message, navigate, dispatch]);

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = e => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(login(userData));
    };

    return (
        isLoading ? <Spinner /> : (
            <>
                <section className="heading">
                    <h1> <FaSignInAlt /></h1>
                    <p> Login and start tasks</p>
                </section>

                <section className="form">
                    <form onSubmit={onSubmit}>

                        <div className="form-group">
                            <input type='email' id='email' name='email' onChange={onChange} value={email} className="form-control" placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <input type='password' id='password' name='password' onChange={onChange} value={password} className="form-control" placeholder="Enter your password" />
                        </div>
                        <button type="submit" className='btn btn-block'>
                            Submit
                        </button>
                    </form>
                </section>
            </>
        )
    );
};

export default Login;
