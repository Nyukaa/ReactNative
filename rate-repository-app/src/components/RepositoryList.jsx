import { useState } from "react";
import { Text, TextInput } from "react-native";
import useRepositories from "../hooks/useRepositories";
import { useDebounce } from "use-debounce";

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  //  debounce the search keyword to avoid excessive re-rendering
  //  for  delay the execution 500 milliseconds after the user stops typing
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  //  order state to manage sorting of repositories
  const [order, setOrder] = useState({
    orderBy: "CREATED_AT", //what field to sort by
    orderDirection: "DESC", //how to sort (descending or ascending)
  });

  const { repositories, loading, error } = useRepositories({
    ...order,
    searchKeyword: debouncedSearchKeyword,
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <RepositoryListContainerWithNavigate
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker"; // for dropdown menu
import React from "react";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  handleOrderChange = (value) => {
    const { setOrder } = this.props;

    if (value === "LATEST")
      setOrder({ orderBy: "CREATED_AT", orderDirection: "DESC" });

    if (value === "HIGHEST")
      setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });

    if (value === "LOWEST")
      setOrder({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
  };

  renderHeader = () => {
    const { order, searchKeyword, setSearchKeyword } = this.props;

    return (
      <>
        <TextInput
          placeholder="Search repositories"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          style={{
            padding: 10,
            backgroundColor: "white",
            marginBottom: 10,
          }}
        />

        <Picker
          selectedValue={
            order.orderBy === "CREATED_AT"
              ? "LATEST"
              : order.orderDirection === "DESC"
              ? "HIGHEST"
              : "LOWEST"
          }
          onValueChange={this.handleOrderChange}
        >
          <Picker.Item label="Latest repositories" value="LATEST" />
          <Picker.Item label="Highest rated repositories" value="HIGHEST" />
          <Picker.Item label="Lowest rated repositories" value="LOWEST" />
        </Picker>
      </>
    );
  };

  render() {
    const { repositories } = this.props;
    const navigate = this.props.navigate;

    return (
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
      />
    );
  }
}
export const RepositoryListContainerWithNavigate = (props) => {
  const navigate = useNavigate();
  return <RepositoryListContainer {...props} navigate={navigate} />;
};
export default RepositoryList;
