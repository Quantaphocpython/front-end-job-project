'use client';

import useLogin from '@/Hook/useLogin';
import Link from 'next/link';
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, login } = useLogin();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         {/* Overlay để che phủ toàn bộ màn hình khi loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-50 z-50">
          {/* Animation spin */}
          <svg
            className="animate-spin h-12 w-12 text-white"
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
        {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Đăng nhập để ứng tuyển ngay!
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Địa chỉ email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mật khẩu
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            {/* <Link href="/profile"> */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Đăng nhập
            </button>
            {/* </Link> */}
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Chưa có tài khoản
          <Link
            href="/auth/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Đăng ký ngay!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
