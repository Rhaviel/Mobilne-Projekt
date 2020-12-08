import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";

import BottomNavigation, {
  FullTab,
} from "react-native-material-bottom-navigation";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import HomeScreen from "./HomeScreen";
import ShoppingScreen from "./ShoppingScreen";
import BalanceScreen from "./BalanceScreen";
import colors from "./colors";

export default class App extends Component {
  state = {
    activeTab: "HomeScreen",
  };

  tabs = [
    {
      key: "HomeScreen",
      icon: "format-list-checks",
      label: "To-Do",
      barColor: colors.lightBlue,
      pressColor: "rgba(255, 255, 255, 0.16)",
    },
    {
      key: "ShoppingScreen",
      icon: "shopping",
      label: "Shopping",
      barColor: colors.yellow,
      pressColor: "rgba(255, 255, 255, 0.16)",
    },
    {
      key: "BalanceScreen",
      icon: "bank",
      label: "Balance",
      barColor: colors.pink,
      pressColor: "rgba(255, 255, 255, 0.16)",
    },
  ];

  renderIcon = (icon) => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  );

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.state.activeTab === "HomeScreen" && <HomeScreen />}
          {this.state.activeTab === "ShoppingScreen" && <ShoppingScreen />}
          {this.state.activeTab === "BalanceScreen" && <BalanceScreen />}
        </View>
        <BottomNavigation
          activeTab={this.state.activeTab}
          onTabPress={(newTab) => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    );
  }
}
