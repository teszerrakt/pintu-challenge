import fetchLogo from 'src/apis/getLogo'
import { useLayoutEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import Image from 'next/image'

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
    return <Image src={url} alt="crypto-logo" width={width} height={height} />
  }

  return (
    <div
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
