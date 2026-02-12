import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";
import AuthStorage from "../utils/authStorage";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const authStorage = new AuthStorage();
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  tab: {
    marginRight: 15,
  },
  tabText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const { data } = useQuery(GET_CURRENT_USER);
  const handleSignOut = async () => {
    await authStorage.removeAccessToken(); // token removed from storage
    await apolloClient.resetStore();
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Repositories</Text>
        </Link>
        {data?.me && (
          <Link to="/create-review" component={Pressable} style={styles.tab}>
            <Text style={styles.tabText}>Create a review</Text>
          </Link>
        )}
        {data?.me && (
          <Link to="/my-reviews" component={Pressable} style={styles.tab}>
            <Text style={styles.tabText}>My reviews</Text>
          </Link>
        )}
        {!data?.me && (
          <Link to="/signup" component={Pressable} style={styles.tab}>
            <Text style={styles.tabText}>Sign up</Text>
          </Link>
        )}
        {data?.me ? (
          <Pressable onPress={handleSignOut} style={styles.tab}>
            <Text style={styles.tabText}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/signin" component={Pressable} style={styles.tab}>
            <Text style={styles.tabText}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
