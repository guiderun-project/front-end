import { Button, Stack } from '@mui/material';

import SignupContentBox from './components/SignupContentBox';
import SignupFormBox from './components/SignupFormBox';
import SignupTerms from './components/SignupTerms';
import TeamingCriteria from './components/TeamingCriteria';

import { FormType } from '@/types/form';

//
//
//

const SignupGuide: React.FC = () => {
  const renderUserInfo = () => {
    return (
      <SignupContentBox
        title="기본 정보 입력하기"
        content={
          <Stack gap="2rem" width="100%" paddingTop="0.125rem">
            <SignupFormBox
              title="장애여부"
              label="가이드러너"
              disabled
              form={FormType.Input}
            />
            <SignupFormBox
              required
              title="성별"
              form={FormType.Radio}
              formValue={[
                { value: 'B', label: '남' },
                { value: 'G', label: '여' },
              ]}
            />
            <SignupFormBox
              required
              title="이름"
              label="이름을 입력해주세요"
              form={FormType.Input}
            />
            <SignupFormBox
              required
              title="전화번호"
              label="전화번호를 입력해주세요"
              form={FormType.Input}
            />
            <SignupFormBox
              required
              title="나이"
              label="나이"
              form={FormType.Select}
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
              required
              title="개인 기록"
              label="기록"
              form={FormType.Select}
              formValue={[
                { label: '45분 미만', value: 'A' },
                { label: '45분 ~ 52분', value: 'B' },
                { label: '53분 ~ 59분', value: 'C' },
                { label: '60분 초과', value: 'D' },
                { label: '기록 없음', value: 'E' },
              ]}
            />
            <SignupFormBox
              multiLine
              title="상세 기록"
              label="상세 기록을 적어주세요 (예 - 50:03)"
              form={FormType.Input}
            />
            <SignupFormBox
              required
              multiLine
              title="시각장애러너의 가이드 러닝 경험"
              form={FormType.Radio}
              formValue={[
                { value: true, label: '유' },
                { value: false, label: '무' },
              ]}
            />
            <SignupFormBox
              multiLine
              title="시각장애러너의 가이드 러닝 경험이 있는 경우,
자세한 경험을 공유해주세요!"
              label="횟수나 기간을 적어주세요. (예시 - 1년/5회 이상)"
              form={FormType.Textarea}
            />
            <SignupFormBox
              multiLine
              title="시각장애러너의 가이드 러닝 경험 없는 경우,
참여 결심 계기를 공유해주세요!"
              label="참여 계기를 자유롭게 나눠주세요 :)"
              form={FormType.Textarea}
            />
            <SignupFormBox
              multiLine
              title="SNS(인스타그램) 아이디"
              label="@"
              form={FormType.Input}
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
      <Button fullWidth variant="contained" size="large" color="secondary">
        팀 편성 신청서 제출하기
      </Button>
    );
  };

  //
  //
  //

  return (
    <Stack padding="5rem 0" gap="5rem">
      {renderUserInfo()}
      <SignupTerms />
      <TeamingCriteria />
      {renderButton()}
    </Stack>
  );
};

export default SignupGuide;
