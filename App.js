import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.result} />
        <View style={styles.calculation} />
        <View style={styles.buttons}>
          <View style={styles.numbers} />
          <View style={styles.operations} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  result: { flex: 2, backgroundColor: "red" },
  calculation: { flex: 1, backgroundColor: "green" },
  buttons: { flex: 7, flexDirection: "row" },
  numbers: { flex: 3, backgroundColor: "yellow" },
  operations: { flex: 1, backgroundColor: "black" }
});
