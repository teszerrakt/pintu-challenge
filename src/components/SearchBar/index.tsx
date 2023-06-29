import SearchIcon from 'src/components/Icons/Search'
import CloseIcon from 'src/components/Icons/Close'
import { useQuery } from 'react-query'
import getLatestPrice from 'src/apis/latestPrice/getLatestPrice'
import { IGetLatestPricePayload } from 'src/apis/latestPrice/interface'
import CryptoLogo from 'src/components/Icons/Logo'
import { useEffect, useMemo, useRef, useState } from 'react'
import useComponentVisible from 'src/hooks/useComponentVisible'
import Link from 'next/link'
import { PINTU_BASE_URL } from 'src/constants/env'
import Head from 'next/head'
import Header from '../Header'

interface ISearchButtonProps {
  onClick: () => void
}

export function SearchButton({ onClick }: ISearchButtonProps) {
  return (
    <>
      <div
        className="mx-4 cursor-pointer md:hidden"
        onClick={onClick}
        data-testid="mobile-search-button"
      >
        <SearchIcon />
      </div>
      <div
        data-testid="desktop-search-button"
        className="hidden gap-4 px-4 py-3 bg-[#f2f2f2] md:flex w-96 rounded-lg cursor-pointer"
        onClick={onClick}
      >
        <SearchIcon />
        <p className="flex-1 text-gray-400">Cari aset di Pintu...</p>
      </div>
    </>
  )
}

interface ISearchInputProps {
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

export function SearchInput({ value, onChange, onClose }: ISearchInputProps) {
  return (
    <div className="flex items-center px-3 py-2 mx-4 mt-4 rounded-lg bg-[#f2f2f2] mb-2">
      <SearchIcon />
      <div className="flex-1 mx-4">
        <input
          data-testid="search-input"
          value={value}
          type="text"
          autoFocus
          className="w-full text-sm bg-transparent focus:outline-none"
          placeholder="Cari aset di Pintu..."
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div
        className="flex items-center justify-center w-5 h-5 duration-200 outline-none cursor-pointer hover:scale-90"
        onClick={onClose}
      >
        <CloseIcon />
      </div>
    </div>
  )
}

interface ISuggestionItemProps {
  code: string
  name: string
  logo: {
    url: string
    color: string
  }
}

export function SuggestionItem({ code, name, logo }: ISuggestionItemProps) {
  return (
    <Link
      className="flex p-2 items-center cursor-pointer hover:bg-[#f2f2f2] justify-between mx-4 mb-2 rounded-lg"
      href={`${PINTU_BASE_URL}/market/${code}`}
    >
      <div className="flex items-center gap-2 ">
        <CryptoLogo url={logo.url} color={logo.color} width={16} height={16} />
        <p className="text-slate-400">{name}</p>
      </div>
      {code}
    </Link>
  )
}

interface ISuggestionProps {
  data: IGetLatestPricePayload[]
  showErrorText?: boolean
  query?: string
}

export function Suggestion({ data, showErrorText, query }: ISuggestionProps) {
  const renderContent = useMemo(() => {
    if (showErrorText) {
      return (
        <div className="mt-6 text-sm text-center md:mt-10">
          <p className="font-semibold">&quot;{query}&quot; Tidak Ditemukan</p>
          <p className="text-gray-400">
            Kata kunci tidak sesuai atau aset belum ada di Pintu
          </p>
        </div>
      )
    }

    return (
      <>
        {data?.map((item) => (
          <SuggestionItem
            key={item.pair}
            code={item.currency.currencySymbol}
            name={item.currency.name}
            logo={{
              url: item.currency.logo,
              color: item.currency.color,
            }}
          />
        ))}
      </>
    )
  }, [data, query, showErrorText])

  return <div className="overflow-y-scroll md:h-80">{renderContent}</div>
}

function SearchBar() {
  const { data } = useQuery<IGetLatestPricePayload[]>('suggestion', () =>
    getLatestPrice()
  )
  const initialData = useMemo(() => data ?? [], [data])

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] =
    useState<IGetLatestPricePayload[]>(initialData)
  const { isComponentVisible, setIsComponentVisible, ref } =
    useComponentVisible<HTMLDivElement>(false)

  useEffect(() => {
    if (!searchQuery) {
      return setFilteredData(initialData)
    }

    const filtered = initialData.filter((item) => {
      return (
        item.currency.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim()) ||
        item.currency.currencySymbol
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim())
      )
    })

    setFilteredData(filtered)
  }, [initialData, searchQuery])

  const handleClose = () => {
    setIsComponentVisible(false)
    setSearchQuery('')
  }

  return (
    <div className="relative">
      <SearchButton onClick={() => setIsComponentVisible(true)} />
      {isComponentVisible && (
        <div
          className={`fixed md:absolute inset-0 md:bottom-auto z-50 bg-white md:border rounded-lg border-slate-300 overflow-scroll`}
          ref={ref}
        >
          <div className="block md:hidden">
            <Header />
          </div>
          <SearchInput
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            onClose={handleClose}
          />
          <Suggestion
            data={filteredData}
            query={searchQuery}
            showErrorText={!!searchQuery && filteredData.length === 0}
          />
        </div>
      )}
    </div>
  )
}

export default SearchBar
