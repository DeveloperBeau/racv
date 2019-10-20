import type { PropertyDetails } from './typings'

// Note: Property Details are from the Domain API v1

export const streetName = (propertyDetails: PropertyDetails) =>
  propertyDetails.unitNumber
    ? `${propertyDetails.unitNumber}/${propertyDetails.streetNumber} ${propertyDetails.street}`
    : `${propertyDetails.streetNumber} ${propertyDetails.street}`

export const suburb = (propertyDetails: PropertyDetails) =>
  `${propertyDetails.suburb}`

export const bedsAndBaths = (propertyDetails: PropertyDetails) =>
  `Beds: ${propertyDetails.bedrooms.toFixed()} Bath: ${propertyDetails.bathrooms.toFixed()}`
