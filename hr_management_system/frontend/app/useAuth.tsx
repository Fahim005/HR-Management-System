import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    
    const isPresent = Cookies.get('user_token')

    if (!isPresent) {
      
      router.push('/loginAs');
    }
  }, []); 
};

export default useAuth;