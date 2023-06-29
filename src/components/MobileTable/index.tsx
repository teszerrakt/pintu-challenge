import { ITableProps } from 'src/components/Table'
import { IGetLatestPricePayload } from 'src/apis/latestPrice/interface'
import CryptoLogo from 'src/components/Icons/Logo'
import { stringToCurrency } from 'src/utils/formatter'
import Percentage from 'src/components/Percentage'
import { useState } from 'react'
import Dropdown from 'src/components/Dropdown'

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

const DROPDOWN_OPTIONS = [
  { key: 'day', value: '24 JAM' },
  { key: 'week', value: '1 MGG' },
  { key: 'month', value: '1 BLN' },
  { key: 'year', value: '1 THN' },
]

function MobileTable({ data }: ITableProps) {
  const [filter, setFilter] = useState<TFilter>('day')

  const handleFilterChange = (value: string) => {
    setFilter(value as TFilter)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between w-full p-4 border-y border-slate-300">
        <p className="text-xs font-semibold ">CRYPTO</p>
        <Dropdown
          options={DROPDOWN_OPTIONS}
          initialValue={filter}
          onChange={handleFilterChange}
        />
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
