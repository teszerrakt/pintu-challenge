import { getPayload } from 'src/pages/api/latestPrice'
import { IGetLatestPriceResponse } from 'src/apis/latestPrice/interface'
import { useQuery } from 'react-query'
import getLatestPrice from 'src/apis/latestPrice/getLatestPrice'
import TopMovers from 'src/components/TopMovers'
import Table from 'src/components/Table'
import MobileTable from 'src/components/MobileTable'
import Head from 'next/head'

export async function getServerSideProps() {
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

interface IHomescreenProps {
  initialData?: IGetLatestPriceResponse[]
}

const HomeScreen = ({ initialData = [] }: IHomescreenProps) => {
  const { data } = useQuery<IGetLatestPriceResponse[]>(
    'latestPrice',
    () => getLatestPrice(),
    {
      refetchInterval: 2000,
    }
  )

  const tableData = data ?? initialData

  return (
    <>
      <Head>
        <title>Harga Crypto Hari Ini (IDR)</title>
      </Head>
      <div className="pt-8">
        <div className="mb-6 md:mb-8">
          <h1 className="pl-4 md:pl-0 text-xl md:text-[28px]">
            Harga Crypto dalam Rupiah Hari Ini
          </h1>
        </div>
        <div className="mb-6 md:mt-4 ">
          <TopMovers data={tableData} limit={6} />
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
