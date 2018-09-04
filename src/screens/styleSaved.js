import React, {StyleSheet, Dimensions} from 'react-native'
const windowsize = Dimensions.get('window')

export default StyleSheet.create({
  savedContainer: {
    height: windowsize.height,
    paddingTop: '5%',
    flex: 1, 
    width: windowsize.width,
  },
})
