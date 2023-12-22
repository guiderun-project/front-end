import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@mui/material';

import SignupContentBox from './components/SignupContentBox';
import SignupFormBox from './components/SignupFormBox';

const SignupGuide: React.FC = () => {
  const renderUserInfo = () => {
    return (
      <SignupContentBox
        title="기본 정보 입력하기"
        content={
          <Stack gap="2rem" width="100%">
            <SignupFormBox
              title="장애여부"
              form={
                <TextField
                  size="small"
                  fullWidth
                  variant="standard"
                  disabled
                  value="가이드러너"
                />
              }
            />
            <SignupFormBox
              title="성별"
              form={
                <FormControl fullWidth>
                  <RadioGroup
                    row
                    sx={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      alignItems: 'space-between',
                    }}
                  >
                    <FormControlLabel
                      value="B"
                      control={<Radio />}
                      label="남"
                    />
                    <FormControlLabel
                      value="G"
                      control={<Radio />}
                      label="여"
                    />
                  </RadioGroup>
                </FormControl>
              }
            />
            <SignupFormBox
              title="이름"
              form={
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="이름을 입력해주세요"
                />
              }
            />
            <SignupFormBox
              title="전화번호"
              form={
                <TextField
                  fullWidth
                  type="tel"
                  variant="standard"
                  placeholder="전화번호를 입력해주세요"
                />
              }
            />
            <SignupFormBox
              title="나이"
              form={
                <Select fullWidth size="small">
                  <MenuItem value={10}>10대</MenuItem>
                  <MenuItem value={20}>20대</MenuItem>
                  <MenuItem value={30}>30대</MenuItem>
                  <MenuItem value={40}>40대</MenuItem>
                  <MenuItem value={50}>50대</MenuItem>
                  <MenuItem value={60}>60대 이상</MenuItem>
                </Select>
              }
            />
            <SignupFormBox
              title="달리기 경험"
              form={
                <FormControl fullWidth>
                  <RadioGroup
                    row
                    sx={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      alignItems: 'space-between',
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="유"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="무"
                    />
                  </RadioGroup>
                </FormControl>
              }
            />
            <SignupFormBox
              title="개인 기록"
              form={
                <Select fullWidth size="small">
                  <MenuItem value={35}>35분 미만</MenuItem>
                  <MenuItem value={40}>35분 ~ 40분</MenuItem>
                  <MenuItem value={45}>40분 ~ 45분</MenuItem>
                  <MenuItem value={50}>45분 ~ 50분</MenuItem>
                  <MenuItem value={55}>50분 ~ 55분</MenuItem>
                  <MenuItem value={60}>55분 ~ 60분</MenuItem>
                  <MenuItem value={65}>60분 ~ 65분</MenuItem>
                  <MenuItem value={70}>65분 이상</MenuItem>
                </Select>
              }
            />
          </Stack>
        }
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
