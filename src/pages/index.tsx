import { getPayload } from 'src/pages/api/latestPrice'
import { IGetLatestPricePayload } from 'src/apis/latestPrice/interface'
import { useQuery } from 'react-query'
import getLatestPrice from 'src/apis/latestPrice/getLatestPrice'
import TopMovers from 'src/components/TopMovers'
import Table from 'src/components/Table'
import MobileTable from 'src/components/MobileTable'
import Head from 'next/head'
import MarketTags from 'src/components/MarketTags'
import { GetServerSideProps } from 'next'
import SearchBar from 'src/components/SearchBar'
import Header from 'src/components/Header'

interface IHomeScreenProps {
  initialData?: IGetLatestPricePayload[]
}

export const getServerSideProps: GetServerSideProps<
  IHomeScreenProps
> = async () => {
  try {
    const initialData = await getPayload()

    return {
      props: {
        initialData,
      },
    }
  } catch (error) {
    return {
      props: {
        initialData: [],
      },
    }
  }
}

const HomeScreen = ({ initialData = [] }: IHomeScreenProps) => {
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

  return (
    <>
      <Head>
        <title>Harga Crypto Hari Ini (IDR) | Pintu</title>
        <meta
          property="og:title"
          content="Harga Crypto Hari Ini (IDR) | Pintu"
        />
        <meta
          property="og:description"
          content="Dapatkan update harga Crypto hari ini dalam kurs Rupiah (IDR). Cek pergerakan grafik market crypto dalam 24 jam secara realtime!"
        />
        <meta property="og:url" content="https://pintu-challenge.vercel.app/" />
      </Head>

      <Header />
      <div className="pt-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="pl-4 md:pl-0 text-xl md:text-[28px] tracking-tight">
            Harga Crypto dalam Rupiah Hari Ini
          </h1>
          <SearchBar />
        </div>
        <div className="mb-6 md:mt-4 ">
          <TopMovers data={tableData} limit={6} />
        </div>
        <div className="mb-6">
          <MarketTags />
        </div>
        <div className="hidden md:block">
          <Table data={tableData} />
        </div>
        <div className="md:hidden">
          <MobileTable data={tableData} />
        </div>
      </div>
    </>
  )
}

export default HomeScreen
