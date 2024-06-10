import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import SignupComplete from './SignupComplete';
import SignupGuide from './SignupGuide';
import SignupIntro from './SignupIntro';
import SignupVi from './SignupVi';

import { BROWSER_PATH } from '@/constants/path';
import { RootState } from '@/store/index';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const aceessToken = useSelector((state: RootState) => state.auth.accessToken);
  const type = searchParams.get('type');
  const isCompleted = Boolean(searchParams.get('isCompleted'));
  /**
   *
   */
  const renderContent = () => {
    if (!type) {
      return <SignupIntro />;
    }

    if (isCompleted) {
      return <SignupComplete />;
    }

    switch (type) {
      case 'vi':
        return <SignupVi />;
      case 'guide':
        return <SignupGuide />;
    }
  };

  //
  //
  //
  React.useEffect(() => {
    if (type && type !== 'vi' && type !== 'guide') {
      navigate(BROWSER_PATH.SIGNUP);
    }
  }, [type]);

  //
  //
  //
  if (!aceessToken) return <Navigate to={BROWSER_PATH.INTRO} replace />;
  return <>{renderContent()}</>;
};

export default Signup;
