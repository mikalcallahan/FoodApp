import React, {StyleSheet, Dimensions} from 'react-native'
const windowsize = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    // borderColor: 'black',
    // borderRadius: 10,
    // borderStyle: 'solid',
    // borderWidth: 1,
    flex: 1,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      height: 0,
      width: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 18, 

  },
  imageHighlight: {
    flex: 3,
  },
  restaurantInfo: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
    margin: 0,
    paddingLeft: '2%',
  },
  textStyleName: {
    marginTop: 300,
    color: '#FFF',
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textStyleRestaurantName: {
    color: '#000',
    // flex: 1,
    fontSize: 20,
    // justifyContent: 'center',
  },
  restaurantDistance: {
    color: '#000',
    // flex: 1,
  },
  textStyleDesc: {
    color: '#979797',
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  userOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: '5%',
  },
  userOptionIcon: {
    // flex: 1,
    padding: '2%',
  },
  card: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    marginBottom: 30,
    marginTop: 50,
    // height: 400,
    width: 300,
    // margin: 10,
  },
  descBox: {
    flex: 1,
  },
  imageBackground: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
    //height: 250,
    //width: 300,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  restaurantModal: {
    // alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 0,
    padding: 0,
    width: windowsize.width,
  },
  scrollview: {
    flex: 1,
  },
  closeModal: {
    color: '#000',
    fontSize: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  modalImageBackground: {
    height: (windowsize.height)/2,
    // marginTop: 80,
    width: windowsize.width,
    // flex: 1,
    // width: '100%',
    // height: '100%',
  },
  phonedirections: {
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  phone: {
    height: 'auto',
    width: '50%',
  },
  directions: {
    height: 'auto',
    width: '50%',
  },
  mapstyle: {
    flex: 1,
    height: 200,
    width: windowsize.width,
  }
})
