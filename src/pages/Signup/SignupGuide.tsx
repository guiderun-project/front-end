import { Stack } from '@mui/material';

import SignupContentBox from './components/SignupContentBox';

const SignupGuide: React.FC = () => {
  const renderUserInfo = () => {
    return (
      <SignupContentBox
        title="기본 정보 입력하기"
        content={<>기본정보 입력 폼</>}
      />
    );
  };

  /**
   *
   */
  const renderTerms = () => {
    return (
      <SignupContentBox
        title="약관 동의"
        content={<Stack gap="2rem" width="100%"></Stack>}
      />
    );
  };

  /**
   *
   */
  const renderTeamingCriteria = () => {
    return (
      <SignupContentBox title="팀 편성 기준" content={<>팀 편성 기준</>} />
    );
  };

  //
  //
  //
  return (
    <Stack paddingTop="5rem" gap="5rem">
      {renderUserInfo()}
      {renderTerms()}
      {renderTeamingCriteria()}
    </Stack>
  );
};

export default SignupGuide;
