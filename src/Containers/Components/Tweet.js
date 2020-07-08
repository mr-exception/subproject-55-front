import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
class Tweet extends React.Component {
  state = {
    data: this.props.data,
  }
  render() {
    const ca = new Date((this.state.data || {}).created_at) // created at
    return (
      <Col md={12} style={{ marginTop: 5 }}>
        <Card>
          <Card.Body>
            <Row>
              <Col md={12} style={{ fontSize: 'small', fontStyle: 'italic', textAlign: 'right' }}>
                posted on {`${ca.getFullYear()}/${ca.getMonth()}/${ca.getDay()} ${ca.getHours()}:${ca.getMinutes()}`}
              </Col>
              <Col md={12}>
                {this.state.data.full_text}
              </Col>
              <Col md={12}>
                <Row style={{ marginTop: 30 }}>
                  <Col md={4} sm={6} xs={6}>
                    <i className="fa fa-heart-o" aria-hidden="true"> {this.state.data.favorite_count}</i>
                  </Col>
                  <Col md={4} sm={6} xs={6}>
                    <i className="fa fa-retweet" aria-hidden="true"> {this.state.data.retweet_count}</i>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Tweet;
