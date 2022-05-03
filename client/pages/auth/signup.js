import { useState } from "react";
import axios from 'axios';
import { useRequest } from "../../hooks";



export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const config = {
        url: '/api/users/signup',
        method: 'post',
        body: { email, password },
    };
    const { request, errors } = useRequest(config)

    const onSubmit = async (e) => {
        e.preventDefault();

        request();


    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email:</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" type="email" />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input value={password} onChange={e => setPassword(e.target.value)} className="form-control" type="password" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
}