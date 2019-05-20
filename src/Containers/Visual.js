import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Tab, Tabs } from 'react-bootstrap';
import Tweet from './Components/Tweet';

class Visual extends React.Component {
  render() {
    return (
      <Container>
        <Row style={{ marginTop: 100 }} className="justify-content-center">
          <Col md={4} sm={12} xs={12}>
            <Card>
              <Card.Body>
                test
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} sm={12} xs={12}>
            <Card>
              <Card.Body>
                <Tabs defaultActiveKey="timeline" id="uncontrolled-tab-example">
                  <Tab eventKey="timeline" title="Timeline">
                    <Row style={{marginTop: 25}}>
                      <Tweet />
                      <Tweet />
                    </Row>
                  </Tab>
                  <Tab eventKey="followers" title="Followers">
                    followers goes here
                  </Tab>
                  <Tab eventKey="friends" title="Friends">
                    friends goes here
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Visual;
