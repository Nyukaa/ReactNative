import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return <RepositoryListContainer repositories={repositories} />;
};

//separated for testing purposes
export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  console.log("repositories", repositories);
  //Extract graphql nodes from edges array
  // const repositoryNodes = repositories
  //   ? repositories.edges.map((edge) => edge.node)
  //   : [];
  // repositories is already mapped in useRepositories, so we can directly use it here without mapping again
  const repositoryNodes = repositories || [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
