import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Key from "./components/Key";

// We are using math.js library to calculate results from any string expression

const math = require("mathjs");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expressionTextStyle: { fontSize: 30 },
      operations: ["+", "-", "*", "/"],
      brackets: ["(", ")"],
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      lastexpression: [],
      expression: "",
      result: "",
      historyExpression: ""
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
    } else if (symbol === "C") {
      this._clearExpression();
    } else if (symbol == "H") {
      this.setState(prevState => ({
        expression: prevState.historyExpression
      }));
    } else {
      this._assembleExpression(symbol);
    }
  }
  // method to reset state
  _clearExpression() {
    this.state.expression &&
      this.setState({
        expression: "",
        lastexpression: [],
        result: 0
      });
  }
  // Performing calculations while deleting the last item
  _rollbackExpression() {
    if (this.state.expression !== "") {
      let result = this.state.result;
      let regex = /[A-Za-z√(]+|\d+|[)]|[+-/*^]|[π]/gm;
      let preLastSecond;
      // convert expression to array
      let newExperssion = this.state.expression.toString().match(regex);
      // remove space form  array
      newExperssion = newExperssion.filter(e => e.trim() !== "");
      newExperssion = newExperssion.slice(0, newExperssion.length - 1);
      // try to calculate new expression
      try {
        result = math.eval(
          newExperssion
            .join("")
            .replace("log", "log10")
            .replace("π", "pi")
            .replace("√", "sqrt")
        );
      } catch (e) {
        // get last character
        let lastChar = newExperssion[newExperssion.length - 1];
        // check if  last character in operation array
        if (this.state.operations.indexOf(lastChar) > -1) {
          // get  pre-last second  charachter
          preLastSecond = newExperssion[newExperssion.length - 3];
          // if pre-last second  charachter equal  "(" add  ")" in last  string
          if (preLastSecond == "(") {
            result =
              newExperssion.slice(0, newExperssion.length - 1).join("") + ")";
            //  calculate string result
            result = result.replace("log", "log10");
            result = result.replace("π", "pi");
            result = result.replace("√", "sqrt");
            result = math.eval(result);
          } else {
            result = newExperssion.slice(0, newExperssion.length - 1).join("");
            try {
              result = result.replace("log", "log10");
              result = result.replace("π", "pi");
              result = result.replace("√", "sqrt");
              result = math.eval(result);
            } catch (e) {
              console.log("ReferenceError: ", e);
            }
          }
        } else {
          // if last charcter in  brackets array and  last character  not a number
          if (
            !(this.state.brackets.indexOf(lastChar) > -1) &&
            !this.state.numbers.includes(Number(lastChar))
          ) {
            result = newExperssion.slice(0, newExperssion.length - 1).join("");
            try {
              //  calculate string result
              result = result.replace("log", "log10");
              result = result.replace("π", "pi");
              result = result.replace("√", "sqrt");
              result = math.eval(result);
            } catch (e) {
              console.log("ReferenceError: ", e);
            }
          }
        }
      }
      // update state with new  values
      this.setState(prevState => ({
        lastexpression: prevState.lastexpression,
        expression: newExperssion.join(""),
        result: result
      }));
    }
  }
  // adding symbol and using live  calculations
  _assembleExpression(symbol) {
    let newExperssion;
    let result = this.state.result;
    try {
      expression = this.state.expression + symbol;
      expression = expression.replace("log", "log10");
      expression = expression.replace("π", "pi");
      expression = expression.replace("√", "sqrt");
      result = math.eval(expression);
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
        result = result.replace("log", "log10");
        result = result.replace("π", "pi");
        result = result.replace("√", "sqrt");
        result = math.eval(result);
      } else if (
        this.state.operations.indexOf(symbol) > -1 &&
        lastChar != "(" &&
        this.state.numbers.includes(Number(symbol))
      ) {
        newExperssion.push(symbol);
        newExperssion[newExperssion.length - 1] = symbol;
        result = newExperssion.slice(0, newExperssion.length - 1).join("");
        result = result.replace("log", "log10");
        result = result.replace("π", "pi");
        result = result.replace("√", "sqrt");
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
  /* when clicking on symbol = calculate the results
   and update state
  */
  _calculateResult() {
    let result;
    try {
      result = math.eval(
        this.state.expression
          .replace("log", "log10")
          .replace("π", "pi")
          .replace("√", "sqrt")
      );
    } catch (e) {
      result = "Syntax Error";
    }
    this.setState(prevState => ({
      result: "",
      expression: result,
      historyExpression: prevState.expression,
      expressionTextStyle: { fontSize: 40, fontWeight: "300" }
    }));
  }

  render() {
    let { expressionTextStyle } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={[styles.resultText, expressionTextStyle]}>
            {this.state.expression}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.result}</Text>
        </View>

        <View style={styles.buttons}>
          <View style={styles.numbers}>
            <View style={styles.numgroup}>
              <Key
                setIcon={true}
                name="history"
                iconType="MaterialIcons"
                symbol={"H"}
                echoSymbol={this._echoSymbol}
              />
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
                symbol={"C"}
                echoSymbol={this._echoSymbol}
              />
            </View>
            <View style={styles.numgroup}>
              <Key
                op={true}
                setIcon={true}
                name="delete"
                iconType="Feather"
                backgroundColor="#3e3e3e"
                symbol={"DEL"}
                echoSymbol={this._echoSymbol}
              />
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
              <Key
                op={true}
                setIcon={true}
                iconType="MaterialCommunityIcons"
                name="exponent"
                symbol={"^"}
                echoSymbol={this._echoSymbol}
              />
              <Key
                op={true}
                symbol={"sin"}
                echoSymbol={() => this._echoSymbol("sin(")}
              />
            </View>
            <View style={styles.numgroup}>
              <Key
                op={true}
                symbol={"cos"}
                echoSymbol={() => this._echoSymbol("cos(")}
              />
              <Key
                op={true}
                symbol={"tan"}
                echoSymbol={() => this._echoSymbol("tan(")}
              />
            </View>
            <View style={styles.numgroup}>
              <Key op={true} symbol={"("} echoSymbol={this._echoSymbol} />
              <Key op={true} symbol={")"} echoSymbol={this._echoSymbol} />
            </View>
            <View style={styles.numgroup}>
              <Key
                op={true}
                symbol={"log"}
                echoSymbol={() => this._echoSymbol("log(")}
              />
              <Key
                op={true}
                setIcon={true}
                name="pi"
                iconType="MaterialCommunityIcons"
                symbol={"pi"}
                echoSymbol={() => this._echoSymbol("π")}
              />
            </View>
            <View style={styles.numgroup}>
              <Key
                op={true}
                setIcon={true}
                name="square-root"
                iconType="MaterialCommunityIcons"
                symbol={"sqrt"}
                echoSymbol={() => this._echoSymbol("√(")}
              />
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
  }
});
