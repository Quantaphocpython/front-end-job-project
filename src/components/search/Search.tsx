'use client'
import useSearchCompanyList from '@/Hook/useSearchCompanyList';
import React, { useState } from 'react'

function Search() {
  const [location,setLocation] = useState('');
  const [company,setCompany] = useState('');
  const {loading,SearchCompanyList} = useSearchCompanyList()
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await SearchCompanyList(location.toLocaleLowerCase());
    setLocation('');
    setCompany('');
  };

  return (
    <form  className="max-w-3xl mx-auto flex items-center mt-14 ">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-40 z-50">
          {/* Animation spin */}
          <svg
            className="animate-spin h-12 w-12 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a7.962 7.962 0 01-3 6.291l3 2.647A11.962 11.962 0 0024 12h-4zm-6-6.291V0a11.962 11.962 0 00-3 7.938l3 2.647z"
            ></path>
          </svg>
        </div>
      )}
      <div className="flex flex-grow items-center space-x-2 rounded-lg border border-black shadow-2xl p-2">
        <input
          type="search"
          placeholder="Tên công ty"
          className="flex-grow p-2 border-0 rounded-none outline-none"
          value={company}
          onChange={(e)=> setCompany(e.target.value)}
        />
        <input
          type="search"
          placeholder="Địa điểm"
          className="flex-grow p-2 border-0 rounded-non outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value) }/>
      <button onClick={handleSubmit} className="bg-blue-900 text-white rounded-md p-3 whitespace-nowrap  hover:bg-blue-800 active:bg-blue-950 ">
        Tìm Việc
      </button>
      </div>
    </form>
  );
}

export default Search