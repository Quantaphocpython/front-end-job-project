import { useAuthContext } from '@/context/AuthenContext';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    const userForm = new FormData();
    userForm.append('email', username);
    userForm.append('password', password);
    try {
      const res = await fetch('https://backend-5bno.onrender.com/user/login', {
        method: 'POST',
        // chuyển thành formdata thì tao nhận input dễ hơn
        body: userForm,
      });
      console.log(res);
      const data = await res.json();
      console.log(data); // >>> log data
      if (data.error) {
        throw new Error(data.error);
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        setAuthUser(data);
        router.push(`/`);
      }
    } catch (error) {
      if (typeof error === 'string') {
        window.alert(error); // Thay thế toast bằng alert
      } else {
        window.alert('Thông tin đăng nhập không chính xác !'); // Thay thế toast bằng alert
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;

function handleInputErrors(username: string, password: string) {
  if (!username || !password) {
    window.alert('Please fill in all fields');
    return false;
  }

  return true;
}
