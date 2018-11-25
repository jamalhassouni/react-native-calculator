import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultText: "",
      calculationText: 0,
      resultTextStyle: { fontSize: 30 },
      operations: ["DEL", "+", "-", "*", "/"]
    };
  }
  calculateResult() {
    const text = this.state.resultText;
    // now parse this text eg: 3*4^5-4/14+3
    if (text != "") {
      this.setState({
        resultText: String(eval(text)),
        resultTextStyle: { fontSize: 40, fontWeight: "300" },
        calculationText: ""
      });
    } else {
      this.setState({ calculationText: 0 });
    }
  }
  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case "+":
      case "-":
      case "*":
      case "/":
        return false;
    }
    return true;
  }

  buttonPressed(text) {
    if (text == "=") {
      this.setState({ operations: ["CLR", "+", "-", "*", "/"] });
      return this.validate() && this.calculateResult();
    }
    this.setState({
      resultText: this.state.resultText + text,
      operations: ["DEL", "+", "-", "*", "/"],
      calculationText: eval(this.state.resultText + text),
      calculationTextStyle: {
        fontSize: 20,
        color: "#636363",
        fontWeight: "100"
      }
    });
  }
  operate(operation) {
    switch (operation) {
      case "DEL":
        let text = this.state.resultText.split("");
        text.pop();

        this.setState({
          resultText: text.join("")
        });
        break;
      case "CLR":
        this.setState({
          resultText: "",
          calculationText: 0
        });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        const lastChar = this.state.resultText.split("").pop();
        if (this.state.operations.indexOf(lastChar) > 0) return;

        if (this.state.text == "") return;
        this.setState({
          resultText: this.state.resultText + operation
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
            key={`btn-${nums[i][j]}`}
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
    let ops = [];
    for (let i = 0; i < this.state.operations.length; i++) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          key={`op-${i}`}
          onPress={() => this.operate(this.state.operations[i])}
        >
          <Text style={[styles.btnText, styles.white]}>
            {this.state.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={[styles.resultText, this.state.resultTextStyle]}>
            {" "}
            {this.state.resultText}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text
            style={[styles.calculationText, this.state.calculationTextStyle]}
          >
            {this.state.calculationText}
          </Text>
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
    color: "black"
  },
  white: {
    color: "white"
  },
  btnText: {
    fontSize: 30,
    color: "white"
  },
  calculationText: {
    fontSize: 24,
    color: "black"
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  calculation: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  buttons: { flex: 7, flexDirection: "row" },
  numbers: { flex: 3, backgroundColor: "#434343" },
  operations: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "#636363"
  }
});
