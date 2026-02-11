import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import Constants from "expo-constants";
const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: Constants.expoConfig.extra.APOLLO_URI,
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
