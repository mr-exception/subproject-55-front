import React from 'react';
import { Container, Row, Col, Table, Card, Tab, Tabs, Image, Button } from 'react-bootstrap';
import { get_tweets, get_followers, get_friends } from '../Libs/twitter';
import LT from './Components/Charts/LT';
import RT from './Components/Charts/RT';
import Tweet from './Components/Tweet';
import Person from './Components/Person';
import MultiLR from './Components/Charts/MultiLR';
import thinker from '../Libs/thinker';

class Visual extends React.Component {
  state = {
    tweets: this.props.data.tweets || [],
    followers: this.props.data.followers || [],
    friends: this.props.data.friends || [],

    pagination: {
      tweets: 0,
      followers: 0,
      friends: 0,
    }
  }
  turnTweetsPage = (page) => {
    const profile = thinker.getProfile();
    const pagination = this.state.pagination;
    if (page * 10 >= this.state.tweets.length - 35) {
      get_tweets(profile.screen_name, Math.ceil(page / 20) + 1, (tweets) => {
        let old_list = this.state.tweets;
        old_list = old_list.concat(tweets);
        this.setState({ tweets: old_list });
      }, () => {
        console.log('user not found')
      }, () => {
        console.log('network error happened')
      });
    }
    pagination.tweets = page;
    this.setState({
      pagination
    });
  }
  turnFollowersPage = (page) => {
    const profile = thinker.getProfile();
    const pagination = this.state.pagination;
    if (page * 10 >= this.state.followers.length - 35)
      get_followers(profile.screen_name, page + 1, (followers) => {
        let old_list = this.state.followers;
        old_list = old_list.concat(followers);
        this.setState({ followers: old_list });
      }, () => {
        console.log('user not found')
      }, () => {
        console.log('network error happened')
      });
    pagination.followers = page;
    this.setState({
      pagination
    });
  }
  turnFriendsPage = (page) => {
    const profile = thinker.getProfile();
    const pagination = this.state.pagination;
    if (page * 10 >= this.state.friends.length - 35)
      get_friends(profile.screen_name, page + 1, (friends) => {
        let old_list = this.state.friends;
        old_list = old_list.concat(friends);
        this.setState({ friends: old_list });
      }, () => {
        console.log('user not found')
      }, () => {
        console.log('network error happened')
      });
    pagination.friends = page;
    this.setState({
      pagination
    });
  }
  render() {
    const profile = thinker.getProfile();
    return (
      <Container>
        <Row style={{ marginTop: 100 }} className="justify-content-center">
          <Col md={12} sm={12} xs={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6} sm={12}>
                    <Row>
                      <Col md={6} sm={12}>
                        <Image className="col-12" src={profile.profile_image_url_https.replace('_normal', '')} roundedCircle />
                      </Col>
                      <Col md={6} sm={12}>
                        <Row>
                          <Col md={12}>
                            <a href={`https://twitter.com/${profile.screen_name}`}>@{profile.screen_name}</a>
                          </Col>
                          <Col md={12}>
                            {profile.name}
                          </Col>
                          <Col md={12}>{profile.description}</Col>
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
                              <td>{profile.followers_count}</td>
                            </tr>
                            <tr>
                              <td>friends</td>
                              <td>{profile.friends_count}</td>
                            </tr>
                            <tr>
                              <td>tweets</td>
                              <td>{profile.statuses_count}</td>
                            </tr>
                            <tr>
                              <td>favorites</td>
                              <td>{profile.favourites_count}</td>
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
          <Col style={{ marginTop: 15 }} md={12} sm={12} xs={12}>
            <Card>
              <Card.Body>
                <Tabs defaultActiveKey="reports" id="uncontrolled-tab-example">
                  <Tab eventKey="reports" title="Reports">
                    <Row style={{ marginTop: 25 }}>
                      <Col md={12}>
                        <LT/>
                        <RT/>
                        <MultiLR/>
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
