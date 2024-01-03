import { Button, Stack } from '@mui/material';

import SignupContentBox from './components/SignupContentBox';
import SignupFormBox from './components/SignupFormBox';
import SignupTerms from './components/SignupTerms';
import TeamingCriteria from './components/TeamingCriteria';

import { FormType } from '@/types/form';
import { RunningGroup } from '@/types/group';

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
              required
              multiLine
              title="시각장애러너의 가이드러너 경험"
              formType={FormType.Radio}
              formValue={[
                { label: '유', value: true },
                { label: '무', value: false },
              ]}
            />
            <SignupFormBox
              multiLine
              title="함께 뛰었던 시각장애러너의 성함"
              label={`기억이 나지 않는다면 '기억 안 남'으로 적어주세요`}
              formType={FormType.Textarea}
            />
            <SignupFormBox
              multiLine
              title="당시 파트너 러너의 1km 페이스를 적어주세요"
              label="예) 5:30/km"
              formType={FormType.Input}
            />
            <SignupFormBox
              multiLine
              title="가이드러닝 횟수 및 기간을 적어주세요"
              label="예) -1년/5회 이상"
              formType={FormType.Input}
            />
            <SignupFormBox
              multiLine
              title="프로그램을 알게 된 경로"
              formType={FormType.CheckBox}
              formValue={[
                {
                  value: 'SNS 혹은 미디어를 통해(인스타그램 등)',
                  label: 'SNS 혹은 미디어를 통해(인스타그램 등)',
                },
                {
                  value: '동호회, 러닝크루 등 지인을 통해',
                  label: '동호회, 러닝크루 등 지인을 통해',
                },
                {
                  value:
                    '마라톤 대회나 훈련 장소에서 가이드 러닝 하는 모습을 보고',
                  label:
                    '마라톤 대회나 훈련 장소에서 가이드 러닝 하는 모습을 보고',
                },
                {
                  value: '김승현님의 가이드 러닝 교육을 듣고',
                  label: '김승현님의 가이드 러닝 교육을 듣고',
                },
              ]}
            />
            <SignupFormBox
              multiLine
              title="참여 결심 계기를 공유해주세요"
              label="참여를 결심하게 된 계기를 자유롭게 나눠주세요."
              formType={FormType.Textarea}
            />
            <SignupFormBox
              required
              multiLine
              title="가이드가 가능한 페이스 그룹"
              label="10km 기준"
              formType={FormType.Select}
              formValue={[
                {
                  value: RunningGroup.A,
                  label: 'A ~50분 기록을 가진 시각장애러너',
                },
                {
                  value: RunningGroup.B,
                  label: 'B 51~56분 기록을 가진 시각장애러너',
                },
                {
                  value: RunningGroup.C,
                  label: 'C 57~65분 기록을 가진 시각장애러너',
                },
                {
                  value: RunningGroup.D,
                  label: 'D 66분~ 기록을 가진 시각장애러너',
                },
                {
                  value: RunningGroup.E,
                  label: 'E 기록이 없는 시각장애러너',
                },
              ]}
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
      {renderRunningSpec()}
      <SignupTerms />
      <TeamingCriteria />
      {renderButton()}
    </Stack>
  );
};

export default SignupGuide;
