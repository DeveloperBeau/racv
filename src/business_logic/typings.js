// @flow
type MediaContent = {
  category: string,
  url: string
}

type ContactsContent = {
  name: string,
  photoUrl: string
}

export type Listing = {
  type: string,
  listing: {
    listingType: string,
    id: number,
    advertiser: {
      type: string,
      id: number,
      name: string,
      logoUrl: string,
      preferredColourHex: string,
      bannerUrl: string,
      contacts: ContactsContent[]
    },
    priceDetails: {
      displayPrice: string
    },
    media: MediaContent[],
    propertyDetails: PropertyDetails,
    headline: string,
    summaryDescription: string,
    hasFloorplan: boolean,
    hasVideo: boolean,
    labels: string[],
    auctionSchedule: {
      time: string,
      auctionLocation: string
    },
    inspectionSchedule: {
      byAppointment: boolean,
      recurring: boolean,
      times: Times[]
    },
    listingSlug: string
  }
}

export type PropertyDetails = {
  state: string,
  features: string[],
  propertyType: string,
  allPropertyTypes: string[],
  bathrooms: number,
  bedrooms: number,
  carspaces: number,
  unitNumber: string,
  streetNumber: string,
  street: string,
  area: string,
  region: string,
  suburb: string,
  postcode: string,
  displayableAddress: string,
  latitude: number,
  longitude: number,
  landArea: number
}

type Times = {
  openingTime: string,
  closingTime: string
}

export type Body = {
  listingType: string,
  propertyTypes: string[],
  locations: Location[]
}

type Location = {
  state: 'VIC', // We currently only care about Victoria for this project
  suburb: string
}

export type AccessToken = {
  access_token: string,
  expires_in: number,
  token_type: 'Bearer'
}
