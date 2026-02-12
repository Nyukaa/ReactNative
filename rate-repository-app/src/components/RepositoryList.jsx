import { useState } from "react";
import { Text } from "react-native";
import useRepositories from "../hooks/useRepositories";

const RepositoryList = () => {
  //  order state to manage sorting of repositories
  const [order, setOrder] = useState({
    orderBy: "CREATED_AT", //what field to sort by
    orderDirection: "DESC", //how to sort (descending or ascending)
  });

  const { repositories, loading, error } = useRepositories(order);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
    />
  );
};

import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker"; // for dropdown menu

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  const navigate = useNavigate();
  //    to update the order state based on user selection
  const handleOrderChange = (value) => {
    if (value === "LATEST")
      setOrder({ orderBy: "CREATED_AT", orderDirection: "DESC" });

    if (value === "HIGHEST")
      setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });

    if (value === "LOWEST")
      setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
  };

  return (
    <FlatList
      data={repositories}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <Picker
          selectedValue={
            order.orderBy === "CREATED_AT"
              ? "LATEST"
              : order.orderDirection === "DESC"
              ? "HIGHEST"
              : "LOWEST"
          }
          onValueChange={handleOrderChange}
        >
          <Picker.Item label="Latest repositories" value="LATEST" />
          <Picker.Item label="Highest rated repositories" value="HIGHEST" />
          <Picker.Item label="Lowest rated repositories" value="LOWEST" />
        </Picker>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};
export default RepositoryList;
