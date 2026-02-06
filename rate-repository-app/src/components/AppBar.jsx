import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Repositories</Text>
        </Link>
        <Link to="/signin" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Sign in</Text>
        </Link>
        {/* for testing
         <Link to="/profile" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Profile</Text>
        </Link>
        <Link to="/settings" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Settings</Text>
        </Link>
        <Link to="/notifications" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Notifications</Text>
        </Link>
        <Link to="/help" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Help</Text>
        </Link> */}
      </ScrollView>
    </View>
  );
};

export default AppBar;
