import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flexContainer: {
    //Flex Container
    display: "flex",
  },
  flexItemA: {
    //Flex Item
    flexGrow: 0,
    backgroundColor: "green",
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: "blue",
  },
});
//Если flexGrow: 1 у всех элементов, пространство делится поровну.
//Если flexGrow: 0, элемент занимает только столько места, сколько нужно его
//Если flexGrow: 1 у всех элементов, пространство делится поровну.
//Если flexGrow: 0, элемент занимает только столько места, сколько нужно его
const FlexboxExample = () => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <Text>Flex item A</Text>
      </View>
      <View style={styles.flexItemB}>
        <Text>Flex item B</Text>
      </View>
    </View>
  );
};
export default FlexboxExample;
