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
import tempData2 from "./tempData2";
import ToDoList from "./ToDoList";
import AddShoppingItemModal from "./AddShoppingItemModal";
import { color } from "react-native-reanimated";

class HomeScreen extends React.Component {
  state = {
    addShoppingItemVisible: false,
    items: tempData2,
  };

  toggleAddShoppingItemModal() {
    this.setState({
      addShoppingItemVisible: !this.state.addShoppingItemVisible,
    });
  }

  //   Tę funkcję trzeba zmienić z textu
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

  toggleItemBought = (index) => {
    let items = this.state.items;
    items[index].completed = !items[index].completed;
    if (items[index].completed) items.push(items.splice(index, 1)[0]);
    else items.splice(0, 0, items.splice(index, 1)[0]);

    this.updateList(items);
  };

  renderItem = (shopItem, index) => {
    return (
      <View style={styles.listContainer}>
        <Icon
          name={this.state.items[index].icon}
          size={26}
          color={colors.orange}
          style={{ width: 32 }}
        />
        <TouchableOpacity onPress={() => this.toggleItemBought(index)}>
          <Icon
            name={shopItem.completed ? "check-circle" : "check-circle-outline"}
            size={24}
            color={colors.lightGrey}
            style={{ width: 32 }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.shopItem,
            {
              textDecorationLine: shopItem.completed ? "line-through" : "none",
              color: shopItem.completed ? colors.lightGray : colors.black,
              // : this.state.items[index].color works,
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
          visible={this.state.addShoppingItemVisible}
          onRequestClose={() => this.toggleAddShoppingItemModal()}
        >
          <AddShoppingItemModal
            closeModal={() => this.toggleAddShoppingItemModal()}
            addList={this.addList}
          />
        </Modal>

        {/* To jest sekcja tytułu */}

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Shopping{" "}
            <Text style={{ fontWeight: "300", color: colors.yellow }}>
              {" "}
              List{" "}
            </Text>
          </Text>
          <View style={styles.divider} />
        </View>

        {/* To jest guzik wysuwający dodawanie listy */}

        <View style={{ alignItems: "center", marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addItem}
            onPress={() => this.toggleAddShoppingItemModal()}
          >
            <AntDesign name="plus" size={30} color={colors.yellow} />
          </TouchableOpacity>
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
    backgroundColor: colors.orange,
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
    borderColor: colors.red,
    borderRadius: 40,
    backgroundColor: colors.red,
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
