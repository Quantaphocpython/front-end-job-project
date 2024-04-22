'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  id: number;
  userName: string;
  token: string;
  // Định nghĩa các thuộc tính khác của user ở đây nếu cần
}

function MyComponent() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    localStorage.removeItem('user');
    window.location.href = '/';
    setUser(null);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const userJSON = localStorage.getItem('user');
      if (userJSON) {
        try {
          const parsedUser = JSON.parse(userJSON);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user JSON:', error);
          // Xử lý lỗi ở đây nếu cần
        }
      }
    }, 100); // Kiểm tra liên tục mỗi 1/10 giây

    // Hủy bỏ interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className={`${
          pathname === '/auth/login'
            ? 'pb-2 active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white bg-indigo-900 rounded-md hover:text-blue-700'
            : 'active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white dark:text-white hover:text-blue-700 pb-2'
        }`}
      >
        Đăng nhập
      </Link>
    );
  } else {
    return (
      <div className="">
        <Link
          href="/profile"
          className={`${
            pathname === '/profile'
              ? 'pb-2 active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white bg-indigo-900 rounded-md hover:text-blue-700'
              : 'active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white hover:text-blue-700 pb-2'
          }`}
        >
          {user.userName}
        </Link>
        <button
          onClick={handleLogout}
          className="active:text-white active:rounded-md active:bg-indigo-900 py-2 px-3 text-white hover:text-blue-700 pb-2"
        >
          Đăng xuất
        </button>
      </div>
    );
  }
}

export default MyComponent;
