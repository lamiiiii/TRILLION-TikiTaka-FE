import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({children, isAuthenticated}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default AuthGuard;
