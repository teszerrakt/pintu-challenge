import SearchIcon from 'src/components/Icons/Search'

function SearchButton() {
  return (
    <>
      <div className="mx-4 cursor-pointer md:hidden">
        <SearchIcon />
      </div>
      <div className="hidden gap-4 px-4 py-3 bg-[#f2f2f2] md:flex w-96 rounded-lg cursor-pointer">
        <SearchIcon />
        <p className="flex-1 text-gray-400">Cari aset di Pintu...</p>
      </div>
    </>
  )
}

function SearchBar() {
  return (
    <div>
      <SearchButton />
    </div>
  )
}

export default SearchBar
