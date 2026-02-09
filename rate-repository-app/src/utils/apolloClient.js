import { ApolloClient, InMemoryCache } from "@apollo/client";
//возвращает настроенный клиент, который потом используем в приложении.
const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://172.31.48.48:4000/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
