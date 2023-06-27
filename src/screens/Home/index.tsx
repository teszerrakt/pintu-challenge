import getLatestPrice from 'src/apis/getLatestPrice'
import { IGetLatestPriceResponse } from 'src/pages/api/latestPrice/interface'
import Table from 'src/components/Table'
import { useQuery } from 'react-query'
import MobileTable from 'src/components/MobileTable'

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

  return (
    <>
      <Table data={data ?? initialData} />
      <MobileTable data={data ?? initialData} />
    </>
  )
}

export default HomeScreen
