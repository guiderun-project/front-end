import styled from '@emotion/styled';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import SignupContentBox from './SignupContentBox';

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

const TeamingCriteria: React.FC = () => {
  return (
    <SignupContentBox
      title="팀 편성 기준"
      content={
        <Stack width="100%" gap="1.5rem">
          <Box component="ul" display="flex" flexDirection="column" gap="1rem">
            <li>
              - 모든 참여 희망자들은 개인 기록에 따라 팀 편성이 이루어집니다.
            </li>
            <li>
              - 이후 이벤트 참여 시, 부여받으신 팀 안에서 참여 및 파트너가 편성
              됩니다.
            </li>
            <li>
              - 시각장애러너와 가이드러너의 팀 편성기준은 아래와 같습니다.
            </li>
          </Box>
          <Card>
            <CardContent
              aria-lable="팀 편성기준"
              sx={{
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '2.5rem',
              }}
            >
              <Stack gap="1.5rem" aria-lable="시각장애 러너 편성 기준">
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
              <Stack gap="1.5rem" aria-lable="가이드 러너 편성 기준">
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

export default TeamingCriteria;
