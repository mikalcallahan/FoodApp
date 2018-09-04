import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation'
import Settings from './Settings.js'
import Swipe, { SwipeStack } from './Swipe.js'
import Saved from './Saved.js'
import RestaurantProfile from './RestaurantProfile.js'
// import { configureFontAwesomePro } from "react-native-fontawesome-pro"

export default DefaultNav = TabNavigator (
  {
    Swipe: { 
      screen: Swipe,
    },
    Saved: {
      screen: Saved,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    initialRouteName: 'Swipe',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
      },
    }),
    tabBarOptions: {
      activeTintColor: '#8BB6E9',
      activeBackgroundColor: '#fff',
      inactiveTintColor: 'grey',
      inactiveBackgroundColor: '#fff',
    },
    style: {
      backgroundColor: '#ffffff',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)
