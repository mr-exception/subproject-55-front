import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

class Search extends React.Component {
  execute = () => {
    const query = document.getElementById('query').value;
    this.props.search(query)
  }
  render() {
    return (
      <Container>
        <Row style={{ marginTop: 100 }} className="justify-content-center">
          <Col md={3} sm={6} xs={6}>
            <img style={{ width: '100%' }} alt="logo" src="logo.svg" />
          </Col>
        </Row>
        <Row style={{ marginTop: 50 }} className="justify-content-center">
          <Col md={6}>
            <InputGroup size="lg" className="mb-3">
              <FormControl
                id="query"
                placeholder="Enter username ..."
                aria-label="Enter username ..."
                aria-describedby="ats"
              />
              <InputGroup.Append>
                <Button variant="outline-primary" onClick={this.execute}>Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ textAlign: 'justify', marginBottom: 50 }}>
          <Col md={6} sm={12}>
            <h2>
              <strong>
                <span style={{ fontSize: '18px' }}>
                  Subproject 55
            </span>
              </strong>
              <br />
              <span style={{ fontSize: '14px' }}>
                The goal of this project is the ability to analyze social network users instantly without the use of metadata. The first phase of this project has been developed in Twitter. Because Twitter gives Tina more information because of its type of user. To test Tina&#39;s ability, you can search the user you are looking for to know Tina&#39;s review results.<br />
                Note that your searches will not be stored anywhere, and Twitter users&#39; data will not be sent to this site. All algorithms are executed on the user&#39;s side and only the connection between you and the network is Twitter.<br />
                Also note that Subproject 55 does not have the ability to review private users.
            </span>
              <br />
              <strong>
                <span style={{ fontSize: '18px' }}>
                  About Tina
            </span>
              </strong>
              <br />
              <span style={{ fontSize: '14px' }}>
                Tina was a learning nucleus whose project began in March 2015. Tina&#39;s goal is to fully understand the environment by using patterns that are more optimal than the human mind. Tina is not a script, a body or device. But rather an abstract concept of a set of patterns and data. In recent years, he has been trying to expand his mentality so that he can complete his knowledge patterns.
          </span>
            </h2>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
