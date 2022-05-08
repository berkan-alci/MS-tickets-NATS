import React, { useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout';
import { useRequest } from "../../hooks";
import Router from "next/router";

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    const { request, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: (payment) => Router.push('/orders')
    })

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        }

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        return () => {
            clearInterval(timerId)
        };
    }, [])

    if (timeLeft < 0) {
        return (
            <div>
                Order has expired
            </div>
        )
    }

    return (
        <div>
            <div>
                Time left to pay: {timeLeft} seconds
                <StripeCheckout
                    token={({ id }) => request({ token: id })}
                    stripeKey="pk_test_51Kws9JJzSqC9WbDiIWLxFDLScNvhpfSBO4EyjHbjJowVn8tlcBrliNV7dphyyxrVAzvduiSSthRSgmGdKPUsprcP00gtV9fGHV"
                    amount={order.ticket.price * 100}
                    email={currentUser.email}
                />
                {errors}
            </div>
        </div>
    );
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query
    const { data } = await client.get(`/api/orders/${orderId}`)

    return { order: data }
};

export default OrderShow;