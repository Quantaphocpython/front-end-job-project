import { useAuthContext } from '@/context/AuthenContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useSearchCompanyList = () => {
  const [loading, setLoading] = useState(false);
  const [dataCompany, setDataCompany] = useState([]);
  const { setAuthUser } = useAuthContext();

  const SearchCompanyList = async (location: string) => {
    const success = handleInputErrors(location);
    if (!success) return;

    setLoading(true);
    try {
      const url = new URL('https://backend-5bno.onrender.com/home/getJobs');
      url.searchParams.append('sort', location);
      url.searchParams.append('pageNumber', '0');
      url.searchParams.append('pageSize', '12');

      const res = await fetch(
        'https://backend-5bno.onrender.com/home/getJobs?pageNumber=0&pageSize=0&sort',
        {
          method: 'GET',
          // headers: { 'Content-Type': 'application/json' },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setLoading(false);
        setDataCompany(data);
        // console.log(dataCompany);
      } else {
        const i = confirm('location không tồn tại');
        console.log(i);
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
    return dataCompany;
  };

  return { loading, SearchCompanyList, dataCompany, setDataCompany };
};

export default useSearchCompanyList;

function handleInputErrors(location: string) {
  if (!location) {
    window.alert('Vui lòng điền địa điểm');
    return false;
  }
  return true;
}
