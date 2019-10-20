/**
 * @format
 */
// @flow
import React from 'react'
import 'react-native'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import testData from '../../../config/testData'

import PropertyCell from '../property_cell'

it('Property cell renders correctly', () => {
  renderer.create(
    <PropertyCell
      propertyDetails={testData[0].listing.propertyDetails}
      favouriteToggle={() => {}}
      isFavourite={() => false}
    />
  )
})
