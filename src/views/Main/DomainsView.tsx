import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AppContext, AppContextType } from '../../contexts/AppContextProvider'
import { formatDateTime } from '../../utils'
import axiosInstance from 'axiosApi'
import { Link } from 'react-router-dom'

export const DomainsView = () => {
  const { setCurrentPage } = useContext(AppContext) as AppContextType
  const [tableData, setTableData] = useState<any[]>([])
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    setCurrentPage('domains')
    axiosInstance.get('track').then(res => {
      setTableData(res.data);
    })
  }, [])

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchParam = (e.target as HTMLInputElement).value;
    setQuery(searchParam)
  }
  return (
    <>
      <p className="text-2xl">Scanned Domains</p>
      <div className="mt-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <div className="bg-[#F3F4F6] p-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search for domain"
              value={query}
              onChange={onSearch}
            />
          </div>
        </div>
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                No
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Domain
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Start Time
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Operated Time / s
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tableData.filter(i => {
              if (query)
                return i.domain.includes(query)
              return true
            }).map((row, index) => (
              <tr key={index + 1}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{row.domain}</td>
                <td className="px-6 py-4">{formatDateTime(row.created_at)}</td>
                <td className="px-6 py-4">
                  {row.finished_at === null ? (
                    <span className="rounded-md bg-red-400 p-1 text-white">
                      Pending
                    </span>
                  ) : (
                    (new Date(row.finished_at).getTime() - new Date(row.created_at).getTime()) / 1000
                  )}
                </td>
                <td className="px-6 py-4">
                  {row.finished_at === null ? (
                    ''
                  ) : (
                    <Link
                      to={"/track/" + row.track}
                      className="mr-2 text-gray-400 hover:text-gray-800"
                    >
                      <i className="material-icons-outlined text-base">
                        visibility
                      </i>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tableData.length === 0 ? (
          <p className="p-3 text-center text-gray-400"> No history ... </p>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
