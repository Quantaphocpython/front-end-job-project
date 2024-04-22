'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  userName: string;
  token: string;
  roles:Role[];
}

interface Role{
  id:string;
  name:string;
}

export default function EmployerRegister() {
  const [employerInform, setEmployerInform] = useState({
    token: '',
    fullName: '',
    mobilePhone: '',
    companyName: '',
    companySector: '',
    companyDescription: '',
    companyAddress: '',
  });
  const router = useRouter();
  const setFields = (e: React.ChangeEvent<any>) => {
    const fieldName = e.target.name;
    const newValue = e.target.value;
    setEmployerInform((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };

  const handleRegisterEmployer = async (e: any) => {
    e.preventDefault();

    const user = localStorage.getItem('user');
    if (!user) {
      alert('Bạn chưa đăng nhập');
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(user ?? '');
    setEmployerInform((prevState) => ({
      ...prevState,
      token: parsedUser.token,
    }));
    const res = await fetch(
      'https://backend-5bno.onrender.com/employer/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employerInform),
      }
    );
    if (res.status === 200) {
      localStorage.removeItem('user');
      alert(
        'Bạn đã là nhà tuyển dụng, vui lòng đăng nhập lại để bắt đầu đăng việc làm'
      );
      router.push('/auth/login');
    }
    const message = res.json();
    console.log(message);
  };

      //Xử lý nếu chưa là employer, thì sẽ giữa nguyên
      //Nếu là employer thì sẽ chuyển sang /recruiter/home
      const [user, setUser] = useState<User|null>(null);

      useEffect(() => {
          const intervalId = setInterval(() => {
            const userJSON = localStorage.getItem('user');
            if (userJSON) {
              try {
                const parsedUser = JSON.parse(userJSON);
                setUser(parsedUser);
              } catch (error) {
                console.error('Error parsing user JSON:', error);
              }
            }
          }, 100);
      
          return () => clearInterval(intervalId);
        }, []);
      
        let isEmployer = false;
        if (user) {
          console.log(user)
          isEmployer = hasEmployerRole(user);
          console.log('isEmployer', isEmployer);
          if (isEmployer) {
              router.push('/recruiter/home');
          } else {
              
          }
        }

  return (
    <div className="flex justify-center mt-20 flex-col mb-20">
      <div className="m-auto w-1/3">
        <h1 className="text-xl font-bold">
          Bạn chưa đăng việc làm nào trước đây, vì vậy bạn cần tạo một tài khoản
          nhà tuyển dụng.
        </h1>
        <form className="" onSubmit={handleRegisterEmployer}>
          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Họ và tên <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="fullName"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="Nguyễn Văn A"
                value={employerInform.fullName}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>

          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Số điện thoại <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="mobilePhone"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="0123456789"
                value={employerInform.mobilePhone}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>

          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tên công ty <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="companyName"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="abc"
                value={employerInform.companyName}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>

          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Lĩnh vực kinh doanh của công ty{' '}
              <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="companySector"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="Công nghệ thông tin"
                value={employerInform.companySector}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>

          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Địa chỉ công ty <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="companyAddress"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="Hà Nội"
                value={employerInform.companyAddress}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black mt-5"
          >
            Mô tả công ty <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            name="companyDescription"
            className="block p-2.5 w-full text-sm text-white-900 bg-white-50 rounded-lg border border-white-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-black-500"
            placeholder="Mô tả công ty..."
            minLength={30}
            value={employerInform.companyDescription}
            onChange={(e) => setFields(e)}
          ></textarea>

          <div className="mt-6 flex items-center w-full">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full "
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// function hasEmployerRole(user:User) { // return true if user.role isEmployerRole
  function hasEmployerRole(user:User) {
    return Array.isArray(user.roles) && user.roles.some(role => role.name === "EMPLOYER");
  }