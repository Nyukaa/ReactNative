import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import RepositoryList from "./RepositoryList";
import Text from "./Text";
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <>
      <Text>Simple text</Text>
      <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
      <Text fontWeight="bold" fontSize="subheading">
        Bold subheading
      </Text>
      <Text color="textSecondary">Text with secondary color</Text>
      <View style={styles.container}>
        <RepositoryList />
      </View>
    </>
  );
};

export default Main;
