import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultText: ""
    };
  }
  calculateResult() {
    const text = this.state.resultText;
    // now parse this text eg: 3*4^5-4/14+3
  }
  buttonPressed(text) {
    console.log(text);
    if (text == "=") {
      return calculateResult(this.state.resultText);
    }
    this.setState({
      resultText: this.state.resultText + text
    });
  }
  operate(operation) {
    switch (operation) {
      case "DEL":
        let text = this.state.resultText.split("");
        text.pop();

        this.setState({
          resultText: text.join('')
        });
    }
  }

  render() {
    let rows = [];
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [".", 0, "="]];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}
            key={`btn-${j}`}
          >
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View style={styles.row} key={`row-${i}`}>
          {row}
        </View>
      );
    }
    let operations = ["DEL", "+", "-", "*", "/"];
    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          key={`op-${i}`}
          onPress={() => this.operate(operations[i])}
        >
          <Text style={[styles.btnText, styles.white]}>{operations[i]}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}> {this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>121</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultText: {
    fontSize: 30,
    color: "white"
  },
  white: {
    color: "white"
  },
  btnText: {
    fontSize: 30
  },
  calculationText: {
    fontSize: 24,
    color: "white"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  btn: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center"
  },
  result: {
    flex: 2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  calculation: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  buttons: { flex: 7, flexDirection: "row" },
  numbers: { flex: 3, backgroundColor: "yellow" },
  operations: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "black"
  }
});
