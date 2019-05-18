const Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'Q6Zgw7Ybk1Id6r8qZDFWUnsD5',
  consumer_secret: 'Bkj4htsw1LwNjlQvgwuFiyi1wGPmY4cCEjaos4CzFO9w9ZRXfg',
  access_token_key: '730997261333843968-8yksMJkQ1rJBCey9emCNsHRqcbg2SAU',
  access_token_secret: 'YcyeF9gR1Puug4vCKcKhMNScPPYaFJ3Ate3qKQGOXy6Ht'
});

const get_profile = (query, resolve, reject) => {
  const params = { q: query };
  client.get('users/search', params, function (error, info) {
    if (!error) {
      resolve(info[0])
    }else{
      reject(error)
    }
  });
}
module.exports = {
  get_profile
}