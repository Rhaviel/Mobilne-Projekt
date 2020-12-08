import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import colors from "./colors";

export default class ToDoModal extends React.Component {
  state = {
    newToDo: "",
  };

  toggleToDoCompleted = (index) => {
    let item = this.props.item;
    item.todos[index].completed = !item.todos[index].completed;

    this.props.updateList(item);
  };

  renderToDo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleToDoCompleted(index)}>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={colors.lightGrey}
            style={{ width: 32 }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? colors.lightGray : colors.black,
            },
          ]}
        >
          {todo.title}
        </Text>
      </View>
    );
  };

  addToDo = () => {
    let item = this.props.item;
    item.todos.push({ title: this.state.newToDo, completed: false });

    this.props.updateList(item);
    this.setState({ newToDo: "" });

    Keyboard.dismiss();
  };

  render() {
    const item = this.props.item;
    const taskCount = item.todos.length;
    const completedCount = item.todos.filter((todo) => todo.completed).length;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaView
        //style={styles.container}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 70,
              right: 32,
              zIndex: 11,
              backgroundColor: colors.white,
            }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={colors.black} />
          </TouchableOpacity>

          <View style={[styles.section, styles.header, { zIndex: 10 }]}>
            <View
              style={{
                backgroundColor: colors.white,
              }}
            >
              <Text style={styles.title}>{item.name}</Text>
              <Text
                style={[styles.taskCount, { borderBottomColor: item.color }]}
              >
                {completedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>

          <View styles={[styles.section, { flex: 3 }]}>
            <FlatList
              data={item.todos}
              renderItem={({ item, index }) => this.renderToDo(item, index)}
              keyExtractor={(item) => item.title}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 84,
                //backgroundColor: colors.white,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: item.color }]}
              placeholder="New Task?"
              onChangeText={(text) => this.setState({ newToDo: text })}
              value={this.state.newToDo}
            />
            <TouchableOpacity
              style={[styles.addToDo, { backgroundColor: item.color }]}
              onPress={() => this.addToDo()}
            >
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    //justifyContent: "flex-end",
    paddingLeft: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
    borderBottomWidth: 4,
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    marginTop: -30,
  },
  input: {
    flex: 5,
    height: 48,
    width: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  addToDo: {
    flex: 1,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
