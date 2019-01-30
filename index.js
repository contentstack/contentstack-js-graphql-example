var { execute, makePromise } = require('apollo-link');
var { HttpLink } = require('apollo-link-http');
var gql = require('graphql-tag');
var fetch = require('node-fetch');

const uri = 'https://dev-graphql.contentstack.io/?api_key=***REMOVED***';
const link = new HttpLink({ uri, fetch });

const operation = {
  query: gql`query { category{
    title
    description
  } }`,
  variables: {}, //optional
  operationName: {}, //optional
  context: {}, //optional
  extensions: {} //optional
};


execute(link, operation).subscribe({
  next: data => console.log(`received data: ${JSON.stringify(data, null, 2)}`),
  error: error => console.log(`received error ${error}`),
  complete: () => console.log(`complete`),
})


//module.exports = client

 