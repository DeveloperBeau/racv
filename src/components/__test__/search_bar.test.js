/**
 * @format
 */
// @flow
import React from 'react'
import 'react-native'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import testData from '../../../config/testData'

import SearchBar from '../search_bar'

it('Property cell renders correctly', () => {
  renderer.create(
    <SearchBar initialSearchText="Melbourne" searchText={() => {}} editable />
  )
})
