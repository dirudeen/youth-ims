"use client"

import { useCallback, useRef, useEffect } from "react"

// This is a replacement for useEffectEvent which is not available in the current React version
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  // @ts-ignore - the types are complex here, but this is a safe implementation
  return useCallback((...args) => callbackRef.current(...args), [])
}
