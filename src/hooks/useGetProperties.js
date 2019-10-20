// @flow
import { useState, useEffect } from 'react'
import type { PropertyDetails } from '../business_logic/typings'
import Api from '../business_logic/api'

export default function useGetProperties(
  searchText: string
): PropertyDetails[] {
  const [properties, setProperties] = useState<PropertyDetails[]>([])

  useEffect(() => {
    if (!!searchText) {
      Api.getProperties(searchText, (newProperties: PropertyDetails[]) =>
        setProperties(newProperties)
      )
    }
  }, [searchText])

  return properties
}
