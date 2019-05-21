import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Table, Card, Tab, Tabs, Image } from 'react-bootstrap';
import Tweet from './Components/Tweet';

class Visual extends React.Component {
  state = {
    profile: this.props.data.profile,
    tweets: this.props.data.tweets || [],
    followers: this.props.data.followers || [],
    friends: this.props.data.friends || [],
  }
  render() {
    
    return (
      <Container>
        <Row style={{ marginTop: 100 }} className="justify-content-center">
          <Col md={4} sm={12} xs={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6} sm={12}>
                    <Image className="col-12" src={this.state.profile.profile_image_url_https.replace('_normal', '')} roundedCircle />
                  </Col>
                  <Col md={6} sm={12}>
                    <Row>
                      <Col md={12}>
                        <a href={`https://twitter.com/${this.state.profile.screen_name}`}>@{this.state.profile.screen_name}</a>
                      </Col>
                      <Col md={12}>
                        {this.state.profile.name}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row><Col md={12}>{this.state.profile.description}</Col></Row>
                <Row style={{marginTop: 25}}>
                  <Col md={12}>
                    <Table>
                      <tbody>
                        <tr>
                          <td>followers</td>
                          <td>{this.state.profile.followers_count}</td>
                        </tr>
                        <tr>
                          <td>friends</td>
                          <td>{this.state.profile.friends_count}</td>
                        </tr>
                        <tr>
                          <td>tweets</td>
                          <td>{this.state.profile.statuses_count}</td>
                        </tr>
                        <tr>
                          <td>likes</td>
                          <td>{this.state.profile.favourites_count}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} sm={12} xs={12}>
            <Card>
              <Card.Body>
                <Tabs defaultActiveKey="timeline" id="uncontrolled-tab-example">
                  <Tab eventKey="timeline" title="Timeline">
                    <Row style={{marginTop: 25}}>
                      {this.state.tweets.forEach(id => <Tweet id={id}/>)}
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
