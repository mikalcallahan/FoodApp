// all the necessisary imports
import React, { Component } from 'react';
import {
  AsyncStorage,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { SettingsScreen } from './Settings.js'
import { SwipeScreen } from './Swipe.js'
import styles from './styleSaved.js' 

// Global variables
let apiKey = 'Bearer C4Mtn5GZuZF5m5uRrdZstuYFRIcb1WKaoBT6bckhZN-5NMDyXbwsob1W3JbhhKId83orCeLQZ1MXqAc-UsVUkcqCKYSy7a4LZEI6j_nCwSK2jZTVEi5xFp4okAy8WnYx'
var asyncStorage

type Props = {};
export default class Saved extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      currentRestaurant: [], // initiate currentRestaurant 
      savedRestaurants: [], // initiate savedRestaurants array in state
    }
  }

  /* On mount populate savedRestaurants list from async storage */
  async componentDidMount () {
    try {
      asyncStorage = await AsyncStorage.getItem('@restaurants')
      this.setState({
        savedRestaurants: asyncStorage // set restaurant list
      },function() {
        this._getSavedRestaurants()
      })
    } catch ( error ) {
      // alert ( 'error getting AsyncStorage' )
    }
  }
  

  /*
   * Used to get restaurant information from restaurant id
   *
   */
  _getSavedRestaurants () {
    var restaurant = []
    if(asyncStorage != null) {
      var restaurantIdList = JSON.parse(asyncStorage)
      var url = 'https://api.yelp.com/v3/businesses/'
      var restaurantList = []
      // alert (restaurantIdList.length)
      for ( var i=1; i<restaurantIdList.length; i++ ) {
        fetch(url+encodeURIComponent(restaurantIdList[i]), { // fetch yelp fusion api with given for restaurant info
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': apiKey,
        },
        })
        .then((res) => res.json()).then((responseJson) => { // then take the response and set currentRestaurant
          this.setState({
            currentRestaurant: responseJson,
          }, function() {
            // alert(JSON.stringify(this.state.currentRestaurant.name))

          })
        })
        .catch((error) => { // catch error
          alert(error, 'this is an error')
        })
      }
    }
    try {

    } catch (error) {}
  }


  /*
   * Used for all storing of restaurants in async using array restaurantList
   * parameter: array restaurantList
   */
  async _storeInAsync (restaurantList) {
    try { // set item in storage
      await AsyncStorage.setItem('@restaurants', JSON.stringify(restaurantList))
    } catch (error) {}
  }
  
  async _isAlreadySaved ( restaurant ) { 
    try {
      var asyncStorage = await AsyncStorage.getItem('@restaurants')
      asyncStorage = JSON.parse(asyncStorage)
      if(asyncStorage.includes(restaurant.id)) {
        alert ('already saved')
        return true
      }
      return false
    } catch (error) { alert('err')}
  }

  /*
   * Global function to save a restaurant into the asyncstorage
   * Checks whether or not the restaurant has already been saved
   *
   * parameter: Restaurant object
   *
   */
  async saveRestaurant ( restaurant ) {
    var restaurantList = [] // initate empty array of restaurants
    try { // try to set asyncStorage to async item with key of @restaurants
      var asyncStorage = await AsyncStorage.getItem('@restaurants')
      if(asyncStorage != null) { // if there are restaurants
        if(this._isAlreadySaved(restaurant) == true) { // if restaurant has already been saved
          // alert ('restaurant already there guy')
          return
        }
        // if restaurant is not already saved 
        restaurantList = JSON.parse(asyncStorage) // restaurantList gets async storage
        restaurantList.push(restaurant.id) // push new restaurant id
        try {
          this._storeInAsync(restaurantList) // call _storeInAsync
        } catch (error) {}
        return
      }
      else { // Nothing in async storage
        alert('doesnotcontains')
        restaurantList.push(restaurant.id) // push restaurant into restaurantList
        try {
          this._storeInAsync(restaurantList) // call _storeInAsync
        } catch (error) {}
      }
    } catch (error) {
    }
  }

  /*
   * Global function to remove a restaurant from asyncstorage
   *
   * parameter: Restaurant object
   */

  async removeRestaurant ( restaurant ) {
    /*
    try {
      await AsyncStorage.removeItem(restaurantId)
      alert('item removed')
    } catch(error) {
      alert('error removing restaurant')
    }
    */
  }

  /*
   * Global function to clear all restaurants from asyncstorage
   *
   */

  async clearRestaurants () {
    asyncStorage = this.getSavedRestaurants() // asyncStorage gets currently saved restaurants
    if(asyncStorage != null) { // if async storage is not empty
      try { // clear storage
        AsyncStorage.clear()
        alert ('all clear')
      } catch (error) {}
    }
    return // return
  }

  /*
   * Global function to get list of saved restaurants
   *
   */
  async getSavedRestaurants () {
    try {
      return await JSON.stringify(AsyncStorage.getItem('@restaurants'))
    } catch (error) {}
  }

  // renderItem={({item}) => <Text>{item.key}</Text>}
  // render
  render() {
    if(this.state.savedRestaurants === null) {
      return (
      <View style={styles.savedContainer}>
        <Text>
          No saved restaurants
        </Text>
      </View>
      );
    } else {
    return (
      <View style={styles.savedContainer}>
        <View style={styles.savedContainer}>
        <FlatList
          data={this.state.savedRestaurants}
          renderItem={({ restaurant }) => (
          <TouchableHighlight
          >
            { this.state.savedRestaurants ? <Text>{restaurant}</Text> : null }
          </TouchableHighlight>
          )}
        />
        </View>
      </View>
    );
  }}
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
});*/
