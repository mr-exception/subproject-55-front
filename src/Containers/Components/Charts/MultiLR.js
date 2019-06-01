import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
/**
 * some informations about Likes and Retweets got about per tweet
 */
class MultiLR extends React.Component {
  render() {
    let lpt = 0; // likes per tweet
    let rpt = 0; // likes per tweet
    let count = 0;
    for (let i = 0; i < this.props.tweets.length; i++) {
      const tweet = this.props.tweets[i];
      if (tweet.full_text.startsWith("RT"))
        continue;
      lpt += tweet.favorite_count;
      rpt += tweet.retweet_count;
      count += 1;
    }
    lpt /= count;
    rpt /= count;

    lpt = lpt.toFixed(2);
    rpt = rpt.toFixed(2);
    return (
      <Row>
        <Col md={12}>
          <h6><b>More Informations</b></h6>
          <p style={{ fontSize: 14 }}>More information is provided in the table below. All the numbers obtained are calculated through the active and public tweets of the user. Note that for more accurate reporting, you need to have more data from the user. For more data, you need a stronger computer and more resources.</p>
        </Col>
        <Col md={12}>
          <Table>
            <tbody>
              <tr>
                <th>likes per tweet</th>
                <td>{lpt}</td>
              </tr>
              <tr>
                <th>retweets per tweet</th>
                <td>{rpt}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default MultiLR;
