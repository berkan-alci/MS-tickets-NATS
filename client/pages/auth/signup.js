import { useState } from "react";
import axios from 'axios';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://ticketing.com/api/users/signup', { email, password });
            console.log(res.data);
        } catch (err) {
            setErrors(err.response.data.errors);
        }

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
            {errors.length > 0 && (<div className="alert alert-danger">
                <h4 className="my-0">Oops something went wrong ...</h4>
                {errors.map((e) => (
                    <li key={e.message}>{e.message}</li>
                ))}
            </div>)}

            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
}