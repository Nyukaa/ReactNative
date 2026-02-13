import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import Constants from "expo-constants";
//get token AsyncStorage through AuthStorage.
//add it to Authorization for every request if it exists

const createApolloClient = (authStorage) => {
  const httpLink = createHttpLink({
    uri: Constants.expoConfig.extra.APOLLO_URI,
  });

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await authStorage.getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repositories: relayStylePagination(),
        },
      },
      Repository: {
        fields: {
          reviews: relayStylePagination(), // add pagination for reviews
        },
      },
    },
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache, //new InMemoryCache(), now we use the same pagination for all queries
  });
};

export default createApolloClient;
