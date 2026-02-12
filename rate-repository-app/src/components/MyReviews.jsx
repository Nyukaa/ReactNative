import { View, FlatList, Pressable, Linking } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import ReviewItem from "./ReviewItem";
import Text from "./Text";
import { useNavigate } from "react-router-native";

const MyReviews = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) ?? [];
  console.log(GET_CURRENT_USER);
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: "white", marginBottom: 10 }}>
          <ReviewItem review={item} />

          <View style={{ flexDirection: "row", padding: 10 }}>
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "#0366d6",
                padding: 10,
                borderRadius: 4,
                marginRight: 5,
                alignItems: "center",
              }}
              onPress={() => navigate(`/repository/${item.repository.id}`)}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                View repository
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

export default MyReviews;
