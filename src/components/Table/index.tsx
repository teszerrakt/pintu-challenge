import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Percentage from 'src/components/Percentage'
import { IGetLatestPriceResponse } from 'src/pages/api/latestPrice/interface'
import { stringToCurrency } from 'src/utils/formatter'
import CryptoLogo from 'src/components/Icons/CryptoLogo'
import { useState } from 'react'

interface ITableProps {
  data: IGetLatestPriceResponse[]
}

const columnHelper = createColumnHelper<IGetLatestPriceResponse>()

const columns = [
  columnHelper.accessor('currency', {
    header: 'CRYPTO',
    cell: (info) => {
      const value = info.getValue()

      return (
        <div className="flex items-center">
          <CryptoLogo url={value.logo} color={value.color} />
          <div className="flex flex-col w-full ml-6 lg:justify-between lg:flex-row">
            <p className="font-bold">{value.name}</p>
            <p className="text-slate-400">{value.currencySymbol}</p>
          </div>
        </div>
      )
    },
  }),
  columnHelper.accessor('priceChanges.latestPrice', {
    header: 'HARGA',
    cell: (info) => (
      <p className="font-bold">{stringToCurrency(info.getValue())}</p>
    ),
  }),
  columnHelper.accessor('priceChanges.day', {
    header: '24 JAM',
    cell: (info) => <Percentage value={info.getValue()} />,
  }),
  columnHelper.accessor('priceChanges.week', {
    header: '1 MGG',
    cell: (info) => <Percentage value={info.getValue()} />,
  }),
  columnHelper.accessor('priceChanges.month', {
    header: '1 BLN',
    cell: (info) => <Percentage value={info.getValue()} />,
  }),
  columnHelper.accessor('priceChanges.year', {
    header: '1 THN',
    cell: (info) => <Percentage value={info.getValue()} />,
  }),
]

const Table = ({ data }: ITableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="p-5">
      <table className="w-full overflow-x-auto border border-separate rounded-lg border-slate-300 border-spacing-0">
        <thead className=" text-slate-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-5 border-b first-of-type:pl-[75px] text-left"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-5 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
