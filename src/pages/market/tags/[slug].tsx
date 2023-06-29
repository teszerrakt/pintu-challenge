import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { useQuery } from 'react-query'
import getLatestPrice from 'src/apis/latestPrice/getLatestPrice'
import { IGetLatestPricePayload } from 'src/apis/latestPrice/interface'
import getMarketTags from 'src/apis/marketTags'
import { TGetMarketTagsResponse } from 'src/apis/marketTags/interface'
import Breadcrumb from 'src/components/Breadcrumb'
import Logo from 'src/components/Icons/Logo'
import MobileTable from 'src/components/MobileTable'
import Table from 'src/components/Table'

interface Params extends ParsedUrlQuery {
  slug: string
}

interface IMarketTagPageProps {
  slug: string
  marketData: TGetMarketTagsResponse
  initialData: IGetLatestPricePayload[]
}

function filterData(
  tableData: IGetLatestPricePayload[],
  availableCrypto: string[]
) {
  const filteredData: IGetLatestPricePayload[] = []

  availableCrypto.forEach((item) => {
    const filtered = tableData.find(
      (data) =>
        data.currency.currencySymbol.toLowerCase() === item.toLowerCase()
    )

    if (filtered) {
      filteredData.push(filtered)
    }
  })

  return filteredData
}

export const getServerSideProps: GetServerSideProps<
  IMarketTagPageProps
> = async (context) => {
  const { slug } = context.params as Params

  const [initialData, marketData] = await Promise.all([
    getLatestPrice(),
    getMarketTags(slug),
  ])

  return {
    props: {
      slug,
      initialData,
      marketData,
    },
  }
}

function MarketTagPage({ initialData, marketData, slug }: IMarketTagPageProps) {
  // @ts-ignore
  const { data } = useQuery<IGetLatestPricePayload[]>(
    'latestPrice',
    // @ts-ignore
    () => getLatestPrice(data ?? initialData),
    {
      refetchInterval: 2000,
    }
  )

  const tableData = data ?? initialData
  const content = marketData[0]
  const availableCrypto = content.currencies.map((item) => item.name)
  const icon = content.icon

  const filteredData = filterData(tableData, availableCrypto)

  return (
    <>
      <Head>
        <title>{content.meta_title}</title>
        <meta property="og:title" content={content.meta_title} />
        <meta property="og:description" content={content.meta_description} />
        <meta
          property="og:url"
          content={`https://pintu-challenge.vercel.app/market/tags/${slug}`}
        />
      </Head>
      <div className="pt-8">
        <div className="px-5 md:px-0">
          <Breadcrumb
            items={[
              { name: 'Harga Crypto', href: '/' },
              {
                name: `Kategori ${content.title}`,
                href: `/market/tags/${slug}`,
              },
            ]}
          />
          <div className="flex items-center gap-4 my-4">
            <Logo url={icon.url} color="black" height={28} width={28} />
            <h1 className="text-xl md:text-[28px] font-semibold">
              {content.title}
            </h1>
          </div>
          <p className="mb-6 text-slate-400">{content.subtitle}</p>
        </div>
        <div className="hidden md:block">
          <Table data={filteredData} />
        </div>
        <div className="md:hidden">
          <MobileTable data={filteredData} />
        </div>
      </div>
    </>
  )
}

export default MarketTagPage
