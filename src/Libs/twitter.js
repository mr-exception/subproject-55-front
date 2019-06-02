const request = require("request");
/**
 * @author mr-exception
 * @description receives user profile information
 * @param {string} screen_name 
 * @param {function} resolve 
 * @param {function} on_user_not_found 
 * @param {function} on_network_error 
 */
const get_profile = (screen_name, resolve, on_user_not_found, on_network_error) => {
  var options = {
    method: 'GET',
    url: `https://core.missyoudaddy.ir/api/twitter/search-user/${screen_name}`
  };
  request(options, function (error, response, body) {
    if (error) {
      on_network_error();
      return;
    }
    const result = JSON.parse(body);
    if (result.ok) {
      resolve(result.user);
    } else {
      if (result.code === 50) {
        on_user_not_found();
      } else {
        on_network_error();
      }
    }
  });
}
/**
 * @author mr-exception
 * @description fetches tweets of a users, each page size if 200 tweets and retweets are in list also
 * @param {string} screen_name 
 * @param {integer} page 
 * @param {function} resolve 
 * @param {function} on_user_not_found 
 * @param {function} on_network_error 
 */
const get_tweets = (screen_name, page=1, resolve, on_user_not_found, on_network_error) => {
  var options = {
    method: 'GET',
    url: `https://core.missyoudaddy.ir/api/twitter/tweets/${screen_name}?p=${page}`
  };
  request(options, function (error, response, body) {
    if (error) {
      on_network_error();
      return;
    }
    const result = JSON.parse(body);
    if (result.ok) {
      resolve(result.tweets);
    } else {
      if (result.code === 50) {
        on_user_not_found();
      } else {
        on_network_error();
      }
    }
  });
}
/**
 * @author mr-exception
 * @description fetches a single tweet by id
 * @param {string} tweet_id 
 * @param {function} resolve 
 * @param {function} on_tweet_not_found 
 * @param {function} on_network_error 
 */
const get_tweet = (tweet_id, resolve, on_tweet_not_found, on_network_error) => {
  var options = {
    method: 'GET',
    url: `https://core.missyoudaddy.ir/api/twitter/tweet/${tweet_id}`
  };
  request(options, function (error, response, body) {
    if (error) {
      on_network_error();
      return;
    }
    const result = JSON.parse(body);
    if (result.ok) {
      resolve(result.tweet);
    } else {
      if (result.code === 50) {
        on_tweet_not_found();
      } else {
        on_network_error();
      }
    }
  });
}
/**
 * @author mr-exception
 * @description fetches followers of a users by screen name, page size if 200
 * @param {*} screen_name 
 * @param {*} page 
 * @param {*} resolve 
 * @param {*} on_user_not_found 
 * @param {*} on_network_error 
 */
const get_followers = (screen_name, page=1, resolve, on_user_not_found, on_network_error) => {
  var options = {
    method: 'GET',
    url: `https://core.missyoudaddy.ir/api/twitter/followers/${screen_name}?p=${page}`
  };
  request(options, function (error, response, body) {
    if (error) {
      on_network_error();
      return;
    }
    const result = JSON.parse(body);
    if (result.ok) {
      resolve(result.users);
    } else {
      if (result.code === 50) {
        on_user_not_found();
      } else {
        on_network_error();
      }
    }
  });
}

/**
 * @author mr-exception
 * @description fetches friends of a user by screen name, page size is 200
 * @param {*} screen_name 
 * @param {*} page 
 * @param {*} resolve 
 * @param {*} on_user_not_found 
 * @param {*} on_network_error 
 */
const get_friends = (screen_name, page=1, resolve, on_user_not_found, on_network_error) => {
  var options = {
    method: 'GET',
    url: `https://core.missyoudaddy.ir/api/twitter/friends/${screen_name}?p=${page}`
  };
  request(options, function (error, response, body) {
    if (error) {
      on_network_error();
      return;
    }
    const result = JSON.parse(body);
    if (result.ok) {
      resolve(result.users);
    } else {
      if (result.code === 50) {
        on_user_not_found();
      } else {
        on_network_error();
      }
    }
  });
}

module.exports = {
  get_profile,
  get_tweets,
  get_friends,
  get_followers,
  get_tweet,
}