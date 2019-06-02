let likes = 0;
let retweets = 0;
let tweets = 0;
let daily_counts = [];

const generateCountsInDay = (tweets_arr) => {
  let results = [];
  for (let i = 0; i < tweets_arr.length; i++) {
    const tweet = tweets_arr[i];
    if (tweet.full_text.startsWith('RT'))
      continue;
    let created_at = new Date(tweet.created_at);
    created_at = `${created_at.getFullYear()}/${created_at.getMonth()}/${created_at.getDate()}`;
    let found = false;
    for (let i = 0; i < results.length; i++) {
      if (results[i].created_at === created_at) {
        results[i].tweet_count += 1;
        results[i].favorite_count += tweet.favorite_count;
        results[i].retweet_count += tweet.retweet_count;
        found = true;
      }
    }
    if (!found) {
      results.push({
        created_at, tweet_count: 1, favorite_count: tweet.favorite_count, retweet_count: tweet.retweet_count,
      });
    }
    tweets += 1;
    likes += tweet.favorite_count;
    retweets += tweet.retweet_count;
  }
  daily_counts = results;
}
const process = (data) => {
  generateCountsInDay(data.tweets);
}
const getFavoritesCount = () => {
  return likes;
}
const getRetweetsCount = () => {
  return retweets;
}
const getTweetsCount = () => {
  return tweets;
}
const getDailyCount = () => {
  return daily_counts;
}
module.exports = {
  process,
  getFavoritesCount,
  getRetweetsCount,
  getTweetsCount,
  getDailyCount,
}