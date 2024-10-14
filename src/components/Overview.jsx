import React from 'react';
import SalesBarChart from './BarChart';
import TrafficSourceChart from './DonutChart';
import LatestProducts from './LatestProducts';
import LatestOrders from './LatestOrders';
import { Container, Row, Col } from 'react-bootstrap';

function Overview() {
  return (
    <Container style={{ padding: '2rem', maxWidth: '1200px', margin: 'auto' }}>
      <Row>
        <Col md={6}>
          <h4>Sales Overview</h4>
          <SalesBarChart />
        </Col>
        <Col md={6}>
          <h4>Traffic Sources</h4>
          <TrafficSourceChart />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <LatestProducts />
        </Col>
        <Col md={6}>
          <LatestOrders />
        </Col>
      </Row>
    </Container>
  );
}

export default Overview;
