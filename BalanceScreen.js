import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  _Text,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import colors from "./colors";
import tempData3 from "./tempData3";
import AddBalanceItemModal from "./AddBalanceItemModal";
import { color } from "react-native-reanimated";

class HomeScreen extends React.Component {
  state = {
    addBalanceItemVisible: false,
    items: tempData3,
  };

  toggleaddBalanceItemModal() {
    this.setState({
      addBalanceItemVisible: !this.state.addBalanceItemVisible,
    });
  }

  renderList = (item) => {
    return <Text>{item.name}</Text>;
  };

  addList = (list) => {
    this.setState({
      items: [
        ...this.state.items,
        { ...list, id: this.state.items.length + 1 },
      ],
    });
  };

  updateList = (list) => {
    this.setState({
      items: this.state.items.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  renderItem = (shopItem, index) => {
    return (
      <View style={styles.listContainer}>
        <Icon
          name={this.state.items[index].icon}
          size={26}
          color={shopItem.sum > 0 ? colors.green : colors.red}
          style={{ width: 32 }}
        />

        <Text
          style={[
            styles.shopItem,
            {
              color: shopItem.sum > 0 ? colors.green : colors.red,
              paddingHorizontal: 10,
              flex: 1,
            },
          ]}
        >
          {shopItem.sum}
        </Text>

        <Text
          style={[
            styles.shopItem,
            {
              color: colors.black,
              flex: 3,
            },
          ]}
        >
          {shopItem.name}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* To jest komponent do dodawnia listy */}

        <Modal
          animationType="slide"
          visible={this.state.addBalanceItemVisible}
          onRequestClose={() => this.toggleaddBalanceItemModal()}
        >
          <AddBalanceItemModal
            closeModal={() => this.toggleaddBalanceItemModal()}
            addList={this.addList}
          />
        </Modal>

        {/* To jest sekcja tytułu */}

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Budget{" "}
            <Text style={{ fontWeight: "300", color: colors.pink }}> Sum </Text>
          </Text>
          <View style={styles.divider} />
        </View>

        {/* To jest guzik wysuwający dodawanie listy */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 32,
              color:
                this.state.items
                  .map((datum) => datum.sum)
                  .reduce((a, b) => a + b) > 0
                  ? colors.green
                  : colors.red,
            }}
          >
            {this.state.items.map((datum) => datum.sum).reduce((a, b) => a + b)}
          </Text>

          <View
            style={{
              alignItems: "center",
              marginVertical: 48,
              paddingLeft: 20,
            }}
          >
            <TouchableOpacity
              style={styles.addItem}
              onPress={() => this.toggleaddBalanceItemModal()}
            >
              <AntDesign name="plus" size={30} color={colors.lightBlue} />
            </TouchableOpacity>
          </View>
        </View>

        {/* To jest wyświetlanie list */}

        <View style={{ height: 275, paddingLeft: 32, width: "100%" }}>
          <FlatList
            data={this.state.items}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.purple,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 32,
  },
  addItem: {
    borderWidth: 2,
    borderColor: colors.blue,
    borderRadius: 40,
    backgroundColor: colors.blue,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  shopItem: {
    fontSize: 18,
  },
  listContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
});

export default HomeScreen;
