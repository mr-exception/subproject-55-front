import React from 'react';
import { Container, Row, Col, Table, Card, Tab, Tabs, Image, Button, InputGroup, FormControl, } from 'react-bootstrap';
import LT from './Components/Charts/LT';
import RT from './Components/Charts/RT';
import Tweet from './Components/Tweet';
import Person from './Components/Person';
import MultiLR from './Components/Charts/MultiLR';
import MostFreqReps from './Components/Charts/MostFreqReps';
import MostFreqTags from './Components/Charts/MostFreqTags';
import Thinker from '../Libs/thinker.js';
import TotalScore from './Components/Charts/TotalScore';
import Space from './Components/Space';

class Visual extends React.Component {
  state = {
    tweets: [],
    followers: [],
    friends: [],
    profile: {},

    pagination: {
      tweets: 0,
      followers: 0,
      friends: 0,
    }
  }
  turnTweetsPage = (page) => {
    const pagination = this.state.pagination;
    /**
     * I think it's not good for client resources
     * (mr-exception)
     */
    // if (page * 10 >= this.state.tweets.length - 35) {
    //   Thinker.expand_tweets();
    // }
    pagination.tweets = page;
    this.setState({
      pagination
    });
  }
  turnFollowersPage = (page) => {
    const pagination = this.state.pagination;
    /**
     * I think it's not good for client resources
     * (mr-exception)
     */
    // if (page * 10 >= this.state.followers.length - 35) {
    //   Thinker.expand_followers();
    // }
    pagination.followers = page;
    this.setState({
      pagination
    });
  }
  turnFriendsPage = (page) => {
    const pagination = this.state.pagination;
    /**
     * I think it's not good for client resources
     * (mr-exception)
     */
    // if (page * 10 >= this.state.friends.length - 35) {
    //   Thinker.expand_friends();
    // }
    pagination.friends = page;
    this.setState({
      pagination
    });
  }
  componentDidMount() {
    this.setState({
      tweets: Thinker.getTweets(),
      friends: Thinker.getFriends(),
      followers: Thinker.getFollowers(),
      profile: Thinker.getProfile(),
    })
    Thinker.add_event('tweets_changed', (tweets) => {
      this.setState({ tweets });
    });
    Thinker.add_event('followers_changed', (followers) => {
      this.setState({ followers });
    });
    Thinker.add_event('friends_changed', (friends_changed) => {
      this.setState({ friends_changed });
    });
  }
  execute = () => {
    const query = document.getElementById('query').value;
    this.props.search(query)
  }
  handleKeyDown = (e) => {
    if (e.keyCode === 13)
      this.execute();
  }
  fetch_more_data = () => {
    /**
     * I think it's not good for client resources
     * (mr-exception)
     */
    // Thinker.expand_followers();
    // Thinker.expand_friends();
    // Thinker.expand_tweets();
  }
  render() {
    return (
      <Container><
        Row style={{ marginTop: 50 }} className="justify-content-center">
        <Col md={12} xs={12}>
          <InputGroup size="lg" className="mb-3">
            <FormControl
              id="query"
              placeholder="Enter username ..."
              aria-label="Enter username ..."
              aria-describedby="ats"
              onKeyDown={this.handleKeyDown}
            />
            <InputGroup.Append>
              <Button variant="outline-primary" onClick={this.execute}>Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
        <Row className="justify-content-center">
          <Col md={12} sm={12} xs={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6} sm={12}>
                    <Row>
                      <Col md={6} sm={12}>
                        <Image className="col-12" src={(this.state.profile.profile_image_url_https || '').replace('_normal', '')} roundedCircle />
                      </Col>
                      <Col md={6} sm={12}>
                        <Row>
                          <Col md={12}>
                            <a href={`https://twitter.com/${this.state.profile.screen_name}`}>@{this.state.profile.screen_name}</a>
                          </Col>
                          <Col md={12}>
                            {this.state.profile.name}
                          </Col>
                          <Col md={12}>{this.state.profile.description}</Col>
                          {/* <Col md={12} style={{ marginTop: 15 }}>
                            <Button outline="info" onClick={this.fetch_more_data}>fetch more data</Button>
                          </Col> */}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} sm={12}>
                    <Row style={{ marginTop: 25 }}>
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
                              <td>favorites</td>
                              <td>{this.state.profile.favourites_count}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ marginTop: 15, marginBottom: 40 }} md={12} sm={12} xs={12}>
            <Card>
              <Card.Body>
                <Tabs defaultActiveKey="reports" id="uncontrolled-tab-example">
                  <Tab eventKey="reports" title="Reports">
                    <Row style={{ marginTop: 25 }}>
                      <Col md={12}>
                        <TotalScore />
                        <LT/>
                        <Space />
                        <RT/>
                        <Space />
                        <MultiLR/>
                        <Space />
                        <MostFreqReps/>
                        <MostFreqTags/>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="timeline" title="Timeline">
                    <Row style={{ marginTop: 25 }}>
                      {this.state.tweets.slice(this.state.pagination.tweets * 10, (this.state.pagination.tweets + 1) * 10).map(item => <Tweet data={item} key={item.id_str} />)}
                    </Row>
                    <Row style={{ marginTop: 15 }} className="justify-content-center">
                      <Button variant="outline-primary" disabled={this.state.pagination.tweets === 0} style={{ marginRight: 5 }} onClick={() => { this.turnTweetsPage(this.state.pagination.tweets - 1); }}>{'<'}</Button>
                      <Button variant="outline-primary" disabled>{`${this.state.pagination.tweets + 1}`}</Button>
                      <Button variant="outline-primary" disabled={this.state.pagination.tweets >= parseInt(Math.ceil(this.state.tweets.length / 10)) - 1} style={{ marginLeft: 5 }} onClick={() => { this.turnTweetsPage(this.state.pagination.tweets + 1); }}>{'>'}</Button>
                    </Row>
                  </Tab>
                  <Tab eventKey="followers" title="Followers">
                    <Row style={{ marginTop: 25 }}>
                      {this.state.followers.slice(this.state.pagination.followers * 10, (this.state.pagination.followers + 1) * 10).map(item => <Person data={item} key={item.id_str} />)}
                    </Row>
                    <Row style={{ marginTop: 15 }} className="justify-content-center">
                      <Button variant="outline-primary" disabled={this.state.pagination.followers === 0} style={{ marginRight: 5 }} onClick={() => { this.turnFollowersPage(this.state.pagination.followers - 1); }}>{'<'}</Button>
                      <Button variant="outline-primary" disabled>{`${this.state.pagination.followers + 1}`}</Button>
                      <Button variant="outline-primary" disabled={this.state.pagination.followers >= parseInt(Math.ceil(this.state.followers.length / 10)) - 1} style={{ marginLeft: 5 }} onClick={() => { this.turnFollowersPage(this.state.pagination.followers + 1); }}>{'>'}</Button>
                    </Row>
                  </Tab>
                  <Tab eventKey="friends" title="Friends">
                    <Row style={{ marginTop: 25 }}>
                      {this.state.friends.slice(this.state.pagination.friends * 10, (this.state.pagination.friends + 1) * 10).map(item => <Person data={item} key={item.id_str} />)}
                    </Row>
                    <Row style={{ marginTop: 15 }} className="justify-content-center">
                      <Button variant="outline-primary" disabled={this.state.pagination.friends === 0} style={{ marginRight: 5 }} onClick={() => { this.turnFriendsPage(this.state.pagination.friends - 1); }}>{'<'}</Button>
                      <Button variant="outline-primary" disabled>{`${this.state.pagination.friends + 1}`}</Button>
                      <Button variant="outline-primary" disabled={this.state.pagination.friends >= parseInt(Math.ceil(this.state.friends.length / 10)) - 1} style={{ marginLeft: 5 }} onClick={() => { this.turnFriendsPage(this.state.pagination.friends + 1); }}>{'>'}</Button>
                    </Row>
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