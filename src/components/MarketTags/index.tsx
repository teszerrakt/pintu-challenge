import { useQuery } from 'react-query'
import getMarketTags from 'src/apis/marketTags'
import { TGetMarketTagsResponse } from 'src/apis/marketTags/interface'
import CryptoLogo from '../Icons/Logo'
import Link from 'next/link'

interface ITagProps {
  logo: {
    url: string
    height: number
    width: number
  }
  name: string
  slug: string
}

const TAG_COLORS = {
  text: '#0A68F4',
  background: '#EDF4FE',
}

function Tag({ logo, name, slug }: ITagProps) {
  return (
    <Link
      href={`/market/tags/${slug}`}
      className="flex items-center gap-2 p-2 rounded-lg"
      style={{
        backgroundColor: TAG_COLORS.background,
      }}
    >
      <CryptoLogo color={TAG_COLORS.text} {...logo} />
      <div className="text-xs font-semibold" style={{ color: TAG_COLORS.text }}>
        {name}
      </div>
    </Link>
  )
}

function MarketTags() {
  const { data } = useQuery<TGetMarketTagsResponse>('marketTags', () =>
    getMarketTags()
  )

  return (
    <div className="flex gap-2">
      {data?.map((tag) => (
        <Tag
          key={tag.id}
          logo={{
            url: tag.icon.url,
            height: 24,
            width: 24,
          }}
          name={tag.title}
          slug={tag.slug}
        />
      ))}
    </div>
  )
}

export default MarketTags
