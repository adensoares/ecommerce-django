import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { 
    Container, 
    Table,
    Row,
    Col,
} from 'reactstrap';


const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/');
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container style={{minHeight: "80vh"}}>
        <Row>
            <Col>
                <h1>Meus Pedidos</h1>
            </Col>
        </Row>
        <Row className="mt-5">
            <Col>
        <Table >
            <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date_created}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td>
                    <button className="btn btn-primary me-2">View Details</button>
                    {order.status === 'Pending' && (
                    <button className="btn btn-danger">Cancel Order</button>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
            </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default MyOrders;
