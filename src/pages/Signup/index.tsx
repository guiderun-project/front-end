import { useSearchParams } from 'react-router-dom';

import SignupGuide from './SignupGuide';
import SignupIntro from './SignupIntro';
import SignupVi from './SignupVi';

const Signup: React.FC = () => {
  const [searchParams] = useSearchParams();

  /**
   *
   */
  const renderContent = () => {
    const type = searchParams.get('type');
    if (!type) {
      return <SignupIntro />;
    }

    switch (type) {
      case 'vi':
        return <SignupVi />;
      case 'guide':
        return <SignupGuide />;
      default:
        return <>잘못된 접근입니다</>;
    }
  };

  //
  //
  //

  return <>{renderContent()}</>;
};

export default Signup;
