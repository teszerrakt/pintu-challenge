import fetchLogo from 'src/apis/getLogo'
import { useLayoutEffect, useRef } from 'react'
import { useQuery } from 'react-query'

interface ICryptoLogoProps {
  url: string
  color?: string
  width?: string
  height?: string
}

function CryptoLogo({
  url,
  color,
  width = '32px',
  height = '32px',
}: ICryptoLogoProps) {
  const { data: logo } = useQuery(url, () => fetchLogo(url), {
    staleTime: Infinity,
  })
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.firstElementChild?.classList.add('w-full', 'h-full')
    }
  })

  return (
    <div
      ref={ref}
      style={{
        color,
        width,
        height,
      }}
      dangerouslySetInnerHTML={{ __html: logo ?? '' }}
    />
  )
}

export default CryptoLogo
