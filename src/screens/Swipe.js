// 'use strict'

// imports
import React, { Component } from 'react'
import {
  Button,
  Dimensions,
  FlatList,
  Platform,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
// import phonecall from 'react-native-communications'
import MapView from 'react-native-maps'
import Modal from 'react-native-modal'
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation'
import { SettingsScreen } from './Settings.js'
import SavedScreen from './Saved.js'
import RestaurantProfile from './RestaurantProfile.js'
import styles from './styleSwipe.js' 
import Icon from "react-native-fontawesome-pro"

// global variables
var returnedRestaurant = ''
var userLocation = {}
var restaurantTitle = 'Default Title'
let apiKey;

export class Swipe extends Component {
  constructor(props) {
    super(props)
    this.state = { // all initial states
      returnedRestaurant: null,
      restaurant: null,
      swipedBusinesses: null,
      position: {},
      latitude: null,
      longitude: null,
      starredBusinesses: null,
      likedBusinesses: [],
      dislikedBusinesses: [],
      isModalVisible: false,
      userSettings: {
        unit: 'imperial',
      },
      error: null
    }
  }
  static navigationOptions = { // set title bar to 'Food App'
    title: 'Food App',
  }
  
  /*
   *  Get user location on mount
   */
  async componentDidMount () {
    this._getUserLocation ().then(position => this.setState({position}))
    .catch((error) => {
        alert(error, 'this is an error')
    })
  }

  /*
   * Get the list of restaurants from yelp fusion
   *
   * parameters: position (lat & long)
   */
  getRestaurants (position) {
    var url = 'https://api.yelp.com/v3/businesses/search?latitude='+encodeURIComponent(position.coords.latitude)+'&longitude='+encodeURIComponent(position.coords.longitude)
    fetch(url, { // fetch yelp fusion api with given url and apiKey
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    })
      .then((res) => res.json()).then((responseJson) => { // then take the response and set returnedRestaurants and current
      this.setState({
        returnedRestaurant: responseJson.businesses,
        restaurant: responseJson.businesses[0]
      }, function() {
      })
    })
    .catch((error) => { // catch error
      alert(error, 'this is an error')
    })
  }

  /*
   * Private function
   * Toggle whether or not the modal is visible
   */
  _toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  /*
   * Private function
   * Make phone call to restaurant
   */
  _makePhoneCall () {
    // Linking.openURL(url).catch(err => console.error('An error occurred', err));
    phonenumber = this.state.restaurant.phone.substr(2)
    const args = {
      number: phonenumber,
      prompt: true,
    }
    call(args).catch(console.error) 
  }

  /*
   * Private function
   * Like restaurant, temporarily storing it to saved list
   */
  _likeBusiness () {
    savedScreen = new SavedScreen()
    this.state.likedBusinesses.push(this.state.restaurant)
    savedScreen.saveRestaurant(this.state.restaurant)
    this._getNextBusiness()
  }

  /*
   * Private function
   * Dislike restaurant, removing it from the list
   */
  _dislikeBusiness () {
    // savedScreen = new SavedScreen()
    // savedScreen.getSavedRestaurants()
    this.state.dislikedBusinesses.push(this.state.restaurant)
    this._getNextBusiness()
    // savedScreen.clearRestaurants() // used to clear restaurants on tests
  }

  /*
   * Private function
   * Save restaurant, storing it in the async storage of the app
   */
  _saveBusiness () {
    savedScreen = new SavedScreen()
    savedScreen.saveRestaurant( this.state.restaurant )
  }

  /*
   * Private function
   * Changes state to display new restaurant,
   * 'Pops' restaurant array
   */
  _getNextBusiness () {
    returnedRestaurant = this.state.returnedRestaurant // get current restaurant
    let currentBusiness = returnedRestaurant.shift() // remove current entry from restaurants
    this.setState({ // set new current restaurant
			restaurant: returnedRestaurant[0]
    }) 
  }

  /*
   * Private function
   * Get users current location
   *
   */
  async _getUserLocation () {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getRestaurants(position)
      },
      error => this.setState({
        error: error.message
      }), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )
  }

  /*
   * Get current distance from restaurant and convert to local temperature
   *
   * return: distance in local degree to restaurant
   */
  _getRestaurantDistance() {
    if(this.state.userSettings.unit == 'imperial')
      return ((this.state.restaurant.distance*0.000621371192).toFixed(2)) + ' miles away'
    return (this.state.restaurant.distance.toFixed(2)) + ' meters away'
  }

  render() {
    // {styles.modalImageBackground} FOR IMG MODAL
    if(this.state.returnedRestaurant === null) {
      return (<Text> </Text>)
    } 
    return (
      <View id='wrapper' style={styles.container}>
        <View id='card-container' style={styles.card}>
        <TouchableHighlight style={styles.imageHighlight}
          // onPress={() => { this._toggleModal() }} >
          <ImageBackground style={styles.imageBackground}
            source={{uri: this.state.restaurant.image_url}}
          >
        </ImageBackground>
        </TouchableHighlight>
        <View style={styles.restaurantInfo}>
          <Text style={styles.textStyleRestaurantName}> 
            { this.state.restaurant.name }
          </Text> 
          <Text style={styles.restaurantDistance}>
            { this._getRestaurantDistance() }
          </Text>
          <Text style={styles.textStyleRestaurantCategory}>
            { this.state.restaurant.categories[0].title }
          </Text>
					<View style={styles.userOptions}>
              <Icon name='thumbs-up'
							color='rgba(0,0,0,.80)'
							type='regular'
							size={24}
							onPress={() => { this._likeBusiness() }}
							/>
            <Icon name='thumbs-down'
              color='rgba(0,0,0,.80)'
              type='regular'
              size={24}
              onPress={() => { this._dislikeBusiness() }}
            />
            <Icon name='heart'
            color='rgba(0,0,0,.80)'
            type='regular'
            size={24}
            onPress={() => { this._saveBusiness() }}
            />
					</View>
      </View>
      </View>
      <Modal 
        style={styles.restaurantModal}
        isVisible={this.state.isModalVisible}
        onSwipe={() => { this._toggleModal() }}
        swipeDirection = 'down'
      >
        <View>
          <View style={{}}>
            <TouchableOpacity
              style={{width:'10%'}}
              onPress={() => {
              this._toggleModal()
              }}
            >
            <Text style={styles.closeModal}> X </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollview}>
        <TouchableWithoutFeedback style={styles.restaurantInfo}>
        <View>
        <ImageBackground
            style={styles.modalImageBackground}
            source={{uri: this.state.restaurant.image_url}}
          >
          </ImageBackground>
        <Text style={styles.textStyleRestaurantName}> 
          { this.state.restaurant.name }
          { this.state.restaurant.price }
        </Text>
        <Text style={styles.textStyleRestaurantCategory}>
          { this.state.restaurant.categories[0].title }
        </Text>
        <Text style={styles.textStylerestaurantDistance}>
          { this._getRestaurantDistance() }
        </Text>
        <MapView
          style={styles.mapstyle}
          initialRegion={{
            latitude: this.state.restaurant.coordinates.latitude,
            longitude: this.state.restaurant.coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            showsUserLocation
        />

        <View style={styles.phonedirections}>
          <TouchableHighlight style={styles.phone}
            onPress={() => {
              this._makePhoneCall()
            }}
          >
            <View>
              <Text>
              Phone
              </Text>
              <Text>
              { this.state.restaurant.phone }
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.directions}>
            <Text>
              Directions
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </ScrollView>
      </View>
      </Modal>
    </View>
    )
  }
}

export default SwipeStack = StackNavigator ({
  //  RestaurantProfile: { screen: RestaurantProfile },
  Swipe: { screen: Swipe },
  RestaurantProfile: { screen: RestaurantProfile },
})
