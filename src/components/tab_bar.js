// @flow
import React from 'react'
import { View, TouchableOpacity, Dimensions, Text } from 'react-native'

type Prop = {
  isSearch: boolean => void
}

const DEVICE_WIDTH = Dimensions.get('window').width
const HIT_SLOP = { top: 20, bottom: 20, left: 20, right: 20 }

export default (props: Prop) => {
  return (
    <View style={styles.containerView}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => props.isSearch(true)}
        hitSlop={HIT_SLOP}
      >
        <Text>Search</Text>
      </TouchableOpacity>
      <Text>|</Text>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => props.isSearch(false)}
        hitSlop={HIT_SLOP}
      >
        <Text>Favourites</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  containerView: {
    height: 60,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1
  },
  buttons: { flex: 1, justifyContent: 'center', alignItems: 'center' }
}
