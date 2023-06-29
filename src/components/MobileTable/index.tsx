import { ITableProps } from 'src/components/Table'
import { IGetLatestPricePayload } from 'src/apis/latestPrice/interface'
import CryptoLogo from 'src/components/Icons/CryptoLogo'
import { stringToCurrency } from 'src/utils/formatter'
import Percentage from '../Percentage'
import { useState } from 'react'

type TFilter = 'day' | 'week' | 'month' | 'year'

function Item({
  data,
  filter,
}: {
  data: IGetLatestPricePayload
  filter: TFilter
}) {
  return (
    <div className="flex items-center p-4 border-b">
      <CryptoLogo url={data.currency.logo} color={data.currency.color} />
      <div className="flex flex-row flex-1 pl-6">
        <div className="flex-1">
          <p className="font-semibold">{data.currency.name}</p>
          <p className="text-sm text-slate-400">
            {data.currency.currencySymbol}
          </p>
        </div>
        <div className="self-end flex-1">
          <p className="font-semibold text-right">
            {stringToCurrency(data.priceChanges.latestPrice)}
          </p>
          <div className="text-sm">
            <Percentage
              value={data.priceChanges[filter]}
              className="justify-end"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileTable({ data }: ITableProps) {
  const [filter, setFilter] = useState<TFilter>('day')

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="w-full p-4 text-xs font-semibold border-y border-slate-300">
          CRYPTO
        </div>
      </div>
      <div className="flex flex-col">
        {data.map((item) => (
          <Item key={item.pair} data={item} filter={filter} />
        ))}
      </div>
    </div>
  )
}

export default MobileTable
