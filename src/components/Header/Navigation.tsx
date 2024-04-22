'use client';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import React from 'react';
import { SiKalilinux } from 'react-icons/si';
import LoginState from './LoginState';

function Navigation() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="border-b bg-white border-gray-200 px-4 py-2 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center hover:border-b-blue-800 space-x-3 rtl:space-x-reverse"
            >
              <SiKalilinux className="text-white text-2xl md:text-4xl" />

              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                JOB Search
              </span>
            </Link>
            {/* Navigation links list */}
            <ul className="flex items-center space-x-4 md:space-x-8 rtl:space-x-reverse">
              {/* <li id='home'><Link href="/"  className="active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-black  hover:text-blue-700">Home</Link></li> */}
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === '/'
                      ? 'pb-2 active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white bg-indigo-900 rounded-md hover:text-blue-700'
                      : 'active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white hover:text-blue-700 pb-2'
                  }`}
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/review"
                  className={`${
                    pathname === '/review'
                      ? 'pb-2 active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white bg-indigo-900 rounded-md hover:text-blue-700'
                      : 'active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white hover:text-blue-700 pb-2'
                  }`}
                >
                  Đánh giá
                </Link>
              </li>
            </ul>
          </div>

          {/* Login and Employer Buttons */}
          <div className="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            {/* <Link href="/auth/login" className="py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 md:hover:text-blue-700 dark:hover:text-blue-500">Login</Link> */}
            <LoginState />
            <span className="text-white">|</span>
            {/* <Link href="#" className="py-2 px-3 text-gray-900 dark:text-white hover:text-blue-900 md:hover:text-blue-700 dark:hover:text-blue-500">Employer/Post Job</Link> */}
            <Link
              href="/recruiter"
              className={`${
                pathname === '/recruiter' || pathname === '/recruiter/home'
                  ? 'pb-2 active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 dark:text-white text-white bg-indigo-900 rounded-md hover:text-blue-700'
                  : 'active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white dark:text-white hover:text-blue-700 pb-2'
              }`}
            >
              {pathname !== '/recruiter/home' && <div>Tạo công việc mới</div>}
              {pathname === '/recruiter/home' && (
                <div>Trang tuyển dụng của bạn</div>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
