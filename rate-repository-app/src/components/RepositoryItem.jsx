import { View, StyleSheet, Image } from "react-native";
import theme from "../theme";
import Stats from "./Stats";
import Text from "./Text";
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flexShrink: 1,
  },
  fullName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    marginBottom: 4,
    color: theme.colors.textSecondary,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      {" for testing purposes "}

      <View style={styles.header}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.fullName}>{repository.fullName}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <Stats
        stars={repository.stargazersCount}
        forks={repository.forksCount}
        reviews={repository.reviewCount}
        rating={repository.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
