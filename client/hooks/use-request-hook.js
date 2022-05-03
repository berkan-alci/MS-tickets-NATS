import axios from "axios";
import { useState } from 'react';

export default ({ url, method, body }) => {
    const [errors, setErrors] = useState(null);

    let pending = true;
    const request = async () => {
        try {
            const response = await axios[method](`http://ticketing.com${url}`, body);
            pending = false;
            return response.data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4 className="my-0">Oops something went wrong ...</h4>
                    {err.response.data?.errors.map((e) => (
                        <li key={e.message}>{e.message}</li>
                    ))}
                </div>
            )
        };
    };

    return { request, pending, errors };
};