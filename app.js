const express = require('express');
const expressNunjucks = require('express-nunjucks');
const app = express()
var { ApolloClient } =  require('apollo-client');
var { InMemoryCache } = require('apollo-cache-inmemory');
var { HttpLink } = require('apollo-link-http');
var  gql  = require("graphql-tag");
var fetch = require('node-fetch');
const port = process.env.PORT ||5000

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://dev-graphql.contentstack.io/stacks/blt44d915c18f115370/explore?access_token=cs551d666a332e455a34174bd0&environment=production',
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
    //console.log(result.data.all_product.items[0].featured_image)    
    res.render('./home', result)
    //console.log(result.data.all_product.items)
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
