import React from 'react';
import Chart from 'react-google-charts';
import { Row, Col, Table } from 'react-bootstrap';
import { getDailyCount, getFavoritesCount, getTweetsCount } from '../../../Libs/thinker.js';
import Thinker from '../../../Libs/thinker';
/**
 * like and tweets charts in co-operative
 */
class LT extends React.Component {
  componentDidMount() {
    Thinker.add_event('tweets_changed', (tweets) => {
      this.render();
    });
  }
  render() {
    let result = [
      ['Count', 'Tweets', 'Likes'],
    ];
    const daily_chart = getDailyCount();
    for (let i = 0; i < daily_chart.length; i++) {
      result.push([daily_chart[i].created_at, daily_chart[i].tweet_count, daily_chart[i].favorite_count]);
    }
    if (result.length === 1)
      result.push(['-', 0, 0]);
    return (
      <Row>
        <Col md={12}>
          <h5><b>Likes & Tweets</b></h5>
          <p style={{ fontSize: 14 }}>Number of likes and tweets per day. In this chart, you can see how much of a user has come up with per activity per day.</p>
        </Col>
        <Col md={12}>
          <Chart
            height={400}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={result}
            options={{
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Likes & Tweets',
                minValue: 0,
              },
              vAxis: {
                title: 'Count',
              },
            }}
            legendToggle
          />
        </Col>
        <Col md={12}>
          <Table>
            <tbody>
              <tr>
                <th>total likes</th>
                <td>{getFavoritesCount()}</td>
              </tr>
              <tr>
                <th>total tweets</th>
                <td>{getTweetsCount()}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default LT;
