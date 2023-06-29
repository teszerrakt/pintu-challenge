import fetchLogo from 'src/apis/logo/getLogo'
import { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'

interface ILogoProps {
  url: string
  color?: string
  width?: number
  height?: number
}

function Logo({ url, color, width = 32, height = 32 }: ILogoProps) {
  const { data: logo } = useQuery(url, () => fetchLogo(url), {
    staleTime: Infinity,
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.firstElementChild?.classList.add('w-full', 'h-full')
    }
  })

  if (!logo) {
    return (
      <div
        data-testid="logo-fallback"
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
      data-testid="logo"
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

export default Logo
