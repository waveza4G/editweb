import React from 'react';

const orders = [
    { id: "ORD-007", customer: "Ekaterina Tankova", date: "Oct 11, 2024", status: "Pending" },
    { id: "ORD-006", customer: "Cao Yu", date: "Oct 11, 2024", status: "Delivered" },
    { id: "ORD-005", customer: "Alexa Richardson", date: "Oct 11, 2024", status: "Refunded" },
    { id: "ORD-004", customer: "Anje Keizer", date: "Oct 11, 2024", status: "Pending" },
    { id: "ORD-003", customer: "Claire Gilbert", date: "Oct 11, 2024", status: "Delivered" },
    { id: "ORD-002", customer: "Adam Denisov", date: "Oct 11, 2024", status: "Delivered" }
];

function LatestOrders() {
    return (
        <div style={{ padding: '20px', background: '#f4f6f8', borderRadius: '10px', flex: 1 }}>
            <h3>Latest Orders</h3>
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.date}</td>
                            <td style={{ color: order.status === "Pending" ? "orange" : order.status === "Delivered" ? "green" : "red" }}>
                                {order.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="#">View all</a>
        </div>
    );
}

export default LatestOrders;
