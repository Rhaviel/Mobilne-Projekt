import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "./colors";
import ToDoModal from "./ToDoModal";

class ToDoList extends React.Component {
  state = {
    showListVisible: false,
  };

  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }
  render() {
    const item = this.props.item;

    const completedCount = item.todos.filter((todo) => todo.completed).length;
    const remainingCount = item.todos.length - completedCount;

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <ToDoModal
            item={item}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: item.color }]}
          onPress={() => this.toggleListModal()}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {item.name}
          </Text>

          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}> {remainingCount} </Text>
              <Text style={styles.subtitle}> Remaining </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}> {completedCount} </Text>
              <Text style={styles.subtitle}> Completed </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 40,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});

export default ToDoList;
