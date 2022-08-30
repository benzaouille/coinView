const axios = require('axios');

axios.get('https://api.coingecko.com/api/v3/ping')
  .then(response => {
    if(response.status == 200)
    {
      //list all the coins

      //return the historiacal data of the coin throught a loop

      //do stuff
    }
  })
  .catch(error => {
    console.log(error);
  });
