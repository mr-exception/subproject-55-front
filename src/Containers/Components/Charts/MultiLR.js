import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import {getFavoritesCount, getTweetsCount, getRetweetsCount} from '../../../Libs/thinker.js';
/**
 * some informations about Likes and Retweets got about per tweet
 */
class MultiLR extends React.Component {
  state = {
    favorite_count: 0,
    retweet_count: 0,
    tweet_count: 0,
  }

  render() {
    let lpt = getFavoritesCount() / getTweetsCount();
    let rpt = getRetweetsCount() / getTweetsCount();

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
