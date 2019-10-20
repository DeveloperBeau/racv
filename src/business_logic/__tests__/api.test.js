// @flow

import fetchMock from 'fetch-mock'
import Api from '../api'

import testData from '../../../config/testData'

const defaultLocation = 'Melbourne'

describe('Api module tests', () => {
  describe('Retrieving and handling the access token', () => {
    it('should get test access tokens', async () => {
      fetchMock.post('https://auth.domain.com.au/v1/connect/token', {
        access_token: 'b15ec944b77e2c7a92703bd969b3be92',
        expires_in: 43200,
        token_type: 'Bearer'
      })
      await Api.getAccessToken(key => {
        expect(key).toBe('b15ec944b77e2c7a92703bd969b3be92')
      })
      fetchMock.reset()
    })

    it('should fail safely when oauth fails', async () => {
      fetchMock.post('https://auth.domain.com.au/v1/connect/token', 404)
      await Api.getAccessToken(key => {
        expect(key).toBeFalsy()
      })
      fetchMock.reset()
    })
  })

  describe('fetching domain data', () => {
    it('should return the test data', async () => {
      fetchMock.post(
        'https://api.domain.com.au/v1/listings/residential/_search',
        testData
      )
      await Api.getProperties(defaultLocation, properties => {
        expect(properties).toBe(testData)
      })
      fetchMock.reset()
    })

    it('should fail safely when oauth fails', async () => {
      fetchMock.post(
        'https://api.domain.com.au/v1/listings/residential/_search',
        404
      )
      await Api.getProperties(defaultLocation, properties => {
        expect(properties).toBeArray()
        expect(properties).toBeArrayOfSize(0)
      })
      fetchMock.reset()
    })

    describe('generate api string', () => {
      it('should return the non sandbox api string', async () => {
        expect(Api.locationSearchUrl(false)).toBe(
          'https://api.domain.com.au/v1/listings/residential/_search'
        )
      })

      it('should return the sandbox api string', async () => {
        expect(Api.locationSearchUrl(true)).toBe(
          'https://api.domain.com.au/sandbox/v1/listings/residential/_search'
        )
      })
    })

    describe('generate body object', () => {
      it('should generate the body object', () => {
        expect(Api.body(defaultLocation)).toStrictEqual({
          listingType: 'Sale',
          propertyTypes: ['House'],
          locations: [
            {
              state: 'VIC',
              suburb: defaultLocation
            }
          ]
        })
      })
    })
  })
})
