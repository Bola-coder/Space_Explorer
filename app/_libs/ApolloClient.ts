import { ApolloClient, InMemoryCache } from "@apollo/client";

const apiUrl = process.env.SPACE_X_URL;
const apolloClient = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

export default apolloClient;
