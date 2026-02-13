import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useParams } from "react-router-native";
import useReviews from "../hooks/useReviews";
import RepositoryItem from "../components/RepositoryItem";
import ReviewItem from "../components/ReviewItem";

const SingleRepositoryView = () => {
  const { id } = useParams();

  const { repository, reviews, loading, error, fetchMore } = useReviews({
    repositoryId: id,
    first: 2,
  });
  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error loading repository</Text>;
  console.log("reviews.length:", reviews?.edges.length);
  //const repository = data.repository;
  //const reviews = repository.reviews.edges.map((edge) => edge.node);
  // Map edges to nodes for FlatList
  const reviewNodes = reviews?.edges.map((edge) => edge.node) ?? [];
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <RepositoryItem repository={repository} showGitHubButton={true} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

export default SingleRepositoryView;
