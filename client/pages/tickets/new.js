import Router from "next/router";
import { useState } from "react";
import { useRequest } from "../../hooks";

const NewTicket = () => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');


    const config = {
        url: '/api/tickets',
        method: 'post',
        body: { title, price },
        onSuccess: () => Router.push('/')
    }
    const { request, errors } = useRequest(config);


    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }
        setPrice(value.toFixed(2));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        request();
    }

    return (
        <div>
            <h1>Create a new ticket!</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input value={price} onBlur={onBlur} onChange={(e) => setPrice(e.target.value)} className="form-control" />
                </div>
                {errors}
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}



export default NewTicket;