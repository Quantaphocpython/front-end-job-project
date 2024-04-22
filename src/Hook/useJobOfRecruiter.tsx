import { useAuthContext } from '@/context/AuthenContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
const useJobOfRecruiter = () => {
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState([]);
  const [tokenState, setToken] = useState<string>();
  const { authUser,setAuthUser } = useAuthContext();
  const [user, setUser] = useState<any>('');
  useEffect(() => {

      const userJSON = localStorage.getItem('user');
      if (userJSON) {
        try {
          const parsedUser = JSON.parse(userJSON);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user JSON:', error);
        }
      }

  }, []);
  if (user) {
    setToken(user.token);
  }
  const getJobOfRecruiter = async () => {

    setLoading(true);
    try {
        
        console.log('token:',tokenState);
        const url = new URL('https://backend-5bno.onrender.com/employer/getJobList');
        url.searchParams.append('token',user.token);
        const res = await fetch(url.toString(), {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        // console.log("authen",authUser);
      if (res.ok) {
        const data = await res.json();
        setJob(data)
        setLoading(false);
      } else {
        console.log("lỗi không lấy được job list recruiter");
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

  return { loading, getJobOfRecruiter,job,setJob };
};

export default useJobOfRecruiter;
