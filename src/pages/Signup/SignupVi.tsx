import { Button, Stack } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SignupContentBox from './components/SignupContentBox';
import SignupFormBox from './components/SignupFormBox';
import SignupTerms from './components/SignupTerms';
import TeamingCriteria from './components/TeamingCriteria';

import { BROWSER_PATH } from '@/constants/path';
import { FormType } from '@/types/form';
import { RunningGroup } from '@/types/group';

const SignupVi: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchparams] = useSearchParams();

  /**
   *
   */
  const renderUserInfo = () => {
    return (
      <SignupContentBox
        title="기본 정보 입력하기"
        content={
          <Stack gap="2rem" width="100%" paddingTop="0.125rem">
            <SignupFormBox
              title="장애여부"
              label="시각장애러너"
              disabled
              formType={FormType.Input}
            />
            <SignupFormBox
              required
              title="성별"
              formType={FormType.Radio}
              formValue={[
                { value: 'B', label: '남' },
                { value: 'G', label: '여' },
              ]}
            />
            <SignupFormBox
              required
              title="이메일"
              label="이메일을 입력해주세요"
              formType={FormType.Input}
            />
            <SignupFormBox
              required
              title="이름"
              label="이름을 입력해주세요"
              formType={FormType.Input}
            />
            <SignupFormBox
              required
              title="전화번호"
              label="전화번호를 입력해주세요"
              formType={FormType.Input}
            />
            <SignupFormBox
              required
              title="나이"
              label="나이"
              formType={FormType.Select}
              formValue={[
                { label: '10대', value: 10 },
                { label: '20대', value: 20 },
                { label: '30대', value: 30 },
                { label: '40대', value: 40 },
                { label: '50대', value: 50 },
                { label: '60대 이상', value: 60 },
              ]}
            />
            <SignupFormBox
              multiLine
              title="SNS(인스타그램) 아이디"
              label="@"
              formType={FormType.Input}
            />
          </Stack>
        }
      />
    );
  };

  /**
   *
   */
  const renderRunningSpec = () => {
    return (
      <SignupContentBox
        title="러닝 스펙"
        content={
          <Stack gap="2rem" width="100%">
            <SignupFormBox
              required
              title="러닝 경험"
              formType={FormType.Radio}
              formValue={[
                { label: '유', value: true },
                { label: '무', value: false },
              ]}
            />
            <SignupFormBox
              required
              title="개인 기록"
              label="기록"
              formType={FormType.Select}
              formValue={[
                { label: 'A ~ 45분', value: RunningGroup.A },
                { label: 'B 46 ~ 52분', value: RunningGroup.B },
                { label: 'C 53 ~ 59분', value: RunningGroup.C },
                { label: 'D 60분 ~', value: RunningGroup.D },
                { label: 'E 기록 없음', value: RunningGroup.E },
              ]}
            />
            <SignupFormBox
              multiLine
              title="상세기록"
              label="상세기록을 적어주세요."
              formType={FormType.Input}
            />
            <SignupFormBox
              multiLine
              title="주로 달리는 장소"
              label="주로 달리는 장소를 적어주세요."
              formType={FormType.Input}
            />
            <SignupFormBox
              multiLine
              title="프로그램을 알게 된 경로"
              formType={FormType.CheckBox}
              formValue={[
                {
                  value: 'VMK 회원이어서',
                  label: 'VMK 회원이어서',
                },
                {
                  value: 'VMK가 아닌 동호회, 혹은 지인이 추천해서',
                  label: 'VMK가 아닌 동호회, 혹은 지인이 추천해서',
                },
                {
                  value: 'SNS 활동을 하다가',
                  label: 'SNS 활동을 하다가',
                },
              ]}
            />
            <SignupFormBox
              multiLine
              title="참여 계기"
              label="참여하시게 된 계기를 적어주세요."
              formType={FormType.Textarea}
            />
            <SignupFormBox
              multiLine
              title="이 외 희망사항"
              label="프로그램 참여 시 운영진에게 알리고 싶은 내용이 있다면 자유롭게 알려주세요."
              formType={FormType.Textarea}
            />
          </Stack>
        }
      />
    );
  };

  /**
   *
   */
  const renderButton = () => {
    return (
      <Stack gap="1rem">
        <Button
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          onClick={() =>
            setSearchparams({
              type: searchParams.get('type') ?? '',
              isCompleted: 'true',
            })
          }
        >
          팀 편성 신청서 제출하기
        </Button>
        <Button
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => navigate(BROWSER_PATH.SIGNUP)}
        >
          되돌아가기
        </Button>
      </Stack>
    );
  };

  //
  //
  //

  return (
    <Stack padding="5rem 0" gap="5rem">
      {renderUserInfo()}
      {renderRunningSpec()}
      <SignupTerms />
      <TeamingCriteria />
      {renderButton()}
    </Stack>
  );
};

export default SignupVi;
