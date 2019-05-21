import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Tab, Tabs } from 'react-bootstrap';
import { get_tweet } from '../../Libs/twitter';
class Tweet extends React.Component {
  state = {
    loading: true,
    data: null,
  }
  load_tweet = () => {
    get_tweet(this.props.id, (data) => {
      this.setState({
        data
      });
    });
  }
  render() {
    if (this.state.loading)
      return (
        <Col md={12} style={{ marginTop: 5 }}>
          <Card>
            <Card.Body>
              loading...
            </Card.Body>
          </Card>
        </Col>
      );
    else
      return (
        <Col md={12} style={{ marginTop: 5 }}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={12} style={{ fontSize: 'small', fontStyle: 'italic', textAlign: 'right' }}>
                  posted on 2019/2/12 15:34
              </Col>
                <Col md={12}>
                  Commodo mollit deserunt Lorem velit labore aliquip et officia irure cupidatat. Fugiat ad labore deserunt ad laborum Lorem ad ullamco labore. Magna quis adipisicing ad velit esse irure sit. Deserunt dolore exercitation cupidatat sunt deserunt. Velit cillum nostrud labore veniam aliquip Lorem enim voluptate dolor aliquip veniam commodo minim nulla. Fugiat non duis irure nostrud sint laboris occaecat ut consequat aute et id enim. Aliquip proident mollit aliquip sit.
              </Col>
                <Col md={12}>
                  <Row style={{ marginTop: 30 }}>
                    <Col md={4} sm={6} xs={6}>
                      <i className="fa fa-heart-o" aria-hidden="true"> 105</i>
                    </Col>
                    <Col md={4} sm={6} xs={6}>
                      <i className="fa fa-comment-o" aria-hidden="true"> 12</i>
                    </Col>
                    <Col md={4} sm={6} xs={6}>
                      <i className="fa fa-retweet" aria-hidden="true"> 2</i>
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
