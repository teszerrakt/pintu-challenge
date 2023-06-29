import { useMemo } from 'react'
import { IGetLatestPricePayload } from 'src/apis/latestPrice/interface'
import { pairCodeSeparator, stringToCurrency } from 'src/utils/formatter'
import Percentage from '../Percentage'
import CryptoLogo from '../Icons/CryptoLogo'

interface ITopMoversProps {
  data: IGetLatestPricePayload[]
  limit?: number
}

interface ITopMoverCardProps {
  code: string
  name: string
  price: string
  percentage: string
  logo: {
    url: string
    color: string
  }
}

function TopMoverCard({ logo, name, price, percentage }: ITopMoverCardProps) {
  return (
    <div className="flex flex-col gap-2 p-4 cursor-pointer hover:bg-[#f2f2f2] flex-[0_0_auto]">
      <div className="flex items-center gap-2">
        <CryptoLogo url={logo.url} color={logo.color} />
        <p className="overflow-hidden text-xl font-semibold text-ellipsis whitespace-nowrap">
          {name}
        </p>
      </div>
      <p>{stringToCurrency(price)}</p>
      <Percentage value={percentage} />
    </div>
  )
}

function TopMovers({ data, limit }: ITopMoversProps) {
  const topMoversData = useMemo(() => {
    return data
      ?.slice()
      ?.sort(
        (a, b) =>
          Number(b.priceChanges.day.replace('-', '')) -
          Number(a.priceChanges.day.replace('-', ''))
      )
      .slice(0, limit)
  }, [data, limit])

  return (
    <>
      <h2 className="pl-4 mb-2 text-xl md:pl-0">🔥 Top Movers (24 Jam)</h2>
      <div
        className="flex gap-6 p-4 overflow-x-auto md:grid md:p-0"
        style={{
          gridTemplateColumns: `repeat(${limit}, minmax(0, 1fr))`,
        }}
      >
        {topMoversData?.map((item) => (
          <TopMoverCard
            key={item.pair}
            code={pairCodeSeparator(item.pair)[0].toLowerCase()}
            name={item.currency.name}
            price={item.priceChanges.latestPrice}
            percentage={item.priceChanges.day}
            logo={{
              url: item.currency.logo,
              color: item.currency.color,
            }}
          />
        ))}
      </div>
    </>
  )
}

export default TopMovers
