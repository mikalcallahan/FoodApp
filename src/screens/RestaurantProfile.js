import React, { Component } from 'react';
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
import Swipe from './Swipe.js'
// import { SettingsScreen } from './Settings.js'
// import { StarredScreen } from './Starred.js'

var restaurantTitle = 'Default Title'

export default class RestaurantProfile extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      // restaurant = {},
      error: null
    }
  }
  static navigationOptions = ({ navigation }) => {
    // const { params } this.props.navigation.state
    const { params } = navigation.state
    return {
      title: params ? params.restaurantInfo.name: 'Restaurant Name',
    }
  }
  render () {
    return (
      <View Style={styles.container}>
        <Text>
          This is a tet
        </Text>
        <Button
          title='Back to Swipe'
          onPress={() => {
            this.props.navigation.navigate('Swipe', {
              itemId: 24,
              newTitle: 'Swipe'
            })
          }}
        />
      </View>
    )
  }
}
  /*
export const HomeStack = StackNavigator({
  Swipe: { 
    screen: Swipe,
    navigationOptions: {
      title: 'Swipe n Dine',
    },
  },
  RestaurantProfile: { 
    screen: RestaurantProfile,
    navigationOptions: {
      title: 'Restaurant Name',
    },
  },
})
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
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
});

