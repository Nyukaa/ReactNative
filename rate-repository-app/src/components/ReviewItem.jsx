import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, // half of width/height = round
    borderWidth: 2,
    borderColor: "#0366d6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  date: {
    color: "#586069",
    marginBottom: 4,
  },
  text: {
    marginBottom: 4,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
