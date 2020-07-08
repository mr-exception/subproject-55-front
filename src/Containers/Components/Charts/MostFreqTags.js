import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import Thinker from '../../../Libs/thinker.js';
/**
 * table of most frequent replies sorted by users
 */
class MostFreqTags extends React.Component {
  state = {
    list: [],
  }
  componentDidMount() {
    Thinker.add_event('tweets_changed', (tweets) => {
      this.setState({ list: Thinker.getMostFreqHashtags().slice(0, 5) }, () => {
      });
    });
    this.setState({
      list: Thinker.getMostFreqHashtags().slice(0, 5) 
    });
  }
  render() {
    return (
      <Row>
        <Col md={12}>
          <h5><b>Most used hashtags</b></h5>
          <p style={{ fontSize: 14 }}>Users have made comments on additional user tweets or you have more comments on their tweets. Ranked as a score on this table. (Only five users with more points are displayed).</p>
        </Col>
        <Col md={12}>
          <Table>
            <tbody>
              {this.state.list.map((item, index) => (
                <tr key={index}>
                  <th>{item.hashtag}</th>
                  <td>{item.count} points</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default MostFreqTags;
