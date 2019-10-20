import React from 'react'
import { Image } from 'react-native'

import type { PropertyDetails, Listing } from './typings'

export const starImage = (isFilledIn: () => boolean) =>
  isFilledIn() ? (
    <Image
      style={starImageStyles.image}
      source={require('../../images/StarActive.png')}
    />
  ) : (
    <Image
      style={starImageStyles.image}
      source={require('../../images/StarInactive.png')}
    />
  )

const starImageStyles = {
  image: {
    height: 25,
    width: 25
  }
}

export const isFavourite = (
  favourites: PropertyDetails[],
  propertyDetails: PropertyDetails
) =>
  favourites.some(
    e => e.displayableAddress === propertyDetails.displayableAddress
  )

export const favouriteToggle = (
  favourites: PropertyDetails[],
  propertyDetails: PropertyDetails,
  setfavourites: (PropertyDetails[]) => void
) => {
  let oldfavourites = favourites
  if (isFavourite(favourites, propertyDetails)) {
    for (let i = 0; i < favourites.length; i++) {
      if (
        favourites[i].displayableAddress === propertyDetails.displayableAddress
      ) {
        oldfavourites = oldfavourites.filter(
          e => e.displayableAddress !== propertyDetails.displayableAddress
        )
        setfavourites(oldfavourites)
      }
    }
  } else {
    setfavourites(favourites.concat(propertyDetails))
  }
}

export const getPropertyDetailsOutOfListings = (
  listings: Listing[]
): PropertyDetails[] => {
  return listings.map((property: Listing) => property.listing.propertyDetails)
}
