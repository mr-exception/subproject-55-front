const request = require("request");
/**
 * @author mr-exception
 * @description this method searches twitter users by screen name and returns the first user finds.
 * @parameter screen_name [string]: user's screen name
 * @parameter resolve [function]: calls when user found
 * @parameter on_user_not_found [function]: when user not found
 * @parameter on_network_error [function]: when network has any trouble
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