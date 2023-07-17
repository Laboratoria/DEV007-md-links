const axios = require('axios');

axios.get('http://axios-http.com/docs/example')
  .then((response) => {
    // handle success
    console.log(response);
  });
