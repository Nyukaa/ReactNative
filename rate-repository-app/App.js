import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./src/apolloClient";
import { NativeRouter } from "react-router-native";
import Constants from "expo-constants";
import Main from "./src/components/Main";

export default function App() {
  console.log(Constants.expoConfig);
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
