import axios from 'axios';

// https://developer.twitter.com/en/apps
// https://developer.twitter.com/en/docs/basics/authentication/overview/oauth
// https://developer.twitter.com/en/docs/basics/authentication/api-reference/token
// https://developer.twitter.com/en/docs/basics/authentication/overview/application-only
const authenticate = function() {
  const key = 'VmYyltpbNNBlBExlduz06rj9o';
  const secret = 'bdth5ApuOhzquiJMOi3MuoIPd5gSSif6FtWoNBfgG83jXLTnYT';

  let params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  return axios.post('https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth2/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    auth: {
      username: key,
      password: secret
    }
  })
}

// https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline

// https://twitter.com/beijingair?lang=en
// https://twitter.com/cgshanghaiair?lang=en

const getData = function(token, screenName = 'cgshanghaiair', count = 15) {
  return axios.get('https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json', {
    params: {
      screen_name: screenName,
      count: count
    },
    headers: {
      // 'Origin': null,
      'Authorization': `Bearer ${token}`
    }
  })
}

export {
  authenticate,
  getData
}