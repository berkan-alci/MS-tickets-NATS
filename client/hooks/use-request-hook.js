import axios from "axios";
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const request = async () => {
        try {
            const response = await axios[method](`http://ticketing.com${url}`, body);
            if (onSuccess) {
                onSuccess(response.data)
            };
            return response.data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4 className="my-0">Oops something went wrong ...</h4>
                    {err?.response?.data?.errors.map((e) => (
                        <li key={e.message}>{e.message}</li>
                    ))}
                </div>
            )
        };
    };

    return { request, errors };
};