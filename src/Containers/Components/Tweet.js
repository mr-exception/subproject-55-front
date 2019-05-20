import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Tab, Tabs } from 'react-bootstrap';

class Tweet extends React.Component {
  render() {
    return (
      <Col md={12} style={{ marginTop: 5 }}>
        <Card>
          <Card.Body>
            <Row>
              <Col md={12}>
                Commodo mollit deserunt Lorem velit labore aliquip et officia irure cupidatat. Fugiat ad labore deserunt ad laborum Lorem ad ullamco labore. Magna quis adipisicing ad velit esse irure sit. Deserunt dolore exercitation cupidatat sunt deserunt. Velit cillum nostrud labore veniam aliquip Lorem enim voluptate dolor aliquip veniam commodo minim nulla. Fugiat non duis irure nostrud sint laboris occaecat ut consequat aute et id enim. Aliquip proident mollit aliquip sit.
              </Col>
              <Col md={12}>
                author
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Tweet;
