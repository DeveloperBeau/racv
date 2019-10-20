/**
 * @format
 */

// @flow

import React from 'react'
import 'react-native'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

import LoadingView from '../loading_view'

it('Loading View renders correctly', () => {
  renderer.create(<LoadingView />)
})
