const fetch = require('../fetch');
const config = require('../../config/index');


exports.getData1 = data => {
  return fetch.sendRequest(
    config.url + 'mock/5c52af521c33cd20fb0ad274/demo/data',
    {
      data
    }
  )
}
