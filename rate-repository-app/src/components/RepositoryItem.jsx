import { View, StyleSheet, Image, Pressable, Linking } from "react-native";
import theme from "../theme";
import Stats from "./Stats";
import Text from "./Text";
const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 10,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
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
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
  },
  githubButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const RepositoryItem = ({ repository, showGitHubButton = false }) => {
  const openGitHub = () => {
    if (repository.url) {
      Linking.openURL(repository.url);
    }
  };
  return (
    <View style={styles.container} testID="repositoryItem">
      {/* for testing purposes */}
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
      {showGitHubButton && (
        <Pressable
          style={styles.githubButton}
          onPress={openGitHub}
          testID="githubButton"
        >
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
