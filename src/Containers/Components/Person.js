import React from 'react';
import { Row, Col, Card, Image, Table } from 'react-bootstrap';
class Person extends React.Component {
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
              <Col md={3} sm={4} xs={12}>
                <Image className="col-12" src={this.state.data.profile_image_url_https.replace('_normal', '')} roundedCircle />
              </Col>
              <Col md={9} sm={8} xs={12}>
                <Row>
                  <Col md={12} style={{marginTop: 15}}>
                    {this.state.data.name} (<a href={`https://twitter.com/${this.state.data.screen_name}`}>@{this.state.data.screen_name}</a>)
                  </Col>
                  <Col md={12}>
                    {this.state.data.description}
                  </Col>
                  <Col md={12} style={{marginTop: 25}}>
                    <Table>
                      <tbody>
                        <tr>
                          <td>followers</td>
                          <td>{this.state.data.followers_count}</td>
                        </tr>
                        <tr>
                          <td>friends</td>
                          <td>{this.state.data.friends_count}</td>
                        </tr>
                        <tr>
                          <td>tweets</td>
                          <td>{this.state.data.statuses_count}</td>
                        </tr>
                        <tr>
                          <td>likes</td>
                          <td>{this.state.data.favourites_count}</td>
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
    );
  }
}

export default Person;
