import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

export default class Key extends React.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);

  }
  _onPress() {
    this.props.echoSymbol(this.props.symbol);
  }

  render() {
    const back= this.props.backgroundColor || '#4f9a94';

    return (
      <TouchableHighlight
        style={this.props.op ? [styles.key,{backgroundColor:back}] : styles.key}
        onPress={this._onPress}>
        <View>
          <Text style={[styles.keytext, this.props.op && styles.opkeytext]}>
            {this.props.symbol}
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
    height: 60,
  },
  keytext: {
    fontSize: 20,
    color: '#ffffff',
  },
  opkey: {
    marginRight: 10,
  },
  opkeytext: {
    color: '#ffffff',
  },
});