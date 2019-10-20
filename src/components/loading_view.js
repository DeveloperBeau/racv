// @flow
import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'

export default () => {
  return (
    <View style={styles.loadingContainerView}>
      <View style={styles.parentView}>
        <ActivityIndicator size="large" />
        <Text style={styles.textStyle}>Loading</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  parentView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    backgroundColor: '#0102',
    borderRadius: 20
  },
  textStyle: {
    paddingTop: 10
  },
  loadingContainerView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
