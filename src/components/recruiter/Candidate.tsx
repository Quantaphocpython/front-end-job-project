import React from 'react'
import Navigation from '../Header/Navigation'
import Link from 'next/link'

function Candidate() {
  return (
    
    <div className ="container mx-auto px-10 ">
      {/*Search và Đăng việc làm */}
      <h1 className="font-bold max-w-md mt-4">Ứng Tuyển Việc Làm</h1>
    <div className ="mt-4 flex justify-end items-center">
      <form className="max-w-md">

        <div className ="relative">

            <div className ="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className ="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" className ="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm ứng tuyển" required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm Kiếm</button>
        </div>
      </form>
      {/*Button Đăng việc làm */}
    
    
      <button className="ml-4 bg-blue-900 text-white rounded-md p-3 whitespace-nowrap hover:bg-blue-800 active:bg-blue-950">
        Đăng tìm việc
      </button>
    
    </div>
    <div className="mt-4 flex justify-end items-center">
  {/* Container cho Dropdown và Button */}
  <div className="flex justify-between items-center w-full">
    {/* Dropdown Search */}
    <nav className="relative">
      <button className="inline-flex items-center px-5 py-2 text-l font-medium text-center text-black border border-black bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300">
      Tất cả các công việc đang mở và tạm dừng
        <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
        <div className="p-3">
          <label className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="text" id="input-group-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user"></input>
          </div>
        </div>
      </div>
    </nav>

    {/* Button 'Thêm Ứng Tuyển' */}
    <button className="ml-4 bg-blue-900 text-white rounded-md p-3 whitespace-nowrap hover:bg-blue-800 active:bg-blue-950">
      Thêm Ứng Tuyển
    </button>
  </div>
</div>


    {/* Button 'Bộ lọc ' */}

<div className="mt-8 bg-white border-white-200 dark:border-white-600 dark:bg-white-900">



        <div className="flex justify-start items-center w-full">

        <button type="button" className="inline-flex items-center px-5 py-2.5 text-x font-medium text-center text-black border border-black bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300">
Bộ Lọc
      {/*mui ten xuong */}

<svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
</button>
      {/*navbar khi co du lieu*/}


    <div className="mx-2 flex w-full md:w-auto">
        <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8">
            <li>
                <Link href="#" className="text-black font-bold hover:text-gray-700">0 Có hiệu lực</Link>
            </li>
            <li>
                <Link href="#" className="text-black font-bold hover:text-gray-700">✓ 0 Danh sách rút gọn</Link>
            </li>
            <li>
                <Link href="#" className="text-black font-bold hover:text-gray-700">0 Đang chờ được duyệt</Link>
            </li>
            <li>
                <Link href="#" className="text-black font-bold hover:text-gray-700">0 Đã được đánh giá</Link>
            </li>
            <li>
                <Link href="#" className="text-black font-bold hover:text-gray-700">0 Từ chối</Link>
            </li>
            <li>
                <Link href="#" className="text-black font-bold hover:text-gray-700">0 Đã được thuê</Link>
            </li>
        </ul>
    </div>
</div>

    </div>






        </div>
        
    
  )
}

export default Candidate