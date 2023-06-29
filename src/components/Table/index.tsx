import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Percentage from 'src/components/Percentage'
import { IGetLatestPricePayload } from 'src/apis/latestPrice/interface'
import { stringToCurrency } from 'src/utils/formatter'
import CryptoLogo from 'src/components/Icons/Logo'
import { useState } from 'react'
import Sorting from '../Icons/Sorting'
import Link from 'next/link'
import { PINTU_BASE_URL } from 'src/constants/env'

export interface ITableProps {
  data: IGetLatestPricePayload[]
}

const columnHelper = createColumnHelper<IGetLatestPricePayload>()

const columns = [
  columnHelper.accessor('currency', {
    header: 'CRYPTO',
    cell: (info) => {
      const value = info.getValue()

      return (
        <Link
          className="flex items-center"
          href={`${PINTU_BASE_URL}/market/${value.currencySymbol}`}
        >
          <CryptoLogo url={value.logo} color={value.color} />
          <div className="flex flex-col w-full ml-6 lg:justify-between lg:flex-row">
            <p className="font-semibold">{value.name}</p>
            <p className="text-slate-400">{value.currencySymbol}</p>
          </div>
        </Link>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor('priceChanges.latestPrice', {
    header: 'HARGA',
    cell: (info) => (
      <p className="font-semibold">{stringToCurrency(info.getValue())}</p>
    ),
    sortDescFirst: true,
  }),
  columnHelper.accessor('priceChanges.day', {
    header: '24 JAM',
    cell: (info) => <Percentage value={info.getValue()} />,
    sortDescFirst: true,
  }),
  columnHelper.accessor('priceChanges.week', {
    header: '1 MGG',
    cell: (info) => <Percentage value={info.getValue()} />,
    sortDescFirst: true,
  }),
  columnHelper.accessor('priceChanges.month', {
    header: '1 BLN',
    cell: (info) => <Percentage value={info.getValue()} />,
    sortDescFirst: true,
  }),
  columnHelper.accessor('priceChanges.year', {
    header: '1 THN',
    cell: (info) => <Percentage value={info.getValue()} />,
    sortDescFirst: true,
  }),
]

const Table = ({ data }: ITableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const tableLength = data.length

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      <table className="w-full overflow-x-auto border border-separate rounded-lg border-slate-300 border-spacing-0">
        <thead className=" text-slate-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-5 border-b first-of-type:pl-[75px] text-left"
                >
                  {!header.isPlaceholder && (
                    <div
                      className={`flex items-center gap-4 ${
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <Sorting type={header.column.getIsSorted() as any} />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isLastIndex = tableLength - 1 === row.index
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`p-5 ${
                      isLastIndex ? 'border-none' : 'border-b'
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table
