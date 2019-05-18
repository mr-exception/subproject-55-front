import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={2} style={{marginTop: 100}}>
          <img src="logo.svg" />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter username ..."
              aria-label="Enter username ..."
              aria-describedby="ats"
            />
            <InputGroup.Append>
              <Button variant="outline-primary">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
