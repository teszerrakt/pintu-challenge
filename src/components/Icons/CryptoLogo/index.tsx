import fetchLogo from 'src/apis/logo/getLogo'
import { useLayoutEffect, useRef } from 'react'
import { useQuery } from 'react-query'

interface ICryptoLogoProps {
  url: string
  color?: string
  width?: number
  height?: number
}

function CryptoLogo({ url, color, width = 32, height = 32 }: ICryptoLogoProps) {
  const { data: logo } = useQuery(url, () => fetchLogo(url), {
    staleTime: Infinity,
  })
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.firstElementChild?.classList.add('w-full', 'h-full')
    }
  })

  if (!logo) {
    return (
      <div
        style={{
          backgroundColor: color,
          width,
          height,
          borderRadius: '100%',
          flexShrink: 0,
        }}
      />
    )
  }
  return (
    <div
      className="flex-shrink-0"
      ref={ref}
      style={{
        color,
        width,
        height,
      }}
      dangerouslySetInnerHTML={{ __html: logo }}
    />
  )
}

export default CryptoLogo
