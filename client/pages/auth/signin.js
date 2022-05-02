import { useState } from "react";
import axios from 'axios';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://ticketing.com/api/users/signin', { email, password });

    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label>Email:</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" type="email" />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input value={password} onChange={e => setPassword(e.target.value)} className="form-control" type="password" />
            </div>
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
}