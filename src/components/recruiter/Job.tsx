'use client';
import { useAuthContext } from '@/context/AuthenContext';
import useJobOfRecruiter from '@/Hook/useJobOfRecruiter';
import React, { useEffect, useState } from 'react';
interface JobOfRecruiterType {
  id: string;
  title: string;
  description: string;
  salary: number;
  isActive: boolean;
  position: string;
}
interface User {
  id: number;
  userName: string;
  token: string;
  roles: Role[];
}

interface Role {
  id: string;
  name: string;
}

function Job() {
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>('');
  const [job, setJob] = useState([]);
  const [token, setToken] = useState('');

  // regiser form
  const [employerInform, setEmployerInform] = useState({
    token: '',
    title: '',
    salary: '',
    payrollPayment: '',
    workAddress: '',
    position: '',
    jobType: '',
    description: '',
    diplomaRequire: '',
    workRequire: '',
    genderRequire: '',
  });
  const setFields = (e: React.ChangeEvent<any>) => {
    const fieldName = e.target.name;
    const newValue = e.target.value;
    setEmployerInform((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };
  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      try {
        const parsedUser = JSON.parse(userJSON);
        setUser(parsedUser);
        setToken(parsedUser.token); // Cập nhật token thay vì user
        // setEmployerInform((prevState) => ({
        //   ...prevState,
        //   token: parsedUser.token,
        // }));
      } catch (error) {
        console.error('Error parsing user JSON:', error);
      }
    }
  }, []);
  // =================== postjob =================
  const handlePostRecruiter = async (e: any) => {
    e.preventDefault();
    setEmployerInform((prevState) => ({
      ...prevState,
      token: token,
    }));

    const res = await fetch(
      'https://backend-5bno.onrender.com/employer/post_job',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employerInform),
      }
    );
    const message = res.json();
    if (res.status === 200) {
      alert('Đăng công việc thành công');
      setShowForm(!showForm);
      setEmployerInform({
        token: '',
        title: '',
        salary: '',
        payrollPayment: '',
        workAddress: '',
        position: '',
        jobType: '',
        description: '',
        diplomaRequire: '',
        workRequire: '',
        genderRequire: '',
      });
    }
  };

  // ====================  getJobContainer =========
  useEffect(() => {
    if (!token) {
      return;
    }
    getJobOfRecruiter();
  }, [token]);

  const getJobOfRecruiter = async () => {
    setLoading(true);
    try {
      if (!user || !user.token) {
        console.log('Token is missing or user is not logged in.');
        return;
      }
      const url = new URL(
        'https://backend-5bno.onrender.com/employer/getJobList'
      );
      console.log(user.token);
      url.searchParams.append('token', token);
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('res', res);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
        console.log('data', data);

        setLoading(false);
      } else {
        console.log('lỗi không lấy được job list recruiter');
      }
    } catch (error) {
      if (typeof error === 'string') {
        window.alert(error);
      } else {
        window.alert(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto inset-0  w-full h-full px-6 relative ">
      {/*Công Việc  */}

      <div className="flex justify-between items-center my-8">
        <h1 className="font-bold max-w-md">Công Việc</h1>
        {/*đăng tìm việc  */}

        <button
          className="ml-4 bg-gray-900 text-white rounded-md p-3 whitespace-nowrap hover:bg-gray-800 active:bg-black-950"
          onClick={() => setShowForm(!showForm)}
        >
          Đăng tìm việc
        </button>
      </div>

      {!showForm && (
        <form className="" onSubmit={handlePostRecruiter}>
          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tiêu đề công việc <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="Thực tập sinh full-stack"
                value={employerInform.title}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>

          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mức lương chi trả <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="salary"
                id="salary"
                autoComplete="salary"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="5000000"
                value={employerInform.salary}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>

          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Payroll Payment : <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="payrollPayment"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="1 (Tháng)"
                value={employerInform.payrollPayment}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>

          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Địa chỉ công ty: <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="workAddress"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="Thạnh Đức, Bến Lức, Long An"
                value={employerInform.workAddress}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>

          <div className="col-span-full mt-5">
            <label
              htmlFor="jobType"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Loại công việc : <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="jobType"
                id="jobType"
                autoComplete="jobType"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="thời vụ"
                value={employerInform.jobType}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>
          <div className="col-span-full mt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Vị trí ứng tuyển <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="position"
                id="position"
                autoComplete="position"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="Intern"
                value={employerInform.position}
                onChange={(e) => setFields(e)}
              />
            </div>
          </div>
          <div className="col-span-full mt-5">
            <label
              htmlFor="diplomaRequire"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Yêu cầu bằng cấp <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="diplomaRequire"
                id="diplomaRequire"
                autoComplete="diplomaRequire"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="Cao đẳng, đại học"
                value={employerInform.diplomaRequire}
                onChange={(e) => setFields(e)}
                required
              />
            </div>
          </div>
          <div className="col-span-full mt-5">
            <label
              htmlFor="diplomaRequire"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Yêu cầu kinh nghiệm <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="workRequire"
                id="workRequire"
                autoComplete="workRequire"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="1 năm"
                value={employerInform.workRequire}
                onChange={(e) => setFields(e)}
                required
              />
            </div>
          </div>
          <div className="col-span-full mt-5">
            <label
              htmlFor="diplomaRequire"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Yêu cầu giới tính <span className="text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="genderRequire"
                id="genderRequire"
                autoComplete="genderRequire"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={{ paddingRight: '15px', paddingLeft: '15px' }}
                placeholder="Nam/Nữ"
                value={employerInform.genderRequire}
                onChange={(e) => setFields(e)}
                required
              />
            </div>
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black mt-5"
          >
            Mô tả công việc <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            rows={8}
            name="description"
            className="block p-2.5 w-full text-sm text-white-900 bg-white-50 rounded-lg border border-white-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-black-500"
            placeholder={`
  🌟 Vị trí công việc hoàn hảo đang chờ đợi bạn! 🌟

  🔍 Mô tả công việc:
  - Độc lập phát triển ứng dụng web tiên tiến sử dụng công nghệ mới nhất.
  - Xây dựng hệ thống có khả năng mở rộng và linh hoạt.

  👨‍💻 Yêu cầu công việc:
  - Tối thiểu 5 năm kinh nghiệm làm việc trong lĩnh vực phát triển phần mềm.
  - Kiến thức sâu về AI, Machine Learning, và DevOps.
  - Có kinh nghiệm làm việc với React, Node.js, và MongoDB.

  🎓 Yêu cầu học vấn:
  - Bằng Cử nhân/Cao học chuyên ngành Công nghệ Thông tin hoặc liên quan.
  - Ưu tiên ứng viên có bằng Thạc sĩ hoặc Tiến sĩ từ các trường đại học hàng đầu.

  🌍 Địa điểm làm việc: Hà Nội, Việt Nam

  💼 Quyền lợi:
  - Môi trường làm việc năng động và chuyên nghiệp.
  - Cơ hội tham gia vào các dự án đa dạng và thú vị.
  - Lương và phúc lợi hấp dẫn, được thảo luận cụ thể trong quá trình phỏng vấn.
`}
            minLength={30}
            value={employerInform.description}
            onChange={(e) => setFields(e)}
          ></textarea>

          <div className="mt-6 flex items-center w-full">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full "
              // onClick={() => setShowForm(!showForm)}
            >
              Đăng ký
            </button>
          </div>
        </form>
      )}

      <div className="mt-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {/*Mở và tạm đóng  */}

          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-center text-black border border-black bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            Mở và tạm đóng (0)
          </button>
          {/*đóng  */}

          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium text-center text-black border border-black bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            Đóng (0)
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center ">
        {/* Last 30 Days Button */}
        <button className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-black border border-black bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 ">
          Lọc và tìm kiếm công việc
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
          {/* Dropdown khi có data */}
          <div
            id="dropdownRadio"
            className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
          >
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRadioButton"
            >
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="filter-radio-example-1"
                    type="radio"
                    value=""
                    name="filter-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  ></input>
                  <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                    Last day
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </button>

        {/* Search Bar */}
        <div className="relative">
          <button className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-black border border-black bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 ">
            <h1 className="font-bold">Sắp xếp</h1>: Theo ngày
            <svg
              className="w-2.5 h-2.5 ml-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
            <div
              id="dropdownRadio"
              className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="top"
            >
              <ul
                className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownRadioButton"
              >
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-1"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                    <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                      Last day
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </button>
          <button className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-black border border-black bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 ">
            <h1 className="font-bold">Thứ tự</h1>: Giảm dần
            <svg
              className="w-2.5 h-2.5 ml-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
            <div
              id="dropdownRadio"
              className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="top"
            >
              <ul
                className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownRadioButton"
              >
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-1"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                    <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                      Last day
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>

      {/* <div className="relative h-screen">
  <img className="absolute inset-0 w-full h-full object-contain" src="https://media.istockphoto.com/id/643704782/tr/vekt%C3%B6r/i%C5%9F-insanlar-tak%C4%B1m-%C3%A7al%C4%B1%C5%9Fmas%C4%B1-vekt%C3%B6r-%C3%A7izim-%C3%A7izgi-film-karakteri.jpg?s=612x612&w=0&k=20&c=jVof_BwZuXnpR75qL3GdqMR2w43Xnk3DMmL1bm6hjT0=" alt="Description of the image" />
</div> */}

      {job == null && (
        <div className="flex flex-col items-center justify-start space-y-5 mb-5">
          <h1 className="text-xl font-bold leading-none tracking-tight text-black-900 md:text-5xl lg:text-4xl dark:text-black mt-20 text-center">
            Đăng công việc đầu tiên của bạn trực tiếp trên JOB SEARCH
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">
            JOB SEARCH Ứng tuyển mang đến cho bạn số lượng đơn đăng ký nhiều gấp
            bốn lần so với việc chuyển hướng đơn đăng ký đến trang web tuyển
            dụng của bạn. Làm cho nó đơn giản hơn. Thuê nhanh hơn.
          </p>
          <button
            type="button"
            className=" py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Đăng tìm việc
          </button>
        </div>
      )}
      {job != null && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            {job.map((job: JobOfRecruiterType) => (
              <div
                key={job.id}
                className="box-border h-96 w-96   border rounded-2xl  overflow-y-auto m-4 p-4"
              >
                <h1 className="text-xs font-bold leading-none tracking-tight text-black-900 md:text-xl lg:text-xl dark:text-black mt-5 ">
                  {job.title}
                </h1>
                <h2 className="text-lg font-normal text-black lg:text-xl dark:text-black ">
                  Mức Lương chi trả : {job.salary}
                </h2>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Job;
