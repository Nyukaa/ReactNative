import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  fullName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    marginBottom: 4,
  },
  language: {
    // backgroundColor: "#fff555",
    color: "#000333",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>{repository.fullName}</Text>
      <Text style={styles.description}>{repository.description}</Text>
      <Text style={styles.language}>{repository.language}</Text>
    </View>
  );
};

export default RepositoryItem;
