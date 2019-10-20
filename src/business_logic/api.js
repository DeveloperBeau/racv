// @flow
import Base64 from 'react-native-base64'
import querystring from 'querystring'
import keys from '../../config/keys.json'
import urls from '../../config/urls.json'
import testData from '../../config/testData.json'

import type { Body, PropertyDetails } from './typings'

import { getPropertyDetailsOutOfListings } from './shared'

const TIMEOUT_BUFFER = 50

class Api {
  key: string

  timeout: number

  isSandbox: boolean

  isGettingAuthToken: boolean

  apiKey: () => Promise<string>

  constructor() {
    this.key = ''
    this.timeout = 0
    this.isSandbox = false
    this.isGettingAuthToken = false

    this.apiKey = this.apiKey.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getProperties = this.getProperties.bind(this)
  }

  async apiKey() {
    return new Promise((resolve, reject) => {
      if (!this.hasKeyTimedOut()) {
        resolve(this.key)
      } else if (!this.isGettingAuthToken) {
        this.getAccessToken(result => {
          this.isGettingAuthToken = false
          if (result) {
            resolve(result)
          } else {
            reject()
          }
        })
      }
    })
  }

  locationSearchUrl(isSandbox: boolean) {
    return isSandbox
      ? urls.base + urls.sandbox + urls.locationSearch
      : urls.base + urls.production + urls.locationSearch
  }

  authUrl() {
    return urls.authBase + urls.production + urls.authScheme
  }

  // TODO: Better format this function, make it more generic and testable
  getProperties = async (
    suburb: string,
    properties: (PropertyDetails[]) => void
  ) => {
    if (this.isSandbox) {
      properties(getPropertyDetailsOutOfListings(testData))
    } else {
      fetch(this.locationSearchUrl(this.isSandbox), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await this.apiKey()}`
        },
        body: JSON.stringify(this.body(suburb))
      })
        .then(response => {
          response.json().then(body => {
            properties(getPropertyDetailsOutOfListings(body))
          })
        })
        .catch(reason => {
          properties([])
        })
    }
  }

  // TODO: Better format this function, make it more generic and testable
  getAccessToken = (handler: string => void) => {
    const body = querystring.stringify({
      grant_type: 'client_credentials',
      scope: 'api_agencies_read api_listings_read'
    })
    const Authorization = `Basic ${Base64.encode(
      `${keys.domain_client_id}:${keys.domain_secret}`
    )}`
    this.isGettingAuthToken = true
    fetch(this.authUrl(), {
      method: 'POST',
      headers: {
        Authorization,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
      .then(
        response => {
          return response.json()
        },
        () => {
          handler('')
        }
      )
      .then(
        result => {
          this.key = result.access_token
          this.timeout = Date.now() + result.expires_in - TIMEOUT_BUFFER
          handler(result.access_token)
        },
        _ => {
          handler('')
        }
      )
      .catch(_ => {
        handler('')
      })
  }

  hasKeyTimedOut(): boolean {
    if (Date.now() + TIMEOUT_BUFFER > this.timeout) {
      return true
    }
    return false
  }

  body(suburb: string): Body {
    return {
      listingType: 'Sale',
      propertyTypes: ['House'],
      locations: [
        {
          state: 'VIC',
          suburb
        }
      ]
    }
  }
}

const defaultApi = new Api()

export default defaultApi
