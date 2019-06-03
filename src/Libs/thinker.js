let favorite_count = 0;
let retweet_count = 0;
let tweet_count = 0;
let daily_counts = [];

let followers = [];
let friends = [];
let tweets = [];
let profile = null;

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
    tweet_count += 1;
    favorite_count += tweet.favorite_count;
    retweet_count += tweet.retweet_count;
  }
  daily_counts = results;
}
const process = (data) => {
  generateCountsInDay(data.tweets);
  tweets = data.tweets;
  followers = data.followers;
  friends = data.friends;
  profile = data.profile;
}


/**
 * @author mr-exception
 * @description get favorites count (total in evert tweet)
 */
const getFavoritesCount = () => {
  return favorite_count;
}
/**
 * @author mr-exception
 * @description get retweets count (total in every tweet)
 */
const getRetweetsCount = () => {
  return retweet_count;
}
/**
 * @author mr-exception
 * @description get tweet count (excludes retweets)
 */
const getTweetsCount = () => {
  return tweet_count;
}
/**
 * @author mr-exception
 * @description get an array from favorite, tweet and retweets count based on day of each tweet
 */
const getDailyCount = () => {
  return daily_counts;
}
/**
 * @author mr-exception
 * @description appends the new tweets to the end of tweets stored in thinker
 * @param {array[tweet]} tweets 
 */
const appendTweets = (tweets_new) => {
  tweets += tweets_new;
}
/**
 * @author mr-exception
 * @description replaces the new tweets with tweets stored in thinker
 * @param {*} tweets_new 
 */
const setTweets = (tweets_new) => {
  tweets = tweets_new
}
/**
 * @author mr-exception
 * @description appends the new followers to the end of followers stored in thinker
 * @param {array[follower]} followers 
 */
const appendFollowers = (followers_new) => {
  followers += followers_new;
}
/**
 * @author mr-exception
 * @description replaces the new followers with followers stored in thinker
 * @param {*} followers_new 
 */
const setFollowers = (followers_new) => {
  followers = followers_new
}
/**
 * @author mr-exception
 * @description appends the new friends to the end of friends stored in thinker
 * @param {array[friend]} friends 
 */
const appendFriends = (friends_new) => {
  friends += friends_new;
}
/**
 * @author mr-exception
 * @description replaces the new friends with friends stored in thinker
 * @param {*} friends_new 
 */
const setFriends = (friends_new) => {
  friends = friends_new
}
/**
 * @author mr-exception
 * @description returns tweets stored in thinker
 */
const getTweets = () => {
  return tweets;
}
/**
 * @author mr-exception
 * @decsription returns friends stored in thinker
 */
const getFriends = () => {
  return friends;
}
/**
 * @author mr-exception
 * @description returns followers stored in thinker
 */
const getFollowers = () => {
  return followers;
}

/**
 * @author mr-exception
 * @description gets profile object stored in thinker
 */
const getProfile = () => {
  return profile;
}
/**
 * @author mr-exception
 * @description sets new profile to thinker and replaces with old profile
 */
const setProfile = (profile_new) => {
  profile = profile_new
}
module.exports = {
  process,

  getFavoritesCount,
  getRetweetsCount,
  getTweetsCount,
  getDailyCount,

  appendTweets,
  appendFriends,
  appendFollowers,

  setTweets,
  setFriends,
  setFollowers,

  getTweets,
  getFollowers,
  getFriends,

  getProfile,
  setProfile,
}