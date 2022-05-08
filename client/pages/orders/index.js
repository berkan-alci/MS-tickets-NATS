const OrderIndexComponent = ({ orders }) => {

    return (
        <div>
            <h1>Orders</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.ticket.title}</td>
                                <td>{order.ticket.price} USD</td>
                                <td>{order.status}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    );
}

OrderIndexComponent.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');
    return { orders: data };
};

export default OrderIndexComponent;