import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={BROWSER_PATH.INTRO} replace />
  );
};

export default ProtectedRoute;
