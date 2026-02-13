import { View, FlatList, Pressable, Linking } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import ReviewItem from "./ReviewItem";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { Alert } from "react-native";

const MyReviews = () => {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) ?? [];
  console.log("current_user ", GET_CURRENT_USER);
  const handleDelete = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id } });
              await refetch();
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
  };

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

            <Pressable
              style={{
                flex: 1,
                backgroundColor: "#d73a4a",
                padding: 10,
                borderRadius: 4,
                alignItems: "center",
              }}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Delete review
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

export default MyReviews;
