import { StyleSheet, View } from "react-native";
import { Routes, Route, Navigate } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import CreateReview from "./CreateReview";
import SingleRepositoryView from "./SingleRepositoryView";
const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight, // moved to AppBar
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepositoryView />} />
        <Route path="/create-review" element={<CreateReview />} />
        {/* Redirect any unknown routes to the main repository list */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <RepositoryList /> */}
    </View>
  );
};

export default Main;
