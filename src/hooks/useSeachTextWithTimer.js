// @flow
import { useState, useEffect, useRef } from 'react'

export default function useSearchTextWithTimer(
  initialValue: string,
  searchTextHandler: string => void
) {
  const [value, onChangeText] = useState<string>(initialValue)
  const timer = useRef(null)

  useEffect(() => {
    if (!!timer.current) {
      clearTimeout(timer.current)
      timer.current = undefined
    }
    const newTimer = setTimeout(() => {
      searchTextHandler(value)
    }, 1500)
    timer.current = newTimer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return [value, onChangeText]
}
