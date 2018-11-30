import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Key from "./components/Key";

// We are using math.js library to calculate results from any string expression

const math = require("mathjs");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultTextStyle: { fontSize: 30 },
      operations: ["+", "-", "*", "/"],
      brackets: ["(", ")"],
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      lastexpression: [],
      expression: "",
      result: ""
    };
    this._assembleExpression = this._assembleExpression.bind(this);
    this._calculateResult = this._calculateResult.bind(this);
    this._rollbackExpression = this._rollbackExpression.bind(this);
    this._echoSymbol = this._echoSymbol.bind(this);
    this._clearExpression = this._clearExpression.bind(this);
  }
  _echoSymbol(symbol) {
    if (symbol === "=") {
      this._calculateResult();
    } else if (symbol === "DEL") {
      this._rollbackExpression();
    } else if (symbol === "CLR") {
      this._clearExpression();
    } else {
      this._assembleExpression(symbol);
    }
  }
  _clearExpression() {
    this.state.expression &&
      this.setState({
        expression: "",
        lastexpression: [],
        result: 0
      });
  }
  _rollbackExpression() {
    let newExperssion = this.state.lastexpression.pop();
    let result = this.state.result;
    try {
      result = math.eval(newExperssion.join(""));
      this.setState(prevState => ({
        lastexpression:  prevState.lastexpression,
        expression: newExperssion,
        result: result
      }));
    } catch (e) {
      newExperssion =  newExperssion.split("");
      let lastChar = newExperssion[newExperssion.length - 1];
      if (this.state.operations.indexOf(lastChar) > -1) {
        console.log("equal");
        result = 0; // math.eval(arr.join(""));
      } else {
        //lastChar = arr.pop();
        console.log("not equal");
        result = 1; //math.eval(arr.join(""));
      }
    }
    this.setState(prevState => ({
      expression: prevState.lastexpression.pop(),
      lastexpression: prevState.lastexpression,
      result: result
    }));
  }

  _assembleExpression(symbol) {
    let newExperssion;
    let result = this.state.result;
    try {
      result = math.eval(this.state.expression + symbol);
      this.setState(prevState => ({
        lastexpression: [...prevState.lastexpression, prevState.expression],
        expression: prevState.expression + symbol,
        result: result
      }));
    } catch (e) {
      newExperssion = this.state.expression && this.state.expression.split("");
      let lastChar = newExperssion[newExperssion.length - 1];
      if (
        this.state.operations.indexOf(symbol) > -1 &&
        this.state.operations.indexOf(lastChar) > -1
      ) {
        newExperssion[newExperssion.length - 1] = symbol;
        result = newExperssion.slice(0, newExperssion.length - 1).join("");
        result = math.eval(result);
      } else if (
        this.state.operations.indexOf(symbol) > -1 &&
        lastChar != "(" &&
        this.state.numbers.includes(Number(symbol))
      ) {
        newExperssion.push(symbol);
        newExperssion[newExperssion.length - 1] = symbol;
        result = newExperssion.slice(0, newExperssion.length - 1).join("");
        result = math.eval(result);
      } else {
        if (typeof newExperssion != "string") {
          newExperssion.push(symbol);
        } else {
          newExperssion = this.state.expression + symbol;
          newExperssion = newExperssion.split("");
        }
      }
      this.setState(prevState => ({
        lastexpression: [...prevState.lastexpression, newExperssion.join("")],
        expression: newExperssion.join(""),
        result: result
      }));
    }
  }

  _calculateResult() {
    let result;
    try {
      result = math.eval(this.state.expression);
    } catch (e) {
      result = "Syntax Error";
    }
    this.setState({
      result: "",
      expression: result,
      resultTextStyle: { fontSize: 40, fontWeight: "300" }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={[styles.resultText, this.state.resultTextStyle]}>
            {" "}
            {this.state.expression}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text
            style={[styles.calculationText, this.state.calculationTextStyle]}
          >
            {this.state.result}
          </Text>
        </View>

        <View style={styles.buttons}>
          <View style={styles.numbers}>
            <View style={styles.numgroup}>
              <Key symbol={"1"} echoSymbol={this._echoSymbol} />
              <Key symbol={"2"} echoSymbol={this._echoSymbol} />
              <Key symbol={"3"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key symbol={"4"} echoSymbol={this._echoSymbol} />
              <Key symbol={"5"} echoSymbol={this._echoSymbol} />
              <Key symbol={"6"} echoSymbol={this._echoSymbol} />
              <Key symbol={"7"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key symbol={"8"} echoSymbol={this._echoSymbol} />
              <Key symbol={"9"} echoSymbol={this._echoSymbol} />
              <Key symbol={"0"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key symbol={"."} echoSymbol={this._echoSymbol} />
              <Key symbol={","} echoSymbol={this._echoSymbol} />
              <Key symbol={"="} echoSymbol={this._echoSymbol} />
            </View>
          </View>
          <ScrollView
            style={styles.other}
            contentContainerStyle={styles.contentContainerStyle}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.numgroup}>
              <Key
                op={true}
                backgroundColor="#ff7675"
                symbol={"CLR"}
                echoSymbol={this._echoSymbol}
              />
            </View>
            <View style={styles.numgroup}>
              <Key op={true} symbol={"DEL"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key op={true} symbol={"/"} echoSymbol={this._echoSymbol} />
              <Key op={true} symbol={"+"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key op={true} symbol={"-"} echoSymbol={this._echoSymbol} />
              <Key op={true} symbol={"*"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key op={true} symbol={"^"} echoSymbol={this._echoSymbol} />
              <Key op={true} symbol={"sin"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key op={true} symbol={"cos"} echoSymbol={this._echoSymbol} />
              <Key op={true} symbol={"tan"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key op={true} symbol={"("} echoSymbol={this._echoSymbol} />
              <Key op={true} symbol={")"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key op={true} symbol={"log"} echoSymbol={this._echoSymbol} />
              <Key op={true} symbol={"pow"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key op={true} symbol={"pi"} echoSymbol={this._echoSymbol} />
              <Key op={true} symbol={"sqrt"} echoSymbol={this._echoSymbol} />
            </View>
          </ScrollView>
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
  numgroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttons: { flex: 7, flexDirection: "row" },
  numbers: { flex: 3, backgroundColor: "#434343" },
  other: {
    flex: 1,
    backgroundColor: "#4f9a94"
  },
  contentContainerStyle: {
    backgroundColor: "red"
  }
});
