import React from 'react';
import Chart from 'react-google-charts';
import { Row, Col, Table } from 'react-bootstrap';
import { getDailyCount, getRetweetsCount, getTweetsCount } from '../../../Libs/thinker.js';
import Thinker from '../../../Libs/thinker.js';
/**
 * retweets and tweets charts in co-operative
 */
class RT extends React.Component {
  componentDidMount() {
    Thinker.add_event('tweets_changed', (tweets) => {
      this.render();
    });
  }
  render() {
    let result = [
      ['Count', 'Tweets', 'Retweets'],
    ];
    const daily_chart = getDailyCount();
    for (let i = 0; i < daily_chart.length; i++) {
      result.push([daily_chart[i].created_at, daily_chart[i].tweet_count, daily_chart[i].retweet_count])
    }
    if (result.length === 1)
      result.push(['-', 0, 0]);
    return (
      <Row>
        <Col md={12}>
          <h5><b>Retweets & Tweets</b></h5>
          <p style={{ fontSize: 14 }}>Number of retweets and tweets per day. In this chart, you can see how much of a user has come up with per activity per day.</p>
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
                title: 'Retweets & Tweets',
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
                <th>total retweets</th>
                <td>{getRetweetsCount()}</td>
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

export default RT;
