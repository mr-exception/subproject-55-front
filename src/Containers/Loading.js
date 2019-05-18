import React from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { get_profile } from '../Libs/twitter';

class Loading extends React.Component {
  state = {
    caption: 'fetching profile',
    progress: 10
  }
  componentWillReceiveProps(){
    this.start();
  }
  componentDidMount(){
    this.start();
  }
  start = () => {
    get_profile(this.props.query, (info) => {
      this.setState({
        caption: 'profile found',
        progress: 25,
      });
    }, () => {
      console.log('failed on get profile');
    })
  }
  render() {
    return (
      <Container>
        <Row style={{ marginTop: 100 }} className="justify-content-center">
          working on {this.props.query}
        </Row>
        <Row style={{ marginTop: 25 }} className="justify-content-center">
          <Col md={6}>
            <ProgressBar style={{ fontSize: 15, height: 40 }} now={this.state.progress} label={this.state.caption} />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Loading;
