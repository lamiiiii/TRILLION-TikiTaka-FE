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
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <>{children}</>; // 로그인된 경우 자식 요소를 렌더링
};

export default AuthGuard;
