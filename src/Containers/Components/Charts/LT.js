import React from 'react';
import Chart from 'react-google-charts';
/**
 * like and tweets charts in co-operative
 */
class LT extends React.Component {
  // state = {
  //   data: [
  //     ['Count', 'Tweets', 'Likes'],
  //   ],
  // }
  // componentDidMount() {
  //   const tweets = this.props.tweets;
  //   let result = [
  //     ['Count', 'Tweets', 'Likes'],
  //   ];
  //   for (let i = 0; tweets.length; i++) {
  //     console.log(new Date(Date.parse("Sun May 26 06:00:16 +0000 2019")).getDate());
  //     // result.push([])
  //   }
  //   this.state = {
  //     data: result
  //   };
  // }
  add_to_result = (result, tweet) => {
    let created_at = new Date(tweet.created_at);
    created_at = `${created_at.getFullYear()}/${created_at.getMonth()}/${created_at.getDate()}`;
    if (created_at === '2019/4/25')
      console.log(tweet);
    for (let i = 0; i < result.length; i++) {
      if (result[i][0] === created_at) {
        result[i][1]++;
        result[i][2] += tweet.favorite_count;
        return result;
      }
    }
    result.push([created_at, 1, 5]);
    return result;
  }
  render() {
    let result = [
      ['Count', 'Tweets', 'Likes'],
    ];
    for (let i = 0; i < this.props.tweets.length; i++) {
      const tweet = this.props.tweets[i];
      result = this.add_to_result(result, tweet);
    }
    return (
      <Chart
        height={400}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={result}
        options={{
          chart: {
            title: 'Like & Tweets',
            subtitle: 'Number of likes and tweets per day. In this chart, you can see how much of a user has come up with per activity per day.',
          },
          chartArea: { width: '70%' },
          hAxis: {
            title: 'Likes & Tweets',
            minValue: 0,
          },
          vAxis: {
            title: 'City',
          },
        }}
        legendToggle
      />
    );
  }
}

export default LT;
