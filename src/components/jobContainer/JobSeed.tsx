'use client';
import React, { useState } from 'react';
interface Employer {
  id: number;
  company: {
    id: number;
    name: string;
    sector: string;
    description: string;
    address: string;
    reviews: any[]; // Assuming reviews could be of any type
  };
  user: {
    id: number;
    email: string;
    password: string;
    fullName: string;
    mobilePhone: string;
    street: string | null;
    city: string | null;
    isEnabled: boolean;
    reviews: any[]; // Assuming reviews could be of any type
    roles: { id: number; name: string }[];
  };
}

interface JobListing {
  id: number;
  title: string;
  salary: number;
  payrollPayment: string;
  workAddress: string;
  isActive: boolean;
  position: string;
  description: string;
  diplomaRequire: string;
  workRequire: string;
  genderRequire: string;
  createdDate: number;
  types: any[]; // Assuming types could be of any type
  employer: Employer;
  candidates: any[]; // Assuming candidates could be of any type
}

export interface JobSeedProps {
  dataCompany: JobListing;
}

const JobSeed: React.FC<JobSeedProps> = ({ dataCompany }) => {
  const { title, employer, salary, workAddress, description, id } = dataCompany;
  const companyName = employer.company.name;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [CV, setCV] = useState(null);
  const userJSON = localStorage.getItem('user');
  if (userJSON == null) return;
  const user = JSON.parse(userJSON ?? '');
  const token = user.token;

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleFileChange = (e: any) => {
    setCV(e.target.files[0]);
  };

  const handleSubmitFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('token', token);
    formData.append('jobId', id + '');
    formData.append('CV', CV ?? '');

    const res = await fetch(
      'https://backend-5bno.onrender.com/candidate/submit-cv',
      {
        method: 'PUT',
        body: formData,
      }
    );

    const data = await res.json();
  };

  return (
    <div className="box-border h-96 w-96 p-4  border rounded-2xl m-3 overflow-y-auto">
      <div>
        <a href="#" className="font-bold text-2xl">
          {title}
        </a>
        <p> </p>
        <a href="#" className="underline">
          {companyName}
        </a>
        <p>{workAddress}</p>
        <p className="inline-block">{salary} một tháng</p>

        <button
          className="bg-blue-950 text-white  mx-6 p-2 rounded-xl hover:bg-stone-950 active:bg-stone-800 inline-block"
          onClick={handleButtonClick}
        >
          Ứng tuyển
        </button>

        {isFormVisible && (
          <div className="mb-2">
            <form onSubmit={handleSubmitFile}>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black font-bold text-md"
                htmlFor="file_input"
              >
                Nộp CV
              </label>
              <div className="flex items-center">
                <input
                  className="block mr-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  required
                  onChange={handleFileChange}
                />
                <button
                  className="rounded-full bg-blue-500 text-white px-3 py-1"
                  type="submit"
                >
                  Nộp
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          <h1 className="font-bold text-md">Chi tiết công việc :</h1>
          <div className="">
            <p className="text-sm">
              Đây là các thông tin chi tiết về việc làm phù hợp với hồ sơ của
              bạn
            </p>
          </div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default JobSeed;
