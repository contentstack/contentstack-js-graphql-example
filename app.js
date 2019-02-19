const express = require('express');
const expressNunjucks = require('express-nunjucks');
const app = express()
var { ApolloClient } =  require('apollo-client');
var { InMemoryCache } = require('apollo-cache-inmemory');
var { HttpLink } = require('apollo-link-http');
var  gql  = require("graphql-tag");
var fetch = require('node-fetch');
const port = process.env.PORT || 8000

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://graphql.contentstack.com/stacks/blt292960b854e5170e?access_token=csf77a123fda5cc627a0363a49&environment=development",
  fetch
})
const client = new ApolloClient({
  cache,
  link
})
app.use(express.static('views'))
const njk = expressNunjucks(app, {
    watch: true,
    noCache: true
});



app.get('/', (req, res) => 

// ... above is the instantiation of the client object.
client
  .query({
    query: gql`query { all_product{
    items{
    title
    description
    price
    featured_image {
      title
      url
    }  
  }
  } }`
  })
  .then(result =>{
   // console.log("endpoint>>>>>>>>>", JSON.stringify(result, null, 0))
    res.render('./home', result)
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
