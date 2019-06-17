const twiiter = require('./twitter');
/**
 * data storage
 * here is all data that tina needs to work with
 */
let favorite_count = 0;
let retweet_count = 0;
let tweet_count = 0;
let daily_counts = [];

let followers = [];
let friends = [];
let tweets = [];

let followers_fetch_completed = false;
let friends_fetch_completed = false;
let tweets_fetch_completed = false;

let most_freq_replies = [];

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

  call_event('tweets_changed');
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
/**
 * Events
 * event pushers and fire core handles any change in data store, notifies to all callbacks
 */
const callbacks = {
  'tweets_changed': [],
  'friends_changed': [],
  'followers_changed': [],
}
/**
 * @author mr-exception
 * @param {string} action 
 * @param {function} callback 
 * @description attaches a new callback to events
 */
const add_event = (action, callback) => {
  if (action in callbacks) {
    callbacks[action].push(callback);
    return true;
  } else {
    return false;
  }
}
/**
 * @author mr-exception
 * @param {string} action
 * @description flushes the action event
 */
const flush_events = (action) => {
  if (action in callbacks) {
    callbacks[action] = [];
    return true;
  } else {
    return false;
  }
}
/**
 * @author mr-exception
 * @param {string} action 
 * @description calls all callbacks for a single event
 */
const call_event = (action) => {
  switch (action) {
    case 'tweets_changed':
      fill_most_replies();
      callbacks[action].forEach((callback) => {
        callback(tweets);
      });
      break;
    case 'followers_changed':
      callbacks[action].forEach((callback) => {
        callback(followers);
      });
      break;
    case 'friends_changed':
      callbacks[action].forEach((callback) => {
        callback(friends);
      });
      break;
    default:
      break;
  }
}
/**
 * @author mr-exception
 * @description fetches new tweets, if last fetch was empty, then flag `tweets_fetch_completed` changes to true and next exapnd operation'll be void
 */
const expand_tweets = () => {
  if (tweets_fetch_completed)
    return;
  const count = tweets.length;
  const page = Math.ceil(count / 200);
  twiiter.get_tweets(profile.screen_name, page + 1, (new_tweets) => {
    if (count === tweets.length) {
      tweets = tweets.concat(new_tweets);
      call_event('tweets_changed');
    }
    if (new_tweets.length === 0) {
      tweets_fetch_completed = true;
    }
  }, () => {
    console.log('user not found');
  }, () => {
    console.log('network error happened');
  });
}
/**
 * @author mr-exception
 * @description fetches new friends, if last fetch was empty, then flag `friends_fetch_completed` changes to true and next exapnd operation'll be void
 */
const expand_friends = () => {
  if (friends_fetch_completed)
    return;
  const count = friends.length;
  const page = Math.ceil(count / 200);
  twiiter.get_friends(profile.screen_name, page + 1, (new_friends) => {
    if (count === friends.length) {
      friends = friends.concat(new_friends);
      call_event('friends_changed');
    }
    if (new_friends.length === 0) {
      friends_fetch_completed = true;
    }
  }, () => {
    console.log('user not found');
  }, () => {
    console.log('network error happened');
  });
}
/**
 * @author mr-exception
 * @description fetches new followers, if last fetch was empty, then flag `followers_fetch_completed` changes to true and next exapnd operation'll be void
 */
const expand_followers = () => {
  if (followers_fetch_completed)
    return;
  const count = followers.length;
  const page = Math.ceil(count / 200);
  twiiter.get_followers(profile.screen_name, page + 1, (new_followers) => {
    if (count === followers.length) {
      followers = followers.concat(new_followers);
      call_event('followers_changed');
    }
    if (new_followers.length === 0) {
      followers_fetch_completed = true;
    }
  }, () => {
    console.log('user not found');
  }, () => {
    console.log('network error happened');
  });
}
/**
 * @author mr-exception
 * @description calculates the most replies by user and stores the results in `most_freq_replies` in schema {id, screen_name, count}
 */
const fill_most_replies = () => {
  for (let i = 0; i < tweets.length; i++) {
    if (tweets[i].in_reply_to_screen_name == null)
      continue;
    let found = false;
    for (let j = 0; j < most_freq_replies.length; j++) {
      if (most_freq_replies[j].screen_name === tweets[i].in_reply_to_screen_name) {
        most_freq_replies[j].count += 1;
        found = true;
        break;
      }
    }
    if (!found) {
      most_freq_replies.push({
        screen_name: tweets[i].in_reply_to_screen_name,
        id: tweets[i].in_reply_to_user_id_str,
        count: 1,
      });
    }
  }
  most_freq_replies.sort((a, b) => {
    return b.count - a.count;
  });
}
/**
 * @author mr-exception
 * @description returns `most_freq_replise`
 */
const getMostFreqReplies = () => {
  return most_freq_replies;
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

  add_event,
  call_event,
  flush_events,

  expand_tweets,
  expand_followers,
  expand_friends,

  getMostFreqReplies,
}