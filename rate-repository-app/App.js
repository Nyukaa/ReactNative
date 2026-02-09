import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./src/apolloClient";
import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
// const apolloClient = new ApolloClient({
//   uri: "http://localhost:4000/graphql", // пока заглушка
//   cache: new InMemoryCache(),
// });
export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
