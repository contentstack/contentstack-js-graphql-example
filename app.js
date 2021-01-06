const express = require('express');
const expressNunjucks = require('express-nunjucks');
const app = express()
var { ApolloClient, InMemoryCache, HttpLink,from, gql } =  require('@apollo/client');
var fetch = require('node-fetch');
const port = process.env.PORT || 8000
const GRAPHQL_ENDPOINT =
  'https://graphql.contentstack.com/stacks/<API_KEY>?environment=<ENVIRONMENT_NAME>';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  fetch: fetch,
  headers: {
    access_token: '<ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN>',
  },
});
const client = new ApolloClient({
  link: from([link]),
  cache,
});
app.use(express.static('views'))
const njk = expressNunjucks(app, {
    watch: true,
    noCache: true
});



app.get('/', (req, res) => 

// ... above is the instantiation of the client object.
client
  .query({
    query: gql`query {
      all_product(locale: "en-us") {
        items {
          title
          description
          price
          featured_imageConnection(limit: 10) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }`
  })
  .then(result =>{
    res.render('./home', result)
  })
  .catch(error => {
    console.log(error);
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
