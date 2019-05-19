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
    url: `http://localhost:8000/api/twitter/search-user/${screen_name}`
  };
  request(options, function (error, response, body) {
    // if (error) throw new Error(error);
    const result = JSON.parse(body);
    if(body.ok){
      resolve(body.user);
    }else{
      if(body.code == 50){
        on_user_not_found();
      }else{
        on_network_error();
      }
    }
  });
}


module.exports = {
  get_profile
}