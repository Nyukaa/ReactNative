import { View, FlatList, ActivityIndicator } from "react-native";
import { useParams } from "react-router-native";
import { useQuery, gql } from "@apollo/client";
import RepositoryItem from "../components/RepositoryItem";
import ReviewItem from "../components/ReviewItem";
import { GET_REPOSITORY } from "../graphql/queries";

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error loading repository</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} showGitHubButton={true} />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default SingleRepositoryView;
