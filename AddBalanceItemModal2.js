import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import colors from "./colors";

class AddBalanceItemModal extends React.Component {
  icons = [
    "bank",
    "book",
    "dog-side",
    "shopping",
    "car",
    "laptop",
    "washing-machine",
    "food",
    "movie",
  ];

  state = {
    name: "",
    icon: this.icons[0],
    sum: 0.0,
  };

  createToDo = () => {
    const { name, icon, sum } = this.state;

    const list = { name, icon, sum };

    this.props.addList(list);

    this.setState({ name: "" });
    this.props.closeModal();
  };

  renderIcons() {
    return this.icons.map((icon) => {
      return (
        <TouchableOpacity
          key={icon}
          style={[
            styles.colorSelect,
            {
              backgroundColor:
                this.state.icon === icon ? "#ddf7ad" : colors.white,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={() => this.setState({ icon })}
        >
          <Icon name={icon} size={32} color={colors.pink} />
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}> Add item to the list!</Text>

          <TextInput
            style={styles.input}
            placeholder="Transaction name?"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Value?"
            onChangeText={(text) =>
              this.setState({
                sum: -Number(text),
              })
            }
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            {this.renderIcons()}
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: colors.red }]}
            onPress={this.createToDo}
          >
            <Text style={{ color: colors.white, fontWeight: "600" }}>
              Add item!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default AddBalanceItemModal;
