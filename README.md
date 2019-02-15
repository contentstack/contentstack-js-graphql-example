[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

# Build an example app using Contentstack GraphQL and Apollo Javascript SDK

We have created a sample product catalog app that is built using Contentstack’s iOS SDK. The content of this app is powered by Contentstack GraphQL APIs, and the app uses Apollo client on the client side to consume GraphQL APIs. 

This is an example app built using Contentstack GraphQL with Apollo javascript SDK. You can try out and play with this example app, before building bigger and better applications.

Perform the steps given below to get started with this app.

<img src='https://github.com/contentstack/contentstack-js-graphql-example/blob/master/views/images/product_list.png' width='95%'/>


## Prerequisite

-   [Contentstack account](https://app.contentstack.com/)
-   [Basic knowledge of Contentstack](https://www.contentstack.com/docs/)
    
## Step 1: Create a stack
Log in to your Contentstack account, and [create a new stack](https://www.contentstack.com/docs/guide/stack#create-a-new-stack). Read more about [stack](https://www.contentstack.com/docs/guide/stack).

## Step 2: Add a publishing environment
[Add a publishing environment](https://www.contentstack.com/docs/guide/environments#add-an-environment) to publish your content in Contentstack. Provide the necessary details as per your requirement. Read more about [environments](https://www.contentstack.com/docs/guide/environments).

## Step 3: Import content types
For this app, we need one content type: Product. Here’s what it is needed for:  

-   **Product**: Lets you add the product content into your app.  

For quick integration, we have already created the content type. [Download the content types](https://github.com/contentstack/contentstack-ios-graphql-example/raw/master/contentstack-graphql-example-app/ContentTypes.zip) and [import](https://www.contentstack.com/docs/guide/content-types#importing-a-content-type) it to your stack. (If needed, you can [create your own content types](https://www.contentstack.com/docs/guide/content-types#creating-a-content-type). Read more about [Content Types](https://www.contentstack.com/docs/guide/content-types).)



Now that all the content types are ready, let’s add some content for your Product app.

## Step 4: Add content
[Create](https://www.contentstack.com/docs/guide/content-management#add-a-new-entry) and [Publish](https://www.contentstack.com/docs/guide/content-management#publish-an-entry) entries for the ‘Product’ content type.  
Now that we have created the sample data, it’s time to use and configure the presentation layer.

## Step 5: Clone and configure the application
To get your app up and running quickly, we have created a sample javascript app for this project. You need to download it and change the configuration. Download the app using the command given below:

```
$ git clone https://github.com/contentstack/contentstack-js-graphql-example.git
```

## Step 6: Install Apollo framework
Begin by including packages that are essential for building the Apollo app. Install the following modules using the npm install command. Refer the [Installation](https://www.apollographql.com/docs/ios/installation.html#installing-framework) doc for more information.
 -   [Apollo-client](https://www.npmjs.com/package/apollo-client)
 -   [Apollo-cache-inmemory](https://www.npmjs.com/package/apollo-cache-inmemory)
 -   [Apollo-link-http](https://www.npmjs.com/package/apollo-link-http)
 -   [Graphql-tag](https://www.npmjs.com/package/graphql-tag)

## Step 7: Add modules in server file to invoke Apollo
In order to invoke Apollo as part of the JavaScript and for routing and templating purpose, add the  express and express-nunjucks modules to the server file, app.js.

Add the ‘apollo-client’ and ‘apollo-cache-inmemory’ parameters in ‘apollo-client’ instance.

```
const express = require('express');
const expressNunjucks = require('express-nunjucks')
const app = express();
var { ApolloClient } =  require('apollo-client');
var { InMemoryCache } = require('apollo-cache-inmemory');
var { HttpLink } = require('apollo-link-http');
var  gql  = require("graphql-tag");
var fetch = require('node-fetch');
```

## step 8: Create an Apollo Client
Create a single shared instance of 'Apollo-link' and point it at your GraphQL server. Add the ‘apollo-client’ and ‘apollo-memory’ parameters in ‘apollo-client’ instance. Under the HttpLink module instance, set the URL of GraphQL schema under the uri parameter and use fetch to fetch the data from graphql API.

```
const cache = new InMemoryCache();
const link = new HttpLink({
uri:'https://dev-graphql.contentstack.io/stacks/blt44d915c18f115370/explor  e?access_token=cs551d666a332e455a34174bd0&environment=production',
 fetch
})
const client = new ApolloClient({
  cache,
  link
})
```


## Step 9: Write your GraphQL queries

Contentstack provides a GraphQL playground, which is a GraphiQL interface, to test your GraphQL queries in your browser. Use this interface to write and test your queries.

Open a browser of your choice and hit the URL given below after inserting api_key, access_token, environment in url:
```
https://graphql.contentstack.io/stacks/api_key/explore?access_token=environment-specific_delivery_token&environment=environment_name
  ```


## Step 10: Fetch content using ApolloClient
To fetch all entries of ‘Product’ content type, add the following code snippet in the server file(app.js).

```
client
 .query({
  query: gql`query { all_product{
    title
    description
  } }`,
  .then(result =>
   res.render('./index', result)
   //console.log(result.data.all_product.items)
   )

```

The query will return the data for only the specific fields(‘title’, ‘description’) of the content type and store in result as an object and will render in index.html file.


## Step 11:  Build and run your application
Now that we have a working project, you can build and run it.
