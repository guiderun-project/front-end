import React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import SignupGuide from './SignupGuide';
import SignupIntro from './SignupIntro';
import SignupVi from './SignupVi';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  /**
   *
   */
  const renderContent = () => {
    if (!type) {
      return <SignupIntro />;
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
      navigate('/');
    }
  }, [type]);

  //
  //
  //

  return <>{renderContent()}</>;
};

export default Signup;
