import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SwipeScreen } from './Swipe.js'
import { SavedScreen } from './Saved.js'
// import { RestaurantProfileScreen } from './RestaurantProfile.js'
import styles from './styleSettings.js'

let userSettings = 
  {
    unit: 'imperial',
  }

export default class Settings extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      userSettings: {unit: 'imperial'}
    }
  }

  setLocationFilter () {
  
  }

  setDistanceFilter () {

  }

  getUserPreferences() {
    alert('it work')
    // return this.userSettings
  }

  static navigationOptions = ( { navigation } ) => {
    const { params } = navigation.state;
    return {
      title: params ? params.newTitle: 'Settings',
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Location: My Location
        </Text>
        <Text style={styles.welcome}>
          Distance: My Distance
        </Text>
        <Text style={styles.welcome}>
        {`
          Contact Us:
          Customer Support
          Business Support
        `}
        </Text>
        <Text style={styles.instructions}>
        {`
          Reset:
          clear cache
          reset swipes
          delete account
        `}
        </Text>
      </View>
    );
  }
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
*/
