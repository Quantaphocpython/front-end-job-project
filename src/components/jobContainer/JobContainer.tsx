'use client';
import React, { useEffect } from 'react';
import JobSeed from './JobSeed';
import useSearchCompanyList from '@/Hook/useSearchCompanyList';
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
    reviews: any[];
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
  types: any[];
  employer: Employer;
  candidates: any[];
}

export interface JobSeedProps {
  dataCompany: JobListing;
}

function JobContainer() {
  const { dataCompany, SearchCompanyList } = useSearchCompanyList();

  useEffect(() => {
    SearchCompanyList('specific location');
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {dataCompany.map((company) => (
          <JobSeed key={company} dataCompany={company} />
        ))}
      </div>
    </div>
  );
}
export default JobContainer;
