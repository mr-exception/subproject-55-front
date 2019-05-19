import React from 'react';
import { Container, Row, Col, ProgressBar, Modal, Button } from 'react-bootstrap';
import { get_profile, get_tweets, get_followers, get_friends} from '../Libs/twitter';

class Loading extends React.Component {
  state = {
    caption: 'fetching profile',
    progress: 10,
    user_not_found: false,
    network_error: false,
  }
  componentWillReceiveProps() {
    this.start();
  }
  componentDidMount() {
    this.start();
  }
  user_not_found = () => {
    this.setState({
      user_not_found: true,
    });
  }
  network_error = () => {
    this.setState({
      network_error: true,
    });
  }
  handleCloseUserNotFoundDialog = () => {
    this.setState({
      user_not_found: false,
    }, () => {
      this.props.failed();
    });
  }
  handleCloseNetworkError = () => {
    this.setState({
      network_error: false,
    }, () => {
      this.props.failed();
    });
  }
  start = () => {
    get_profile(this.props.query, (info) => {
      this.setState({
        caption: 'profile found, retriving tweets',
        progress: 25,
      }, () => {
        get_tweets(this.props.query, (info) => {
          this.setState({
            caption: 'tweets retrived, retriving followers',
            progress: 55,
          }, () => {
            get_followers(this.props.query, (info) => {
              this.setState({
                caption: 'followers retrived, retriving friends',
                progress: 80,
              }, () => {
                get_friends(this.props.query, (info) => {
                  this.setState({
                    caption: 'friends retrived, done!',
                    progress: 100,
                  });
                }, this.user_not_found, this.network_error);
              });
            }, this.user_not_found, this.network_error);
          });
        }, this.user_not_found, this.network_error);
      });
    }, this.user_not_found, this.network_error);
  }
  render() {
    return (
      <Container>
        <Row style={{ marginTop: 100 }} className="justify-content-center">
          {this.state.caption}
        </Row>
        <Row style={{ marginTop: 25 }} className="justify-content-center">
          <Col md={6}>
            <ProgressBar style={{ fontSize: 15, height: 40 }} now={this.state.progress} label={`${this.state.progress}%`} />
          </Col>
        </Row>
        <Modal show={this.state.user_not_found}>
          <Modal.Header>User not found!</Modal.Header>
          <Modal.Body>user not found. please check the username again.</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseUserNotFoundDialog}>ok got it!</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.network_error}>
          <Modal.Header>Network error!</Modal.Header>
          <Modal.Body>you have network issues. please check you connection.</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseNetworkError}>ok got it!</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
export default Loading;
