import styled from '@emotion/styled';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import SignupContentBox from './components/SignupContentBox';
import SignupFormBox from './components/SignupFormBox';

//
//
//

const StyledRunGroupBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

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
              required
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
              required
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
              required
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
              required
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
              title="개인 기록"
              required
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
            <SignupFormBox
              title="상세 기록"
              multiLine
              form={
                <TextField
                  fullWidth
                  placeholder="상세 기록을 적어주세요 (예 - 50:03)"
                />
              }
            />
            <SignupFormBox
              title="시각장애러너의 가이드 러닝 경험"
              required
              multiLine
              form={
                <FormControl fullWidth>
                  <RadioGroup
                    row
                    sx={{
                      width: '100%',
                      padding: '1rem',
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
              title="시각장애러너의 가이드 러닝 경험이 있는 경우,
자세한 경험을 공유해주세요!"
              multiLine
              form={
                <TextField
                  fullWidth
                  multiline
                  placeholder="횟수나 기간을 적어주세요.
(예시 - 1년/5회 이상)"
                />
              }
            />
            <SignupFormBox
              title="시각장애러너의 가이드 러닝 경험 없는 경우,
참여 결심 계기를 공유해주세요!"
              multiLine
              form={
                <TextField
                  fullWidth
                  multiline
                  placeholder="참여 계기를 자유롭게 나눠주세요 :)"
                />
              }
            />
            <SignupFormBox
              title="SNS(인스타그램) 아이디"
              multiLine
              form={<TextField fullWidth placeholder="@" />}
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
        content={
          <Stack gap="2rem" width="100%">
            <SignupFormBox
              title="개인정보 제공 및 활용 동의"
              required
              multiLine
              form={
                <Stack width="100%">
                  <Card>
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      <Typography whiteSpace="break-spaces">
                        1. 개인정보 수집, 이용 목적: <br /> 참가자를 대상으로
                        안내성 SMS 발송, 기타 행사를 위한 매칭 등 프로그램
                        진행을 위해 활용
                      </Typography>
                      <Typography whiteSpace="break-spaces">
                        2. 수집하려는 개인정보 항목: <br /> 인적사항(성함, 성별,
                        나이, 휴대폰 번호, 거주지, 기록, 가이드 러닝 경험 유무,
                        SNS, 카카오톡 아이디)
                      </Typography>
                      <Typography whiteSpace="break-spaces">
                        3. 개인 정보의 보유 및 이용 기간: <br /> 앱 가입 시 부터
                        안내 시까지
                      </Typography>
                      <Typography whiteSpace="break-spaces">
                        4. 동의 거부 시 프로그램 참여가 불가한 점 양해
                        부탁드립니다.
                      </Typography>
                    </CardContent>
                  </Card>
                  <FormControl fullWidth>
                    <RadioGroup
                      row
                      sx={{
                        width: '100%',
                        padding: '1rem',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        alignItems: 'space-between',
                      }}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="동의"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="거절"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
              }
            />
            <SignupFormBox
              title="개인정보 제공 및 활용 동의"
              required
              multiLine
              form={
                <Stack width="100%">
                  <Card>
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      <Typography whiteSpace="break-spaces">
                        1. 수집 이용 및 제공의 목적 : <br />
                        SNS 업로드를 통한 홍보 및 기타 채널을 통한 홍보
                      </Typography>
                      <Typography whiteSpace="break-spaces">
                        2. 초상권 보유 및 이용기간 : <br />
                        홍보한 게시물 삭제시까지
                      </Typography>
                      <Typography whiteSpace="break-spaces">
                        3. 초상권 2차 사용 : <br />
                        온라인 및 오프라인 홍보물 제작 및 게시
                      </Typography>
                      <Typography whiteSpace="break-spaces">
                        4. 초상권 활용 동의에 거부할 권리가 있으며, 거부 시 교육
                        홍보물 제작에서 제외되거나 모자이크 처리됩니다.
                      </Typography>
                      <Typography whiteSpace="break-spaces">
                        5. 인격을 침해하지 않는 범위 내에서 저작물에 대한 편집
                        및 후보정이 이루어질 예정입니다.
                      </Typography>
                    </CardContent>
                  </Card>
                  <FormControl fullWidth>
                    <RadioGroup
                      row
                      sx={{
                        width: '100%',
                        padding: '1rem',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        alignItems: 'space-between',
                      }}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="동의"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="거절"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
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
  const renderTeamingCriteria = () => {
    return (
      <SignupContentBox
        title="팀 편성 기준"
        content={
          <Stack width="100%" gap="1.5rem">
            <Box
              component="ul"
              display="flex"
              flexDirection="column"
              gap="1rem"
            >
              <li>
                - 모든 참여 희망자들은 개인 기록에 따라 팀 편성이 이루어집니다.
              </li>
              <li>
                - 이후 이벤트 참여 시, 부여받으신 팀 안에서 참여 및 파트너가
                편성 됩니다.
              </li>
              <li>
                - 시각장애러너와 가이드러너의 팀 편성기준은 아래와 같습니다.
              </li>
            </Box>
            <Card>
              <CardContent
                sx={{
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2.5rem',
                }}
              >
                <Stack gap="1.5rem">
                  <Typography fontWeight={800}>시각장애러너</Typography>
                  <Stack>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>A</Typography>
                      <Typography>~50분</Typography>
                    </StyledRunGroupBox>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>B</Typography>
                      <Typography>51~56분</Typography>
                    </StyledRunGroupBox>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>C</Typography>
                      <Typography>57~65분</Typography>
                    </StyledRunGroupBox>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>D</Typography>
                      <Typography>66분~</Typography>
                    </StyledRunGroupBox>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>E</Typography>
                      <Typography>기록 없음</Typography>
                    </StyledRunGroupBox>
                  </Stack>
                </Stack>
                <Stack gap="1.5rem">
                  <Typography fontWeight={800}>가이드</Typography>
                  <Stack>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>A</Typography>
                      <Typography>~45분</Typography>
                    </StyledRunGroupBox>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>B</Typography>
                      <Typography>46~52분</Typography>
                    </StyledRunGroupBox>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>C</Typography>
                      <Typography>53~59분</Typography>
                    </StyledRunGroupBox>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>D</Typography>
                      <Typography>60분~</Typography>
                    </StyledRunGroupBox>
                    <StyledRunGroupBox>
                      <Typography fontWeight={700}>E</Typography>
                      <Typography>기록 없음</Typography>
                    </StyledRunGroupBox>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
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
      {renderTerms()}
      {renderTeamingCriteria()}
      {renderButton()}
    </Stack>
  );
};

export default SignupGuide;
