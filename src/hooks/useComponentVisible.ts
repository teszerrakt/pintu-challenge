import {
  useState,
  useEffect,
  useRef,
  LegacyRef,
  Dispatch,
  SetStateAction,
} from 'react'

interface UseComponentVisibleProps<T> {
  ref: LegacyRef<T>
  isComponentVisible: boolean
  setIsComponentVisible: Dispatch<SetStateAction<boolean>>
}

function useComponentVisible<T extends HTMLElement>(
  initialIsVisible: boolean
): UseComponentVisibleProps<T> {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef<T>(null)

  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isComponentVisible, setIsComponentVisible }
}

export default useComponentVisible
