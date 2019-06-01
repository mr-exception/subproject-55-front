import React from 'react';
import Chart from 'react-google-charts';
import { Row, Col, Table } from 'react-bootstrap';
/**
 * like and tweets charts in co-operative
 */
class LT extends React.Component {
  add_to_result = (result, tweet) => {
    let created_at = new Date(tweet.created_at);
    created_at = `${created_at.getFullYear()}/${created_at.getMonth()}/${created_at.getDate()}`;
    for (let i = 0; i < result.chart.length; i++) {
      if (result.chart[i][0] === created_at) {
        result.chart[i][1]++;
        result.chart[i][2] += tweet.favorite_count;
        result.likes += tweet.favorite_count;
        result.tweets += 1;
        return result;
      }
    }
    result.chart.push([created_at, 1, tweet.favorite_count]);
    return result;
  }
  render() {
    let result = {
      chart: [
        ['Count', 'Tweets', 'Likes'],
      ],
      likes: 0,
      tweets: 0,
    };
    for (let i = 0; i < this.props.tweets.length; i++) {
      const tweet = this.props.tweets[i];
      if (!tweet.full_text.startsWith("RT"))
        result = this.add_to_result(result, tweet);
    }
    if (result.length === 1)
      result.push(['-', 0, 0]);
    return (
      <Row>
        <Col md={12}>
          <h6><b>Likes & Tweets</b></h6>
          <p style={{ fontSize: 14 }}>Number of likes and tweets per day. In this chart, you can see how much of a user has come up with per activity per day.</p>
        </Col>
        <Col md={12}>
          <Chart
            height={400}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={result.chart}
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
                <td>{result.likes}</td>
              </tr>
              <tr>
                <th>total tweets</th>
                <td>{result.tweets}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default LT;
