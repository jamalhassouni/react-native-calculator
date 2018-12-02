import React from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

export default class Key extends React.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }
  _onPress() {
    this.props.echoSymbol(this.props.symbol);
  }
  renderIconOrStirng = () => {
    if (this.props.setIcon) {
      switch (this.props.iconType) {
        case "Feather":
          return <Feather name={this.props.name} size={22} color="white" />;
        case "MaterialIcons":
          return (
            <MaterialIcons name={this.props.name} size={22} color="white" />
          );
        case "MaterialCommunityIcons":
          return (
            <MaterialCommunityIcons
              name={this.props.name}
              size={22}
              color="white"
            />
          );
      }
    } else {
      return this.props.symbol;
    }
  };
  render() {
    const back = this.props.backgroundColor || "#4f9a94";
    return (
      <TouchableHighlight
        style={
          this.props.op ? [styles.key, { backgroundColor: back }] : styles.key
        }
        onPress={this._onPress}
      >
        <View>
          <Text style={[styles.keytext, this.props.op && styles.opkeytext]}>
            {this.renderIconOrStirng()}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  key: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    width: 60,
    height: 60
  },
  keytext: {
    fontSize: 20,
    color: "#ffffff"
  },
  opkey: {
    marginRight: 10
  },
  opkeytext: {
    color: "#ffffff"
  }
});
