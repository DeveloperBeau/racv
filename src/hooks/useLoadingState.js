// @flow
import { useState, useEffect } from 'react'
import type { PropertyDetails } from '../business_logic/typings'

export default function useLoadingState(
  properties: PropertyDetails[]
): boolean {
  const [showLoadingState, setShowLoadingState] = useState<boolean>(true)
  useEffect(() => {
    if (properties.length > 0) {
      setShowLoadingState(false)
    }
  }, [properties, setShowLoadingState])

  return showLoadingState
}
