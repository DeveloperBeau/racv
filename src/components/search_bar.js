// @flow
import React /* , { useState, useRef, useEffect } */ from 'react'
import { TextInput } from 'react-native'

import useSearchTextWithTimer from '../hooks/useSeachTextWithTimer'

type Props = {
  initialSearchText: string,
  searchText: (text: string) => void,
  editable: boolean
}

export default (props: Props) => {
  const [value, onChangeText] = useSearchTextWithTimer(
    props.initialSearchText,
    props.searchText
  )
  const { editable } = props

  return (
    <TextInput
      style={editable ? styles.textInput : styles.disabledTextInput}
      onChangeText={text => onChangeText(text)}
      value={editable ? value : 'Favourites'}
      editable={editable}
    />
  )
}

const defaultStyle = {
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  textAlign: 'center'
}

const styles = {
  textInput: {
    ...defaultStyle
  },
  disabledTextInput: {
    ...defaultStyle,
    backgroundColor: 'gray',
    color: 'white'
  }
}
