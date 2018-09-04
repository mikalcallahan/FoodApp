/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Button,
  Platform,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation'
import { SettingsScreen } from './screens/Settings.js'
import { StarredScreen } from './screens/Starred.js'
// import { RestaurantProfileScreen } from './screens/RestaurantProfile.js'

let cards = 
  {
    'id': 0,
    'image': null,
    'name': 'Kettle Coffee & Tea',
    'desc': 'Local coffee with a vibe',
    'saved': 'getSaved()'
  }
var restaurantTitle = 'Default Title'

type Props = {};
class SwipeScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Swipe n Dine',
  }
  render() {
    return (
      <View id='card-container' style={styles.container}>
        /* <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate('RestaurantProfile', {
              itemId: 24,
              newTitle: restaurantTitle,
            })
          }}
        >
          <Image
            source={require('./images/kettle.png')}
          />
        </TouchableHighlight>
      */
        <Text>
          { cards.name }
        </Text>
        <Text>
          {cards.desc }
        </Text>
        <Button
          title='Get to swipin'
          onPress={() => { 
            this.props.navigation.navigate('Settings', {
              itemId: 29,
              newTitle: 'Settings',
            })
          }}
        /> 
      </View>
    )
  }
}
      // <RootStack />;
      /*
       <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Swipe n Dine
        </Text>
      </View>
      */
// to change back to StackNavigator change all instances of TabNavigator to StackNavigator
//export default RootStack = TabNavigator (
const SwipeStack = StackNavigator ({
  // RestaurantProfile: { screen: RestaurantProfileScreen },
  Swipe: { screen: SwipeScreen },
})

const ProfileStack = StackNavigator ({
    // RestaurantProfile: { screen: RestaurantProfileScreen },
    Swipe: { screen: SwipeScreen },
})

export default TabNavigator (
  {
    Settings: { 
      screen: SettingsScreen,
    },
    Swipe: {
      screen: SwipeScreen,
    },
    Starred: {
      screen: StarredScreen,
    },
  },
  {
    initialRouteName: 'Swipe',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#8BB6E9',
      inactiveTintColor: 'grey',
    },
    tabBarComponent: TabBarBottom,
    // tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)

      // headerStyle: {
       //  backgroundColor: '#f9f9f9',
      //},
      // headerTintColor: '#fff',
      //headerTitleStyle: {
       // color: '#080808',
       // fontWeight: 'bold',
     // },
//    },
//  }
// );

/*
export default StackNavigator({
  Home: {
    screen: Swipe,
  },
});
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
