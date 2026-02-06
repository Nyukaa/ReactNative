import { View, Text, StyleSheet } from "react-native";
import theme from "../theme";
//formats numbers like 1.5k instead of 1500
const formatCount = (count) => {
  return count >= 1000 ? (count / 1000).toFixed(1) + "k" : count.toString();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  statLabel: {
    color: theme.colors.textSecondary,
  },
});

const Stats = ({ stars, forks, reviews, rating }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{formatCount(stars)}</Text>
        <Text style={styles.statLabel}>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{formatCount(forks)}</Text>
        <Text style={styles.statLabel}>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{formatCount(reviews)}</Text>
        <Text style={styles.statLabel}>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{rating}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
    </View>
  );
};

export default Stats;
