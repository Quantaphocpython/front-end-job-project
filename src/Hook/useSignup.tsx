import { useAuthContext } from '@/context/AuthenContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const success = handleInputErrors(email, password, confirmPassword);
    if (!success) return;

    setLoading(true);
    const userForm = new FormData();
    userForm.append('email', email);
    userForm.append('password', password);
    userForm.append('confirmPassword', confirmPassword);

    try {
      const res = await fetch(
        'https://backend-5bno.onrender.com/registration/register',
        {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
          }),
        }
      );

      if (res.ok) {
        alert('Vui lòng vô mail để xác thực tài khoản');
        router.push(`/auth/login`);
      } else {
        alert('Email không hợp lệ hoặc đã được đăng ký');
        throw new Error();
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

  return { loading, signup };
};

export default useSignup;

function handleInputErrors(
  email: string,
  password: string,
  confirmPassword: string
) {
  if (!email || !password || !confirmPassword) {
    window.alert('Vui lòng điền đầy đủ thông tin');
    return false;
  }

  if (password !== confirmPassword) {
    window.alert('Mật khẩu không khớp');
    return false;
  }

  if (password.length < 6) {
    window.alert('Mật khẩu phải ít nhất 6 ký tự');
    return false;
  }

  return true;
}
