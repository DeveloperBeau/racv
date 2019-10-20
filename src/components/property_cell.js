// @flow
import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'

import type { PropertyDetails } from '../business_logic/typings'
import {
  streetName,
  suburb,
  bedsAndBaths
} from '../business_logic/property_details'

import { starImage } from '../business_logic/shared'

// Note: There is only minor os requirements in this component,
// if the requirements are to grow, id recommend moving to platform level components
// aka property_cell.ios.js and property_cell.android.js

type Props = {
  propertyDetails: PropertyDetails,
  isFavourite: PropertyDetails => boolean,
  favouriteToggle: PropertyDetails => void
}

export default (props: Props) => {
  const { propertyDetails } = props
  const showFilledInStar = () => props.isFavourite(propertyDetails)
  return (
    <View style={styles.containerStyles}>
      <View style={styles.detailsView}>
        <Text>{streetName(propertyDetails)}</Text>
        <Text>{suburb(propertyDetails)}</Text>
        {Platform.OS === 'ios' && <Text>{bedsAndBaths(propertyDetails)}</Text>}
      </View>
      <TouchableOpacity
        onPress={() => props.favouriteToggle(props.propertyDetails)}
      >
        {starImage(showFilledInStar)}
      </TouchableOpacity>
    </View>
  )
}

const BACKGROUND_COLOUR = Platform.OS === 'ios' ? '#abc4' : '#fac2'
const styles = {
  containerStyles: {
    height: 100,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOUR
  },
  detailsView: { flex: 1 }
}
