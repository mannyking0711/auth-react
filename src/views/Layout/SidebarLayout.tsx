import useAuth from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext, AppContextType } from '../../contexts/AppContextProvider'

export const SidebarLayout = () => {
  const navigate = useNavigate()
  const { doLogout } = useAuth()
  const { currentUser, currentPage } = useContext(AppContext) as AppContextType

  const logout = () => {
    doLogout()
    navigate('/login')
  }

  console.log(currentUser.username)
  if (!currentUser.username) return null

  return (
    <div
      id="sidebar"
      className="sticky top-0 h-screen overflow-x-hidden bg-white px-3 shadow-xl transition-transform duration-300 ease-in-out md:block md:w-60 lg:w-60"
    >
      <div className="mt-10 space-y-6 md:space-y-10">
        <h1 className="text-center text-4xl font-bold md:hidden">MTBS</h1>
        <h1 className="hidden text-center text-sm font-bold md:block md:text-xl">
          MTBS Scanner
        </h1>
        <div id="profile" className="space-y-3">
          <img
            src={
              currentUser.picture
                ? currentUser.picture
                : 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            }
            alt="Avatar user"
            className="mx-auto w-10 rounded-full md:w-16"
          />
          <div>
            <h2 className="text-center text-xs font-medium text-teal-500 md:text-sm">
              {currentUser.username}
            </h2>
            <p className="text-center text-xs text-gray-500">Customer</p>
          </div>
        </div>

        <div id="menu" className="flex flex-col space-y-2">
          <Link
            to="/dashboard"
            className={
              (currentPage === 'dashboard' ? 'border-r-[6px] ' : '') +
              'rounded-md p-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-teal-500 hover:text-base hover:text-white'
            }
          >
            <svg
              className="inline-block h-6 w-6 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span className="">Dashboard</span>
          </Link>
          <Link
            to="request"
            className={
              (currentPage === 'request_scan' ? 'border-r-[6px] ' : '') +
              'rounded-md p-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-teal-500 hover:text-base hover:text-white'
            }
          >
            <svg
              className="inline-block h-6 w-6 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
            </svg>
            <span className="">Request Scan</span>
          </Link>
          <Link
            to="domains"
            className={
              (currentPage === 'domains' ? 'border-r-[6px] ' : '') +
              'rounded-md p-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-teal-500 hover:text-base hover:text-white'
            }
          >
            <svg
              className="inline-block h-6 w-6 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="">Domains</span>
          </Link>
          <hr />
          <a
            href="#"
            onClick={logout}
            className="rounded-md p-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out hover:scale-105 hover:bg-teal-500 hover:text-white"
          >
            <svg
              className="inline-block h-6 w-6 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
            <span className="">Logout</span>
          </a>
        </div>
      </div>
    </div>
  )
}
