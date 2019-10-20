// @flow

import React, { useState } from 'react'
import { SafeAreaView, FlatList, View, Text } from 'react-native'

import LoadingView from './components/loading_view'
import PropertyCell from './components/property_cell'
import TabBar from './components/tab_bar'
import SearchBar from './components/search_bar'

import type { PropertyDetails } from './business_logic/typings'
import { isFavourite, favouriteToggle } from './business_logic/shared'

import useLoadingState from './hooks/useLoadingState'
import useGetProperties from './hooks/useGetProperties'

type Props = {
  initialSearchText: string,
  initialFavourites: PropertyDetails[],
  initialSearchTabPreference: boolean
}

const App = (props: Props) => {
  const [searchText, setSearchText] = useState(props.initialSearchText)
  const [favourites, setfavourites] = useState(props.initialFavourites)
  const [isSearch, setIsSearch] = useState(props.initialSearchTabPreference)
  const properties = useGetProperties(searchText)
  const showLoadingState = useLoadingState(properties)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        searchText={setSearchText}
        initialSearchText={searchText}
        editable={isSearch}
        key={'Search Bar'}
      />
      <TabBar isSearch={setIsSearch} />
      {showLoadingState ? (
        <LoadingView />
      ) : (
        <FlatList
          data={isSearch ? properties : favourites}
          renderItem={({ item }) => {
            return (
              <PropertyCell
                propertyDetails={item}
                favouriteToggle={() =>
                  favouriteToggle(favourites, item, setfavourites)}
                isFavourite={() => isFavourite(favourites, item)}
              />
            )
          }}
          ListEmptyComponent={() =>
            isSearch ? (
              <View style={styles.emptyContainer}>
                <Text>{`There are no available houses for sale in ${searchText}, please try another Victorian suburb.`}</Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text>There are no favourites yet, please add more.</Text>
              </View>
            )}
          keyExtractor={(_, index) => `${index}`}
          style={{ flex: 1 }}
        />
      )}
    </SafeAreaView>
  )
}

export default App

App.defaultProps = {
  initialSearchText: 'Melbourne',
  initialFavourites: [],
  initialSearchTabPreference: true
}

const styles = {
  emptyContainer: {
    flex: 1,
    paddingTop: 250,
    alignItems: 'center'
  }
}
